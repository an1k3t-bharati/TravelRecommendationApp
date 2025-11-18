const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');            
const jwt = require('jsonwebtoken');       
const User = require('./models/User');
const Trip = require('./models/Trip'); 
const auth = require('./middleware/auth'); 
const axios = require('axios'); 

app.use(express.json()); 
app.use(cors()); 


const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) 
console.log("Gemini API key loaded successfully.");
const genAI = new GoogleGenerativeAI(apiKey);

const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
if (!unsplashKey)
console.log("Unsplash API key loaded successfully.");


const mongoUri = process.env.MONGO_URI;
if (!mongoUri) 
mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB connection established successfully."))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });


const getImageUrl = async (searchTerm) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { 
        query: searchTerm, 
        per_page: 1, 
        orientation: 'landscape' 
      },
      headers: {
        Authorization: `Client-ID ${unsplashKey}`
      }
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].urls.regular;
    }
    return null;
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error.message);
    return null; 
  }
};


app.get('/', (req, res) => {
    res.send('Hello from the backend server!');
});

app.post('/api/recommend', async (req, res) => {
   
    try {
        const { weather, locationType, transport, maxBudget, duration } = req.body;
        const prompt = `
            You are an expert travel agent. A user needs 10 travel recommendations.
            User's Preferences: * Max Budget: $${maxBudget}, * Trip Duration: ${duration} days, * Preferred Weather: ${weather}, * Location Type: ${locationType}, * Transport: ${transport}
            Your Task: Generate 10 unique destinations. The 'estimated_budget' MUST be a number and less than or equal to $${maxBudget}.
            Output Format:
            You MUST return your answer as a single, minified JSON array.
            Do not include any text or markdown.
            The JSON array must contain objects with these exact keys:
            "destination_name", "country", "description", "estimated_budget",
            "popularity": "A score from 1 (niche) to 10 (world-famous) for this destination",
            "image_search_term": "A 4-6 word search query for a beautiful, royalty-free photo (e.g., 'Paris Eiffel Tower sunny day')"
        `;
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const recommendationsText = response.text();
        console.log("--- RAW AI RESPONSE ---");
        console.log(recommendationsText);
        console.log("-----------------------");
        const cleanedText = recommendationsText.replace(/```json/g, "").replace(/```/g, "").trim();
        try {
            const destinations = JSON.parse(cleanedText); 
            const destinationsWithImages = await Promise.all(
              destinations.map(async (dest) => {
                const imageUrl = await getImageUrl(dest.image_search_term);
                return { ...dest, image_url: imageUrl };
              })
            );
            console.log("--- Final data with images ---");
            res.json(destinationsWithImages); 
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
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: 'Please provide full name, email, and password' });
        }
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        const newUser = new User({
            fullName: fullName,
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
        if (!process.env.JWT_SECRET) {
            console.error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
            return res.status(500).json({ error: 'Server configuration error.' });
        }
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
        const payload = { user: { id: user.id } };
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

app.get('/api/auth/me', auth, async (req, res) => {
    
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error("Get Me Error:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/auth/update-profile', auth, async (req, res) => {
    
    try {
        const { fullName, email } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (email.toLowerCase() !== user.email) {
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already in use' });
            }
        }
        user.fullName = fullName;
        user.email = email.toLowerCase();
        await user.save();
        const updatedUser = await User.findById(req.user.id).select('-password');
        res.json(updatedUser);
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/auth/change-password', auth, async (req, res) => {
  
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect current password' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error("Change Password Error:", error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.post('/api/trips/save', auth, async (req, res) => {
  
    try {
        const userId = req.user.id;
        const { destination_name, country, description, estimated_budget, image_url, popularity } = req.body;
        let existingTrip = await Trip.findOne({ user: userId, destination_name: destination_name });
        if (existingTrip) {
            return res.status(400).json({ error: 'You have already saved this trip' });
        }
        const newTrip = new Trip({
            user: userId,
            destination_name,
            country,
            description,
            estimated_budget,
            image_url,
            popularity
        });
        await newTrip.save();
        res.status(201).json(newTrip); 
    } catch (error) {
        console.error("Save Trip Error:", error);
        res.status(500).json({ error: 'Server error, please try again.' });
    }
});

app.get('/api/trips', auth, async (req, res) => {

    try {
        const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(trips);
    } catch (error) {
        console.error("Get Trips Error:", error);
        res.status(500).json({ error: 'Server error, please try again.' });
    }
});


app.delete('/api/auth/delete-account', auth, async (req, res) => {
    try {
        const userId = req.user.id;

        
        await Trip.deleteMany({ user: userId });
        
       
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Account deleted successfully' });

    } catch (error) {
        console.error("Delete Account Error:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
.on('error', (err) => {
    console.error("--- SERVER LISTENER ERROR ---");
    if (err.code === 'EADDRINUSE') {
        console.error(`FATAL ERROR: Port ${PORT} is a already in use.`);
    } else {
        console.error(err);
    }
});