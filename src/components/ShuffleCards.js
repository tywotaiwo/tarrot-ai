import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from '../styles/Shuffle.module.css';

import { TarotContext } from '../contexts/TarotContext';
export function ShuffleCards({ isShuffling, startShuffling, stopShuffling }) {
  const { deck, updateDeck } = useContext(TarotContext);
    const [hasStartedShuffling, setHasStartedShuffling] = useState(false);
    const [shuffledDeck, setShuffledDeck] = useState(deck);
    const shuffleIntervalRef = useRef(null);

    useEffect(() => {
        setShuffledDeck([...deck]);  // Ensure we're using the latest deck
    }, [deck]);

    const handleStartShuffling = () => {
        if (!hasStartedShuffling) {
            setHasStartedShuffling(true);
            startShuffling();
            shuffleIntervalRef.current = setInterval(() => {
                shuffleDeck();
            }, 20);  // Adjust time interval to control shuffle speed
        }
    };

    
    const handleStopShuffling = () => {
      if (isShuffling) {
          clearInterval(shuffleIntervalRef.current);
          stopShuffling();
          updateDeck(shuffledDeck); // Update the deck in the context with the shuffled deck
      }
  };

    const shuffleDeck = () => {
        let newDeck = [...shuffledDeck];
        for (let i = newDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }
        setShuffledDeck(newDeck);
    };

    return (
        <div className={styles.shuffleContainer}>
            {isShuffling ? (
                <>
                    <div className={styles.cardShuffleContainer}>
                        <div className={styles.cardShuffleAnimation}>
                            {shuffledDeck.slice(0, 3).map((card, index) => (
                                <div key={index} className={styles.cardStack}>
                                    <img src={card.image} alt={card.name} className={styles.cardBack} />
                                </div>
                            ))}
                             
                        </div>
                        <button onClick={handleStopShuffling} className={`${styles.shuffleButton} ${styles.stopShufflingButton}`}>
                            Stop Shuffling
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.cardDisplay}>
            {deck.length > 0 && (
              <div className={styles.cardStack}>
                <img src="/cards/card-back.webp" alt="Card Back" className={styles.cardBack} />
                <img src="/cards/card-back.webp" alt="Card Back" className={styles.cardBack} />
                <img src="/cards/card-back.webp" alt="Card Back" className={styles.cardBack} />
              </div>
            )}
            {deck.length > 0 && !hasStartedShuffling && (
              <button onClick={handleStartShuffling} className={`${styles.shuffleButton} ${styles.startShufflingButton}`}>
                Start Shuffling
              </button>
            )}
          </div>
                </>
            )}
        </div>
    );
}
