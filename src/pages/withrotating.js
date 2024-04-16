import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [deck, setDeck] = useState(tarotDeck.map(card => ({ ...card, rotated: false })));
    const [selectedCards, setSelectedCards] = useState([]);
    const [reading, setReading] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [isShuffling, setIsShuffling] = useState(false);
    const [questionSubmitted, setQuestionSubmitted] = useState(false);
    const [showReading, setShowReading] = useState(false);
    const shuffleIntervalRef = useRef(null);
    const [isFetchingReading, setIsFetchingReading] = useState(false);

    useEffect(() => {
        if (selectedCards.length === 6) {
            setIsShuffling(false);
        }
    }, [selectedCards]);

    const shuffleCards = () => {
        const shuffledDeck = [...deck].map(card => ({
            ...card,
            rotated: Math.random() > 0.5 // Randomly assign rotation
        })).sort(() => Math.random() - 0.5);
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
        if (selectedCards.length < 6 && !selectedCards.includes(card)) {
            setSelectedCards([...selectedCards, card]);
        }
    };

    const getReading = async () => {
        setIsFetchingReading(true);
        setShowReading(false);
        const response = await fetch('/api/read', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cards: selectedCards.map(card => ({ name: card.name, rotated: card.rotated })) })
        });
        const data = await response.json();
        setReading(data.reading);
        setIsFetchingReading(false);
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
                    <p className={styles.questionText}>Question: {userQuestion}</p>
                )}

                {isShuffling && (
                    <div className={styles.shufflingContainer}>
                        <div className={styles.activityIndicator}>Shuffling...</div>
                        <button onClick={stopShuffling} className={styles.stopShufflingButton}>
                            Stop Shuffling
                        </button>
                        <div className={styles.cardContainer}>
                            {deck.slice(0, 6).map((card, index) => (
                                <div key={index} className={`${styles.card} ${card.rotated ? styles.rotated : ''}`}>
                                    <img src="/cards/card-back.webp" alt="Card Back" className={styles.cardImage} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!isShuffling && questionSubmitted && (
                    <div className={styles.cardContainer}>
                        <div className={styles.activityIndicator}>Choose 6 Cards</div>
                        {deck.map((card, index) => (
                            <div key={index} onClick={() => selectCard(card)} className={`${styles.card} ${selectedCards.includes(card) ? styles.selected : ''} ${card.rotated ? styles.rotated : ''}`}>
                                <img src={selectedCards.includes(card) ? card.image : "/cards/card-back.webp"} alt={card.name} className={styles.cardImage} />
                            </div>
                        ))}
                    </div>
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

