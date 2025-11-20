const axios = require('axios');

// Testing Case
const testInput = {
    maxBudget: 1000,
    weather: "Cold",
    locationType: "City",
    transport: "Public Transport"
};

const runTest = async () => {
    console.log("\n STARTING EVALUATION EXPERIMENT...");
    console.log("User Input:", JSON.stringify(testInput, null, 2));
    console.log("------------------------------------------------\n");

    // Testing Method A (No Gemini using only Database)
    try {
        console.log("Testing Method A (No AI)...");
        const startA = Date.now();
        const resA = await axios.post('http://localhost:3000/api/research/method-a', testInput);
        console.log(` Method A Success (${Date.now() - startA}ms)`);
        console.log("Output:", JSON.stringify(resA.data, null, 2));
    } catch (err) {
        console.log(" Method A Failed:", err.message);
    }

    console.log("\n------------------------------------------------\n");

    // Testing Method B (Using Gemini but with no extra prompt)
    try {
        console.log("Testing Method B (Basic Gemini)...");
        const startB = Date.now();
        const resB = await axios.post('http://localhost:3000/api/research/method-b', testInput);
        console.log(`Method B Success (${Date.now() - startB}ms)`);
        console.log("Output:", JSON.stringify(resB.data, null, 2));
    } catch (err) {
        console.log("Method B Failed:", err.message);
    }

    console.log("\n------------------------------------------------\n");

    // Testing Methdod C (Using Gemini with extra prompt)
    try {
        console.log("Testing Method C (Advanced Gemini)...");
        const startC = Date.now();
        const resC = await axios.post('http://localhost:3000/api/research/method-c', testInput);
        console.log(`Method C Success (${Date.now() - startC}ms)`);
        console.log("Output:", JSON.stringify(resC.data, null, 2));
    } catch (err) {
        console.log(" Method C Failed:", err.message);
    }

    console.log("------------------------------------------------\n");

    process.exit(0);
};

runTest();
