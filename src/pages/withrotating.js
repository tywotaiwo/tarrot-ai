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

const tarotDeck = [
    { name: "The Fool", image: "/cards/the-fool.webp", description: "Beginnings, innocence, spontaneity, a free spirit" },
    { name: "The Magician", image: "/cards/the-magician.webp", description: "Power, skill, concentration, action, resourcefulness" },
    { name: "The High Priestess", image: "/cards/the-high-priestess.webp", description: "Wisdom, knowledge, learning" },
    { name: "The Empress", image: "/cards/the-empress.webp", description: "Motherhood, fertility, nature, and abundance" },
    { name: "The Emperor", image: "/cards/the-emperor.webp", description: "Authority, structure, control, fatherhood" },
    { name: "The Hierophant", image: "/cards/the-hierophant.webp", description: "Tradition, conformity, morality, ethics" },
    { name: "The Lovers", image: "/cards/the-lovers.webp", description: "Relationships, choices, love, unity" },
    { name: "The Chariot", image: "/cards/the-chariot.webp", description: "Victory, will power, determination, success" },
    { name: "Strength", image: "/cards/strength.webp", description: "Courage, persuasion, influence, compassion" },
    { name: "The Hermit", image: "/cards/the-hermit.webp", description: "Solitude, search for personal truth, introspective" },
    { name: "Wheel of Fortune", image: "/cards/the-wheel-of-fortune.webp", description: "Fate, change, cycles, inevitable fate" },
    { name: "Justice", image: "/cards/justice.webp", description: "Law, fairness, truth, cause and effect" },
    { name: "The Hanged Man", image: "/cards/the-hanged-man.webp", description: "Sacrifice, release, martyrdom, new perspectives" },
    { name: "Death", image: "/cards/death.webp", description: "Endings, beginnings, change, transformation" },
    { name: "Temperance", image: "/cards/temperance.webp", description: "Balance, moderation, purpose, meaning" },
    { name: "The Devil", image: "/cards/the-devil.webp", description: "Addiction, materialism, playfulness, bondage" },
    { name: "The Tower", image: "/cards/the-tower.webp", description: "Disaster, upheaval, sudden change, revelation" },
    { name: "The Star", image: "/cards/the-star.webp", description: "Hope, inspiration, creativity, calmness" },
    { name: "The Moon", image: "/cards/the-moon.webp", description: "Illusion, fear, anxiety, subconscious" },
    { name: "The Sun", image: "/cards/the-sun.webp", description: "Positivity, fun, warmth, success" },
    { name: "Judgment", image: "/cards/judgment.webp", description: "Judgement, rebirth, inner calling, absolution" },
    { name: "The World", image: "/cards/the-world.webp", description: "Completion, integration, accomplishment, travel" }
];
