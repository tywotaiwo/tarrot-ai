import { db } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

import crypto from 'crypto';

function verifySignature(req) {
    const signature = req.headers['x-cc-webhook-signature'];
    const secret = process.env.COINBASE_WEBHOOK_SECRET;
    const payload = JSON.stringify(req.body);

    const hmac = crypto.createHmac('sha256', secret);
    const hash = hmac.update(payload).digest('hex');

    return hash === signature;
}

export default async function handler(req, res) {
    if (!verifySignature(req)) {
        return res.status(401).end('Signature verification failed');
    }
    if (req.method === 'POST') {
        const { event } = req.body;

        console.log('Webhook received:', event);

        if (event.type === 'charge:confirmed') {
            const charge = event.data;
            const userId = charge.metadata.userId; // Assuming you pass userId in metadata when creating the charge
            const amount = charge.pricing.local.amount; // Amount that was paid

            try {
                // Update user's balance
                const userRef = doc(db, 'users', userId);
                await updateDoc(userRef, {
                    balance: increment(amount) // Use increment to safely add to existing balance
                });
                res.status(200).send('Balance updated successfully');
            } catch (error) {
                console.error('Error updating user balance:', error);
                res.status(500).send('Failed to update balance');
            }
        } else {
            res.status(200).send('Event type not handled');
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
