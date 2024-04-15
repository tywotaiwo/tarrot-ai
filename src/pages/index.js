import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [deck, setDeck] = useState(tarotDeck);
    const [selectedCards, setSelectedCards] = useState([]);
    const [reading, setReading] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [isShuffling, setIsShuffling] = useState(false);
    const [questionSubmitted, setQuestionSubmitted] = useState(false);
    const [showReading, setShowReading] = useState(false);
    const shuffleIntervalRef = useRef(null);

    useEffect(() => {
        if (selectedCards.length === 3) {
            setIsShuffling(false);
        }
    }, [selectedCards]);

    const shuffleCards = () => {
        const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
        setDeck(shuffledDeck);
    };

    const startShuffling = () => {
        setQuestionSubmitted(true);
        setIsShuffling(true);
        shuffleIntervalRef.current = setInterval(shuffleCards, 150);
    };

    const stopShuffling = () => {
        clearInterval(shuffleIntervalRef.current);
        setIsShuffling(false);
    };

    const selectCard = (card) => {
        if (selectedCards.length < 3 && !selectedCards.includes(card)) {
            setSelectedCards([...selectedCards, card]);
        }
    };
const getReading = async () => {
    setShowReading(false);  // Hide reading initially
    const response = await fetch('/api/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cards: selectedCards.map(card => card.name) })
    });
    const data = await response.json();
    
    // Simulate gradual text output as if the reading is being typed out.
    let currentText = '';
    for (let i = 0; i < data.reading.length; i++) {
        currentText += data.reading[i];
        setReading(currentText);
        await new Promise(r => setTimeout(r, 50));  // Reduced delay to mimic typing more quickly
    }
    setShowReading(true);
};

    const reset = () => {
        setSelectedCards([]);
        setReading('');
        setUserQuestion('');
        setQuestionSubmitted(false);
        setShowReading(false);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Tarrot AI</title>
                <meta name="description" content="Discover your future with Tarrot AI" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Tarrot AI - Discover Your Future</h1>
                
                {!questionSubmitted ? (
                    <>
                        <textarea
                            className={styles.questionInput}
                            placeholder="Enter your question here..."
                            value={userQuestion}
                            onChange={(e) => setUserQuestion(e.target.value)}
                        />
                        <button onClick={startShuffling} className={styles.shuffleButton}>
                            Shuffle Cards
                        </button>
                    </>
                ) : (
                    <p className={styles.questionText}>{userQuestion}</p>
                )}
                
                {isShuffling && (
                    <div className={styles.shufflingContainer}>
                        <div className={styles.activityIndicator}>Shuffling...</div>
                        <button onClick={stopShuffling} className={styles.stopShufflingButton}>
                            Stop Shuffling
                        </button>
                    </div>
                )}
                
                {!isShuffling && questionSubmitted && (
                    <div className={styles.cardContainer}>
                        {deck.map((card, index) => (
                            <div key={index} onClick={() => selectCard(card)} className={`${styles.card} ${selectedCards.includes(card) ? styles.selected : ''}`}>
                                <img src={selectedCards.includes(card) ? card.image : "/cards/card-back.webp"} alt={card.name} className={styles.cardImage} />
                            </div>
                        ))}
                    </div>
                )}

                {selectedCards.length === 3 && !showReading && (
                    <button onClick={getReading} className={styles.readingButton}>
                        Show and Get Reading
                    </button>
                )}
                
                {showReading && (
                    <div className={styles.reading}>
                        <h2>Your Reading</h2>
                        <p>{reading}</p>
                        <button onClick={reset} className={styles.resetButton}>Ask Another Question</button>
                    </div>
                )}

            </main>
        </div>
    );
}

// This array should be expanded with all tarot cards and proper descriptions.
const tarotDeck = [
    { name: "The Fool", image: "/cards/the-fool.webp", description: "Beginnings, innocence, spontaneity, a free spirit" },
    { name: "The Magician", image: "/cards/the-magician.webp", description: "Power, skill, concentration, action, resourcefulness" },
    { name: "The High Priestess", image: "/cards/the-high-priestess.webp", description: "Wisdom, knowledge, learning" },
    // Add other cards in a similar fashion
];


