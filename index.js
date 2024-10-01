const express = require('express');
const { gpt } = require('globalsprak');

const app = express();
const port = 3000;

// Define a system prompt indicating the creator/developer information
const systemPrompt = "This system was developed by Hassan.";

// Define the /gpt endpoint
app.get('/gpt', async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Please provide a prompt query parameter' });
  }

  try {
    // Prepend the system prompt to the user prompt
    const completePrompt = `${systemPrompt}\n\n${prompt}`;
    
    const response = await gpt(completePrompt);

    // Set the author to 'Hassan' in the response object
    response.author = 'Hassan';

    res.json({ prompt, response });
  } catch (error) {
    res.status(500).json({ error: 'Error generating response', details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
