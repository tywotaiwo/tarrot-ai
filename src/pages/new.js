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
