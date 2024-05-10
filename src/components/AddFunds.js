import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const AddFunds = () => {
  const [amount, setAmount] = useState('');
  const { user } = useAuth(); // Get the user from AuthContext

  const handleTopUp = async () => {
    if (!user) {
      alert('You must be logged in.');
      return;
    }
    try {
      const response = await axios.post('/api/create_charge', {
        amount,
        userId: user.uid // Send the userId along with the amount
      });
      window.location.href = response.data.data.hosted_url; // Redirect to Coinbase Commerce payment page
    } catch (error) {
      console.error('Error initiating top up:', error);
    }
  };

  return (
    <div>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount in USD" />
      <button onClick={handleTopUp}>Add Funds</button>
    </div>
  );
};

export default AddFunds;
