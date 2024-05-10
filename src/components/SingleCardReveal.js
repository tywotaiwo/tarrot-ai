import React, { useState } from 'react';
import styles from '../styles/SingleCardReveal.module.css'; // Make sure to create and style this CSS module

const SingleCardReveal = ({ card, onReset }) => {
    const [revealed, setRevealed] = useState(false);

    const handleRevealClick = () => {
        setRevealed(true);
    };

    return (
        <div>
        <div className={styles.cardContainer}>
            <img
                src={revealed ? card.image : '/cards/card-back.webp'}
                alt={revealed ? card.name : "Card Back"}
                className={styles.cardImage}
            />
            {!revealed && (
                <button className={styles.revealButton} onClick={handleRevealClick}>
                    Reveal Your Card
                </button>
            )}
        </div>
        {revealed && (
                <div className={styles.reset}>
     
                <button onClick={onReset} className={styles.resetButton}>Start Over</button>
              </div>
            )}
       
      </div>
    );
};

export default SingleCardReveal;
