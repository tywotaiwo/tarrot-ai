import styles from '../styles/Shuffle.module.css';
import React, { useState, useRef, useEffect } from 'react';

export function ShuffleAndCut({ isShuffling, startShuffling, stopShuffling, displayCutUI, deck }) {
  const [hasStartedShuffling, setHasStartedShuffling] = useState(false);

  const handleStartShuffling = () => {
      setHasStartedShuffling(true);
      startShuffling();
  };

  console.log("is shuffling", isShuffling);
  return (
      <div className={styles.shuffleContainer}>
          {isShuffling ? (
            <>
            <div className={styles.cardShuffleContainer}>
                <div className={styles.cardShuffleAnimation}>
                    {deck.slice(0, 6).map((card, index) => (  // Only take the first 6 cards from the deck
                        <div key={index} className={styles.cardStack}>
                            <img src={card.image} alt={card.name} className={styles.cardBack} />
                        </div>
                    ))}
                </div>
                <button onClick={stopShuffling} className={`${styles.shuffleButton} ${styles.stopShufflingButton}`}>
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
                      {deck.length > 0 && hasStartedShuffling && displayCutUI()}
                  </div>
              </>
          )}
      </div>
  );
}

