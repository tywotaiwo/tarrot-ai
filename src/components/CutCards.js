import React, { useState } from 'react';
import styles from '../styles/CutCards.module.css';

const CutCards = ({ deck, onCutComplete }) => {
    const [cutIndex, setCutIndex] = useState(Math.floor(deck.length / 2));

    const handleCut = () => {
        const newDeck = [...deck.slice(cutIndex), ...deck.slice(0, cutIndex)];
        onCutComplete(newDeck);
        console.log("Cut made at index:", cutIndex, "Card chosen:", deck[cutIndex].name); // Logs the index and card name
    };

    const updateCutIndex = (e) => {
        setCutIndex(parseInt(e.target.value));
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>Please cut the deck:</p>
            <div className={styles.cardStack}>
                {deck.map((card, index) => (
                    <img
                        key={index}
                        src={card.image}
                        alt={`Card ${index}`}
                        className={`${styles.cardImage} ${index === cutIndex ? styles.chosenCard : ''}`}
                        style={{ transform: `translateX(${index < cutIndex ? 0 : 100}%)` }}
                    />
                ))}
            </div>
            <input
                type="range"
                min="0"
                max={deck.length - 1}
                value={cutIndex}
                onChange={updateCutIndex}
                className={styles.rangeTrack}
            />
            <button
                className={styles.button}
                onClick={handleCut}
            >
                Cut Here
            </button>
        </div>
    );
};

export default CutCards;
