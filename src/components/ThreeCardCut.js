import React, { useState } from 'react';
import styles from '../styles/ThreeCardsCut.module.css';

const ThreeCardCut = ({ deck, onCutsComplete }) => {
    const [cutIndex, setCutIndex] = useState(null);
    const [cuts, setCuts] = useState([]); // Stores indices of the cuts
    const [currentPhase, setCurrentPhase] = useState(0); // 0: before any cuts, 1: after first cut, 2: after second cut

    // Handle the value change on the range input
    const handleCut = (value) => {
        setCutIndex(parseInt(value, 10));
    };

    // Confirm cut and proceed to the next phase or finalize cuts
    const processCut = () => {
        if (currentPhase < 2) {
            setCuts([...cuts, cutIndex]);
            setCurrentPhase(currentPhase + 1);
            setCutIndex(null); // Reset cut index for the next range input
        } else {
            const firstPart = deck.slice(0, cuts[0]);
            const secondPart = deck.slice(cuts[0], cuts[1]);
            const thirdPart = deck.slice(cuts[1]);
            onCutsComplete([firstPart, secondPart, thirdPart]);
        }
    };

    // Helper function to display the deck parts
    const displayDeckPart = (start, end) => (
        deck.slice(start, end).map((card, index) => (
            <img
                key={index}
                src="/cards/card-back.webp"
                alt={`Card ${index}`}
                className={styles.cardImage}
                style={{ transform: `translateY(${-index * 2}px)` }}
            />
        ))
    );

    return (
        <div className={styles.container}>
            <p className={styles.title}>Please cut the deck into three parts:</p>
            <div className={styles.cardStacks}>
                {/* Display all cuts or placeholders */}
                {[0, cuts[0], cuts[1]].map((cut, index) => (
                    <div key={index} className={styles.stackContainer}>
                        {cuts.length > index ? (
                            <div className={styles.cardStack}>
                                {displayDeckPart(index === 0 ? 0 : cuts[index - 1], index < cuts.length ? cuts[index] : deck.length)}
                                <p className={styles.rangeText}>Cut at {cuts[index]}</p>
                            </div>
                        ) : (
                            <div className={styles.placeHolderStack}>  <div className={styles.placeholder}>Place for cut {index + 1}</div> </div>
                        )}
                    </div>
                ))}
            </div>
            {currentPhase < 2 && (
                <input
                    type="range"
                    min={currentPhase === 0 ? 1 : cuts[0] + 1}
                    max={deck.length - 1}
                    value={cutIndex || (currentPhase === 0 ? 1 : cuts[0] + 1)}
                    onChange={(e) => handleCut(e.target.value)}
                    className={styles.rangeTrack}
                    disabled={currentPhase === 2}
                />
            )}
            <button className={styles.button} onClick={processCut} disabled={cutIndex === null || currentPhase === 2}>
                {currentPhase < 2 ? "Make Cut" : "Cuts Complete"}
            </button>
        </div>
    );
};

export default ThreeCardCut;
