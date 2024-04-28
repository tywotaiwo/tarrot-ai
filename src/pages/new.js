import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [deck, setDeck] = useState(tarotDeck);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedReadingType, setSelectedReadingType] = useState('');
    const [selectedCards, setSelectedCards] = useState([]);
    const [reading, setReading] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [isShuffling, setIsShuffling] = useState(false);
    const shuffleIntervalRef = useRef(null);

    useEffect(() => {
        shuffleDeck(3); // Shuffle 3 times on load for realism
    }, []);

    const shuffleDeck = (times = 1) => {
        setIsShuffling(true);
        let counter = 0;
        shuffleIntervalRef.current = setInterval(() => {
            if (counter < times) {
                const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
                setDeck(shuffledDeck);
                counter++;
            } else {
                clearInterval(shuffleIntervalRef.current);
                setIsShuffling(false);
                setCurrentStep(3); // Move to allow cutting the deck
            }
        }, 150);
    };

    const handleCut = (index) => {
        // User decides the cut point by clicking a button or dragging a slider
        const newDeck = [...deck.slice(index), ...deck.slice(0, index)];
        setDeck(newDeck);
        setCurrentStep(4); // Proceed to card selection
    };

    const displayCutUI = () => {
        // Placeholder for UI element to select cut index, could be a slider
        return (
            <div>
                <input type="range" min="1" max={deck.length} defaultValue={deck.length / 2}
                    onChange={(e) => handleCut(parseInt(e.target.value))} />
                <button onClick={() => handleCut(Math.floor(deck.length / 2))}>Cut Here</button>
            </div>
        );
    };

    const selectCard = (card) => {
        if (selectedCards.length < selectedReadingType.maxCards && !selectedCards.includes(card)) {
            setSelectedCards([...selectedCards, card]);
        }
    };

    // Reset function here
    // getReading function here

    return (
        <div className={styles.container}>
            <Head>
                <title>Tarot AI - Discover Your Future</title>
                <meta name="description" content="Discover your future with Tarot AI" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                {/* UI rendering logic here, simplified for brevity */}
                {currentStep === 3 && displayCutUI()}
                {currentStep === 4 && deck.slice(0, selectedReadingType.maxCards).map((card, index) => (
                    <div key={index} onClick={() => selectCard(card)} className={styles.card}>
                        <img src={card.image} alt={card.name} className={styles.cardImage} />
                    </div>
                ))}
                {/* Further steps and UI rendering */}
            </main>
        </div>
    );
}

// Define tarotDeck array here
