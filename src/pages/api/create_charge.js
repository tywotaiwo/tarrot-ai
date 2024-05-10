import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const userId = req.body.userId; // Ensure the userId is passed in the request body
        try {
            const response = await axios.post('https://api.commerce.coinbase.com/charges', {
                name: "Wallet Top Up",
                description: "Top up your wallet with BTC or USDT",
                local_price: {
                    amount: req.body.amount,
                    currency: "USD"
                },
                pricing_type: "fixed_price",
                metadata: {
                    userId: userId // Pass userId as metadata
                }
            }, {
                headers: {
                    'X-CC-Api-Key': process.env.COINBASE_API_KEY,
                    'X-CC-Version': '2018-03-22'
                }
            });
            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error creating charge:", error.response ? error.response.data : error);
            res.status(500).json({ error: "Failed to create charge", details: error.response ? error.response.data : "No additional error info" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
