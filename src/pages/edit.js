import React, { useState } from 'react';
import {
    CareerReadingSelection, ReadingTypeSelection, LoveReadingSelection,
    CardSelection, ShuffleAndCut, ReadingDisplay, ThreeCardReadingSelection, CategorySelection
} from '../components/homeComponents';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Home() {
    const [deck, setDeck] = useState(tarotDeck);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedReadingType, setSelectedReadingType] = useState('');
    const [selectedLoveSpread, setSelectedLoveSpread] = useState(null);
    const [selectedCareerSpread, setSelectedCareerSpread] = useState(null);
    const [selectedThreeCardSpread, setSelectedThreeCardSpread] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCards, setSelectedCards] = useState([]);
    const [reading, setReading] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [isShuffling, setIsShuffling] = useState(false);

    const goBack = () => {
        switch (currentStep) {
            case 3:
                if (selectedReadingType.type === 'Three Card Spread') {
                    setCurrentStep(2); // Go back to category selection from spread selection
                } else {
                    setCurrentStep(1); // Go back to reading type selection from specific spread selection
                }
                break;
            case 2:
                setCurrentStep(1); // Go back to reading type selection from category selection
                break;
            case 4:
                if (selectedReadingType.type === 'Three Card Spread' || selectedReadingType.type === 'Love Spread' || selectedReadingType.type === 'Career Spread') {
                    setCurrentStep(3); // Go back to spread selection from shuffling
                } else {
                    setCurrentStep(2); // Go back to category selection for other types
                }
                break;
            case 5:
                setCurrentStep(4); // Go back to card selection from the reading display
                break;
            case 6:
                setCurrentStep(5); // Go back to reading display from any end step
                break;
            default:
                setCurrentStep(1); // Default back step if unsure
        }
    };

    // Other functions remain the same...

    return (
        <div className={styles.container}>
            <Head>
                <title>Tarot AI - Discover Your Future</title>
                <meta name="description" content="Discover your future with Tarot AI" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Tarot AI - Discover Your Future</h1>
                {currentStep > 1 && (
                    <button onClick={goBack} className={styles.backButton}>Go Back</button>
                )}
                {currentStep === 1 && <ReadingTypeSelection onTypeSelect={selectReadingType} />}
                {currentStep === 2 && selectedReadingType.type === 'Three Card Spread' && <CategorySelection onSelectCategory={selectCategory} />}
                {currentStep === 3 && selectedCategory && <ThreeCardReadingSelection category={selectedCategory} onSelectSpread={selectThreeCardSpread} />}
                {currentStep === 3 && selectedReadingType.type === 'Love Spread' && <LoveReadingSelection onSelectLoveSpread={selectLoveSpread} />}
                {currentStep === 3 && selectedReadingType.type === 'Career Spread' && <CareerReadingSelection onSelectCareerSpread={selectCareerSpread} />}
                {currentStep === 4 && <ShuffleAndCut isShuffling={isShuffling} startShuffling={startShuffling} stopShuffling={stopShuffling} displayCutUI={displayCutUI} />}
                {currentStep === 5 && <CardSelection deck={deck} maxCards={selectedThreeCardSpread ? selectedThreeCardSpread.maxCards : selectedReadingType.maxCards} onCardSelect={selectCard} />}
                {currentStep === 6 && <ReadingDisplay reading={reading} onReset={reset} />}
            </main>
        </div>
    );
}
