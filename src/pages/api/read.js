// pages/api/read.js
import { Configuration, OpenAIApi } from "openai";
// pages/api/read.js

export default async function handler(req, res) {
    // Simulate a delay to mimic API call latency
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generic reading message
    const genericReading = `This is a general tarot reading based on the cards you have selected: ${req.body.cards.join(", ")}. Each card reflects different facets of your past, present, and future. Take this insight and think about how it applies to your personal situation.`;

    res.status(200).json({ reading: genericReading });
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
