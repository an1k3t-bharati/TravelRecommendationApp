

const express = require("express");
const router = express.Router();
const Destination = require("./models/Destination");
const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Testing Method A (No Gemini using only Database)

router.post("/method-a", async (req, res) => {
  try {
    const { maxBudget, weather, locationType, transport } = req.body;

    const results = await Destination.find({
      estimated_budget: { $lte: Number(maxBudget) },
      weather: weather,
      locationType: locationType,
      transport: transport
    })
      .sort({ popularity: -1 }) 
      .limit(5);

    res.json(results);
  } catch (error) {
    console.error("Method A Error:", error);
    res.status(500).json({ error: "Server error" });
    }
    

});

// Testing Method B (Using Gemini but with no extra prompt)
 
router.post("/method-b", async (req, res) => {
  try {
    const { maxBudget, weather, locationType, transport } = req.body;

    const prompt = `
      Recommend 3 travel destinations for a user.
      Budget: ${maxBudget}
      Weather: ${weather}
      Location: ${locationType}
      Transport: ${transport}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);

    res.json({
      raw_output: result.response.text()
    });
  } catch (error) {
    console.error("Method B Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Testing Methdod C (Using Gemini with extra prompt)

router.post("/method-c", async (req, res) => {
  try {
    const { maxBudget, weather, locationType, transport } = req.body;

    // Step 1: Get candidates from DB
    const candidates = await Destination.find({
      estimated_budget: { $lte: Number(maxBudget) + 500 }
    });

    // Step 2: Build advanced prompt
    const prompt = `
      # SYSTEM
      You are an expert travel recommendation agent.

      # DATABASE CONTEXT
      Here is the list of available destinations:
      ${JSON.stringify(candidates)}

      # USER PREFERENCES
      Budget: ${maxBudget}
      Weather: ${weather}
      Location Type: ${locationType}
      Transport: ${transport}

      # TASK
      Select the BEST 3 destinations from the list above.
      All selected destinations MUST be within the user's budget.
      Return ONLY a minified JSON array with this structure:
      [{"destination_name":"", "reason_for_match":"", "estimated_budget":0}]
    `;

    // Step 3: Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    let cleaned = result.response.text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json(JSON.parse(cleaned));
  } catch (error) {
    console.error("Method C Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
