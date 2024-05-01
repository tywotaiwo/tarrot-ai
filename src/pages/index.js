import React, { useState, useRef, useEffect } from 'react';
import { CareerReadingSelection , ReadingTypeSelection, LoveReadingSelection, CardSelection, ShuffleAndCut, ReadingDisplay } from '../components/homeComponents';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Home() {
    const [deck, setDeck] = useState(tarotDeck);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedReadingType, setSelectedReadingType] = useState('');
    const [selectedLoveSpread, setSelectedLoveSpread] = useState(null);
    
    const [selectedCareerSpread, setSelectedCareerSpread] = useState(null);
    const [selectedCards, setSelectedCards] = useState([]);
    const [reading, setReading] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [isShuffling, setIsShuffling] = useState(false);
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

    

    const selectCardold = (card) => {
        if (selectedCards.length < selectedReadingType.maxCards && !selectedCards.includes(card)) {
            setSelectedCards([...selectedCards, card]);
        }
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
    const selectReadingType = (type) => {
        setSelectedReadingType(type);
        if (type.type === 'Love Spread' || type.type === 'Career Spread') {
            setCurrentStep(2); // Move to select specific spread
        } else {
            setCurrentStep(3); // For other types, skip to shuffling/cutting
        }
    };
    

    const selectLoveSpread = (spread) => {
        setSelectedLoveSpread(spread);
        setCurrentStep(3); // Move to shuffling/cutting after selecting specific spread
    };
    const selectCareerSpread = (spread) => {
        setSelectedCareerSpread(spread);
        setCurrentStep(3); // Move to shuffling/cutting after selecting specific spread
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
    {currentStep === 1 && <ReadingTypeSelection onTypeSelect={selectReadingType} />}
    {(currentStep === 2 && selectedReadingType.type === 'Love Spread') && <LoveReadingSelection onSelectLoveSpread={selectLoveSpread} />}
    {(currentStep === 2 && selectedReadingType.type === 'Career Spread') && <CareerReadingSelection onSelectCareerSpread={selectCareerSpread} />}
    {currentStep === 3 && <ShuffleAndCut {...{ isShuffling, startShuffling, stopShuffling, displayCutUI }} />}
    {currentStep === 4 && <CardSelection {...{ deck, maxCards: selectedLoveSpread ? selectedLoveSpread.maxCards : selectedReadingType.maxCards, onCardSelect: selectCard }} />}
    {currentStep === 5 && <ReadingDisplay reading={reading} onReset={reset} />}
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
