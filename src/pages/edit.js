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

    const handleCut = (index) => {
        // User decides the cut point by clicking a button or dragging a slider
        const newDeck = [...deck.slice(index), ...deck.slice(0, index)];
        setDeck(newDeck);
        setCurrentStep(4); // Proceed to card selection
    };

    const shuffleDeck = () => {
        setIsShuffling(true);
        const shuffleTimes = 5; // Shuffle the deck 5 times for better randomness
        let count = 0;
        shuffleIntervalRef.current = setInterval(() => {
            if (count < shuffleTimes) {
                const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
                setDeck(shuffledDeck);
                count++;
            } else {
                clearInterval(shuffleIntervalRef.current);
                setIsShuffling(false);
                setCurrentStep(3); // Move to allow cutting the deck
            }
        }, 150);
    };
    
    const displayCutUI = () => {
        // Enhanced UI for cutting the deck
        return (
            <div className={styles.cutContainer}>
                <p>Please cut the deck:</p>
                <input type="range" min="1" max={deck.length} defaultValue={Math.floor(deck.length / 2)}
                    className={styles.cutSlider}
                    onChange={(e) => handleCut(parseInt(e.target.value))} />
                <button className={styles.cutButton} onClick={() => handleCut(Math.floor(deck.length / 2))}>
                    Cut Here
                </button>
            </div>
        );
    };
    
    const selectCard = (card) => {
        if (!selectedCards.includes(card) && selectedCards.length < selectedReadingType.maxCards) {
            setSelectedCards([...selectedCards, card]);
        }
    }; 
    // Include UI rendering inside your return statement as is, but ensure that it is clean and understandable for the user.

    const selectReadingType = (type) => {
        setSelectedReadingType(type);
        setCurrentStep(2);  // Move to card selection/shuffling
    };

   

    const reset = () => {
        setSelectedCards([]);
        setReading('');
        setUserQuestion('');
        setCurrentStep(1);
        shuffleDeck();
    };

    const getReading = async () => {
        const response = await fetch('/api/read', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cards: selectedCards.map(card => card.name), type: selectedReadingType, question: userQuestion })
        });
        const data = await response.json();
        setReading(data.reading);
        setCurrentStep(5); // Show the final reading
    };
 
    const startShuffling = () => {
        setIsShuffling(true);
        shuffleIntervalRef.current = setInterval(() => {
            const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
            setDeck(shuffledDeck);
        }, 150);
    };
    
    const stopShuffling = () => {
        clearInterval(shuffleIntervalRef.current);
        setIsShuffling(false);
        setCurrentStep(3); // Move to allow cutting the deck
    };
    
    return (
        <div className={styles.container}>
            <Head>
                <title>Tarot AI - Discover Your Future</title>
                <meta name="description" content="Discover your future with Tarot AI" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Tarot AI - Discover Your Future</h1>
                {currentStep === 1 && (
                    <div className={styles.buttonContainer}>
                        {['Three-Card Spread', 'Celtic Cross Spread', 'One-Card Daily', 'Love Spread', 'Career Spread'].map(type => (
                            <button key={type} className={styles.readingTypeButton} onClick={() => selectReadingType({ type, maxCards: type === 'One-Card Daily' ? 1 : type === 'Three-Card Spread' ? 3 : type === 'Celtic Cross Spread' ? 10 : 6 })}>
                                {type}
                            </button>
                        ))}
                    </div>
                )}

{currentStep === 2 && (
    <>
        {!isShuffling && (
            <div>
               <div className={styles.cardStackContainer}>
    {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className={styles.stackedCard} style={{ transform: `translateX(${idx * -10}px)` }}>
            <img src="/cards/card-back.webp" alt="Card Back" className={styles.stackedCardImage} />
        </div>
    ))}
</div>

                <button className={styles.shuffleButton} onClick={startShuffling}>Shuffle and Cut</button>
            </div>
        )}

        {isShuffling && (
            <div className={styles.shufflingContainer}>
                <div className={styles.cardContainer}>
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx} className={`${styles.card} ${styles.shufflingEffect}`}>
                            <img src="/cards/card-back.webp" alt="Card Back" className={styles.cardImage} />
                        </div>
                    ))}
                </div>
                <div className={styles.activityIndicator}>Shuffling...</div>
                <button onClick={stopShuffling} className={styles.stopShufflingButton}>
                    Stop Shuffling
                </button>
            </div>
        )}
    </>
)}

{currentStep === 3 && displayCutUI()}
              
                {currentStep === 4 && deck.slice(0, selectedReadingType.maxCards).map((card, index) => (
                    <div key={index} onClick={() => selectCard(card)} className={styles.card}>
                        <img src={card.image} alt={card.name} className={styles.cardImage} />
                    </div>
                ))}
{selectedCards.length === selectedReadingType.maxCards && (
    <button onClick={getReading} className={styles.readingButton}>
        Reveal Your Reading
    </button>
)}

{currentStep === 5 && (
    <div>
        <h2>Your Reading</h2>
        <p>{reading}</p>
        <button onClick={reset} className={styles.resetButton}>Start Over</button>
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
