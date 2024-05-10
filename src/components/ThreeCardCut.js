import React, { useState } from 'react';
import styles from '../styles/CutCards.module.css';

const ThreeCardCut = ({ deck, onCutsComplete }) => {
    const [cutIndices, setCutIndices] = useState({
        first: null,
        second: null
    });

    const handleCut = (key, value) => {
        setCutIndices(prev => ({
            ...prev,
            [key]: parseInt(value)
        }));
    };

    const finalizeCuts = () => {
        const firstCut = cutIndices.first || Math.floor(deck.length / 3);
        const secondCut = cutIndices.second || Math.floor(2 * deck.length / 3);
        const firstPart = deck.slice(0, firstCut);
        const secondPart = deck.slice(firstCut, secondCut);
        const thirdPart = deck.slice(secondCut, deck.length);
        onCutsComplete([firstPart[0], secondPart[0], thirdPart[0]]);
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>Please cut the deck into three parts:</p>
            <div className={styles.cardStacks}>
                {['first', 'second'].map((key, idx) => (
                    <div key={key} className={styles.stackContainer}>
                        {cutIndices[key] !== null ? (
                            <div className={styles.cardStack}>
                                {deck.slice(0, cutIndices[key]).map((card, index) => (
                                    <img
                                        key={index}
                                        src="/cards/card-back.webp"
                                        alt={`Card ${index}`}
                                        className={styles.cardImage}
                                        style={{ transform: `translateY(${-index * 2}px)` }}
                                    />
                                ))}
                                <p className={styles.rangeText}>Cut at {cutIndices[key]}</p>
                            </div>
                        ) : (
                            <div className={styles.placeholder}>
                                Place for cut {idx + 1}
                            </div>
                        )}
                        {idx < 2 && (
                            <input
                                type="range"
                                min={idx === 0 ? 1 : cutIndices.first + 1}
                                max={idx === 0 ? (cutIndices.second || deck.length - 1) - 1 : deck.length - 1}
                                onChange={e => handleCut(key, e.target.value)}
                                className={styles.rangeTrack}
                            />
                        )}
                    </div>
                ))}
                <div className={styles.stackContainer}>
                    <div className={styles.cardStack}>
                        {cutIndices.second ? deck.slice(cutIndices.second).map((card, index) => (
                            <img
                                key={index}
                                src="/cards/card-back.webp"
                                alt={`Card ${index}`}
                                className={styles.cardImage}
                                style={{ transform: `translateY(${-index * 2}px)` }}
                            />
                        )) : <div className={styles.placeholder}>Place for third cut</div>}
                        {cutIndices.second && <p className={styles.rangeText}>Cut from {cutIndices.second} to end</p>}
                    </div>
                </div>
            </div>
            <button className={styles.button} onClick={finalizeCuts}>Confirm Cuts</button>
        </div>
    );
};

export default ThreeCardCut;
