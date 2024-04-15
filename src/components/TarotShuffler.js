// components/TarotShuffler.js
import { useState } from 'react';
import { tarotDeck } from '../pages/api/cards';

export default function TarotShuffler() {
    const [deck, setDeck] = useState(tarotDeck);

    const shuffleCards = () => {
        const shuffled = [...deck].sort(() => 0.5 - Math.random());
        setDeck(shuffled);
    };

    const selectCard = (index) => {
        const card = deck[index];
        // Implement logic to handle selected card
        console.log(card);
    };

    return (
        <div>
            <button onClick={shuffleCards}>Shuffle Cards</button>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {deck.map((card, index) => (
                    <div key={index} onClick={() => selectCard(index)}>
                        <img src={card.image} alt={card.name} style={{ width: '100px', height: '160px' }} />
                    </div>
                ))}
            </div>
        </div>
    );
}
