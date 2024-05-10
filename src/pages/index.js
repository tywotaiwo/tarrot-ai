import React, { useState, useRef, useContext } from 'react';

import { CareerReadingSelection , ReadingTypeSelection, LoveReadingSelection, CardSelection, ReadingDisplay, CelticCrossReadingSelection, OneCardDailyReadingSelection, ThreeCardReadingSelection, CategorySelection, CutDeck } from '../components/homeComponents';
import { ShuffleCards } from '../components/ShuffleCards';
import CutCards from '../components/CutCards';
import DailyCardCut from '../components/DailyCardCut'
import ThreeCardCut from '../components/ThreeCardCut'
import SingleCardReveal from '../components/SingleCardReveal'
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { TarotContext } from '../contexts/TarotContext';
import Navbar from '../components/Navbar';
export default function Home() {
    const { deck, shuffleDeck } = useContext(TarotContext);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedReadingType, setSelectedReadingType] = useState('');
    const [selectedLoveSpread, setSelectedLoveSpread] = useState(null);
    const [selectedCareerSpread, setSelectedCareerSpread] = useState(null);
    const shuffleIntervalRef = useRef(null);
    const [selectedCelticSpread, setSelectedCelticSpread] = useState(null);
    const [selectedThreeCardSpread, setSelectedThreeCardSpread] = useState(null);
    const [selectedCards, setSelectedCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState([]);
    const [reading, setReading] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [isShuffling, setIsShuffling] = useState(false);

    const [selectedCategoryDescription, setSelectedCategoryDescription] = useState('');

    const [selectedCategory, setSelectedCategory] = useState('');

    
    
    const selectCard = (card) => {
        if (!selectedCards.includes(card) && selectedCards.length < selectedReadingType.maxCards) {
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
                if (selectedReadingType.type === 'Three Card Spread' || selectedReadingType.type === 'Love Spread' || selectedReadingType.type === 'One-Card Daily'  ||  selectedReadingType.type === 'Career Spread' || selectedReadingType.type === 'Celtic Cross Spread') {
                    shuffleDeck()
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
    
    const startShuffling = () => {
        setIsShuffling(true);
        shuffleDeck(); // Use context function to shuffle deck
    };

    const stopShuffling = () => {
        setIsShuffling(false);
        setCurrentStep(5);
    };
    
   
    const selectReadingType = (type) => {
        console.log("reading type", type)
        setSelectedReadingType(type);
        if (type.type === 'Three Card Spread') {
            setCurrentStep(2); // Step to select category of three-card spread
        } else if (['Love Spread', 'Career Spread', 'Celtic Cross Spread', 'One-Card Daily'].includes(type.type)) {
            setCurrentStep(3); // Go to selecting a specific spread
        } else {
            setCurrentStep(4); // Skip to shuffling/cutting
        }
    };
    
    const drawDailyCard = () => {
        // Logic to randomly select a card and display it
        console.log("Drawing daily card...");
        setCurrentStep(4); // Assuming step 5 displays the card
    };
    
    const selectCategory = (category) => {
        setSelectedCategory(category.name);
        setSelectedCategoryDescription(category.description); // Assuming you add a state to store this
        setCurrentStep(3); // Move to select specific spread from the category
    };
    
    const selectLoveSpread = (spread) => {
        setSelectedLoveSpread(spread);
        setCurrentStep(4); // Move to shuffling/cutting after selecting specific spread
    };

    const selectCareerSpread = (spread) => {
        setSelectedCareerSpread(spread);
        setCurrentStep(4); // Move to shuffling/cutting after selecting specific spread
    };

    const selectCelticSpread = (spread) => {
        // Implement selection logic, possibly setting state or navigating to a spread view
        console.log("Selected Celtic Spread: ", spread);
        setSelectedCelticSpread(spread)
        setCurrentStep(4); // Move to card selection or display the spread
    };
    const selectThreeCardSpread = (spread) => {
        setSelectedThreeCardSpread(spread);
        setCurrentStep(4); // Move to shuffling/cutting after selecting specific spread
    };
    const handleDailyCutComplete = (card) => {
        setSelectedCard(card)
        setCurrentStep(6)
        console.log("selected card is ", selectedCard)
    }

    return (
        <div className={styles.container}>
            <Head>
                
                <title>Tarot AI - Discover Your Future</title>
               
                <meta name="description" content="Discover your future with Tarot AI" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                
            {currentStep >= 1 &&currentStep <4 && (
                
                <h1 className={styles.title}>Tarot AI - Discover Your Future</h1>
            )
                }

                {currentStep > 1  && (
                    <button onClick={goBack} className={styles.backButton}>Go Back</button>
                )}
                {currentStep === 1 && <ReadingTypeSelection onTypeSelect={selectReadingType} />}
                {currentStep === 2 && selectedReadingType.type === 'Three Card Spread' && <CategorySelection onSelectCategory={selectCategory} />}
                {currentStep === 3 && selectedReadingType.type === 'One-Card Daily' && (
                <OneCardDailyReadingSelection onSelectDailyCard={drawDailyCard} />
            )}
                {currentStep === 3 && selectedReadingType.type === 'Love Spread' && <LoveReadingSelection onSelectLoveSpread={selectLoveSpread} />}

                {currentStep === 3 && selectedReadingType.type === 'Three Card Spread' && selectedCategory && (
                <ThreeCardReadingSelection category={selectedCategory} description={selectedCategoryDescription} onSelectSpread={selectThreeCardSpread} />
                )}
                {currentStep === 3 && selectedReadingType.type === 'Career Spread' && <CareerReadingSelection onSelectCareerSpread={selectCareerSpread} />}


                {currentStep === 3 && selectedReadingType.type === 'Celtic Cross Spread' && (
                <CelticCrossReadingSelection onSelectCelticSpread={selectCelticSpread} />
            )}

              
                {currentStep === 4 && <ShuffleCards isShuffling={isShuffling} startShuffling={startShuffling} stopShuffling={stopShuffling} deck={deck} />}
                
{currentStep === 5  && selectedReadingType.type === 'One-Card Daily'  && (
    <DailyCardCut deck={deck} onCutComplete={handleDailyCutComplete} />
)}
         {currentStep === 5 && selectedReadingType.type === 'Three Card Spread' && (
  <ThreeCardCut deck={deck} onCutsComplete={(selectedCards) => {
    setSelectedCards(selectedCards);
   
  }} />
)}
{currentStep === 6 && selectedReadingType.type === 'One-Card Daily' && (
    <SingleCardReveal card={selectedCard}  onReset={reset} />
)}

       


                {currentStep === 8 && selectedReadingType.type === 'Three Card Spread' && <CardSelection deck={deck} maxCards={selectedThreeCardSpread ? selectedThreeCardSpread.maxCards : selectedReadingType.maxCards} onCardSelect={selectCard} />}


                {currentStep === 8 && <ReadingDisplay reading={reading} onReset={reset} />}
            </main>
        </div>
    );
}
