import React, { useState } from 'react';
import styles from '../styles/CutCards.module.css';

const DailyCardCut = ({ deck, onCutComplete }) => {
    const [cutIndex, setCutIndex] = useState(Math.floor(deck.length / 2));

    const handleCut = () => {
        const selectedCard = deck[cutIndex];
        console.log("Cut made at index:", cutIndex, "Card chosen:", selectedCard.name);
        onCutComplete(selectedCard);
    };

    const updateCutIndex = (e) => {
        const newCutIndex = parseInt(e.target.value);
        console.log("Slider moved to index:", newCutIndex);  // This will log every time the slider moves
        setCutIndex(newCutIndex);
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>Please cut the deck:</p>
            <div className={styles.cardStack}>
                {deck.map((card, index) => (
                    <img
                        key={index}
                        src="/cards/card-back.webp"
                        alt={`Card ${index}`}
                        className={`${styles.cardImage} ${index === cutIndex ? styles.chosenCard : ''}`}
                        // Ensure that the transformation is correct per the new index interpretation
                        style={{ transform: `translateX(${index <= cutIndex ? '0' : '100%'})` }}
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

export default DailyCardCut;
