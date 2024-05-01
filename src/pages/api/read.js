// pages/api/read.js
import { Configuration, OpenAIApi } from "openai";

import { AzureKeyCredential, TextAnalysisClient } from "@azure/ai-language-text";

export default async function handler(req, res) {
    // Directly set API key and Endpoint
    const apiKey = 'a308bff34ec1431fb57a5a74a225fb8d';  // Replace with your actual API key
    const endpoint = 'https://ai-7903401ai915397063827.openai.azure.com/';  // Replace with your actual endpoint

    const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

    // Create prompt
    const prompt = `Provide a detailed tarot reading based on the following cards: ${req.body.cards.map(card => card.name).join(", ")}`;

    // Send request to Llama 3 using Azure OpenAI
    const response = await client.analyzeConversation({
        analysisInput: {
            conversationItem: {
                text: prompt,
                id: "1",
                participantId: "user"
            }
        },
        parameters: {
            projectName: "your-project-name",  // Replace with your actual project name if required
            deploymentName: "your-deployment-name",  // Replace with your actual deployment name if it applies
            isLoggingEnabled: true  // Enable logging if you need diagnostics
        }
    });

    // Extract and send back the response
    if (response.results) {
        const resultText = response.results.reply.text;
        res.status(200).json({ reading: resultText });
    } else {
        res.status(500).json({ error: "Failed to retrieve reading from Azure" });
    }
}


export async function jhandler(req, res) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const prompt = `Provide a detailed tarot reading based on the following cards: ${req.body.cards.map(card => card.name).join(", ")}`;

    const response = await openai.createCompletion({
        model: "text-davinci-004",
        prompt: prompt,
        max_tokens: 150
    });

    res.status(200).json({ reading: response.data.choices[0].text });
}

export  async function generichandler(req, res) {
    // Simulate a delay to mimic API call latency
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generic reading message
    const genericReading = `This is a general tarot reading based on the cards you have selected: ${req.body.cards.join(", ")}. Each card reflects different facets of your past, present, and future. Take this insight and think about how it applies to your personal situation.`;

    res.status(200).json({ reading: genericReading });
}
