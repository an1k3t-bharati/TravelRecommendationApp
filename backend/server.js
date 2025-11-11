const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');            
const jwt = require('jsonwebtoken');       
const User = require('./models/User');

app.use(express.json()); 
app.use(cors()); 


const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("FATAL ERROR: GEMINI_API_KEY is not defined. Please check your .env file.");
    process.exit(1); 
}
console.log("Gemini API key loaded successfully.");
const genAI = new GoogleGenerativeAI(apiKey);
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error("FATAL ERROR: MONGO_URI is not defined.");
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB connection established successfully."))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send('Hello from the backend server!');
});

app.post('/api/recommend', async (req, res) => {
    try {
        const { weather, locationType, transport, maxBudget, duration } = req.body;

        const prompt = `
            You are an expert travel agent. A user needs 3 travel recommendations.
            User's Preferences:
            * Max Budget: $${maxBudget}
            * Trip Duration: ${duration} days
            * Preferred Weather: ${weather}
            * Location Type: ${locationType}
            * Transport: ${transport}
            Your Task:
            1.  Generate 3 unique destinations that strictly match all preferences.
            2.  The 'estimated_budget' MUST be a number and less than or equal to $${maxBudget}.
            3.  The 'description' must be 2-3 sentences explaining WHY it's a good match.
            Output Format:
            You MUST return your answer as a single, minified JSON array.
            Do not include any text, markdown (like \`\`\`json), or conversation.
            The JSON array must contain objects with these exact keys:
            "destination_name", "country", "description", "estimated_budget"
        `;

       
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const recommendationsText = response.text();

        console.log("--- RAW AI RESPONSE ---");
        console.log(recommendationsText);
        console.log("-----------------------");

       
        const cleanedText = recommendationsText.replace(/```json/g, "").replace(/```/g, "").trim();

        
        try {
            const parsedJson = JSON.parse(cleanedText); 
            res.json(parsedJson); 
        } catch (parseError) {
            console.error("Failed to parse AI response as JSON:", parseError);
            res.status(500).json({ error: "AI response was not valid JSON." });
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        
        res.status(500).json({ error: "Failed to call Gemini API." });

    }
});

app.post('/api/register', async (req, res) => {
    try {
      
        const { email, password } = req.body;

       
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }

       
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

      
        const newUser = new User({
            email: email.toLowerCase(),
            password: password
        });

        await newUser.save();

       
        res.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
       
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        console.error("Register Error:", error);
        res.status(500).json({ error: 'Server error, please try again later.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        
        const { email, password } = req.body;

       
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }

       
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
         
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

       
        const payload = {
            user: {
                id: user.id 
            }
        };

        
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 }, 
            (err, token) => {
                if (err) throw err;
                
                res.json({ token });
            }
        );

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Server error, please try again later.' });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
.on('error', (err) => {
    
    console.error("--- SERVER LISTENER ERROR ---");
    if (err.code === 'EADDRINUSE') {
        console.error(`FATAL ERROR: Port ${PORT} is already in use.`);
    } else {
        console.error(err);
    }
});