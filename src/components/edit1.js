import React, { useState } from 'react';
import styles from '../styles/ThreeCardsCut.module.css';

const ThreeCardCut = ({ deck, onCutsComplete }) => {
    const [cutIndex, setCutIndex] = useState(null);
    const [currentPhase, setCurrentPhase] = useState(0); // 0: First cut, 1: Second cut, 2: Complete

    // Update cut index
    const handleCut = (value) => {
        setCutIndex(parseInt(value, 10));
    };

    // Process each cut
    const processCut = () => {
        if (currentPhase === 0) {
            setCurrentPhase(1);
        } else if (currentPhase === 1) {
            const firstPart = deck.slice(0, cutIndex);
            const secondPart = deck.slice(cutIndex);
            const secondCut = secondPart.length / 2;
            const finalParts = [
                firstPart,
                secondPart.slice(0, secondCut),
                secondPart.slice(secondCut)
            ];
            onCutsComplete(finalParts);
            setCurrentPhase(2);
        }
    };

    // Display for cutting
    const displayDeck = (deck) => (
        <div className={styles.cardStack}>
            {deck.map((card, index) => (
                <img
                    key={index}
                    src="/cards/card-back.webp"
                    alt={`Card ${index}`}
                    className={styles.cardImage}
                    style={{ transform: `translateY(${-index * 2}px)` }}
                />
            ))}
        </div>
    );

    return (
        <div className={styles.container}>
            <p className={styles.title}>Please cut the deck into three parts:</p>
            {displayDeck(deck)}
            <div className={styles.rangeContainer}>
                <input
                    type="range"
                    min={1}
                    max={currentPhase === 0 ? deck.length - 1 : deck.length - cutIndex - 1}
                    onChange={(e) => handleCut(e.target.value)}
                    className={styles.rangeTrack}
                />
                <button className={styles.button} onClick={processCut} disabled={cutIndex === null}>
                    {currentPhase === 0 ? "Make First Cut" : "Make Second Cut"}
                </button>
            </div>
            {currentPhase === 2 && <p className={styles.completeText}>Cuts complete!</p>}
        </div>
    );
};

export default ThreeCardCut;
