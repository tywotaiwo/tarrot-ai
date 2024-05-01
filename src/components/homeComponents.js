import styles from '../styles/Home.module.css';


export function ReadingTypeSelection({ onTypeSelect }) {
  const readingTypes = [
    { type: 'Three-Card Spread', maxCards: 3 },
    { type: 'Celtic Cross Spread', maxCards: 10 },
    { type: 'One-Card Daily', maxCards: 1 },
    { type: 'Love Spread', maxCards: 6 },
    { type: 'Career Spread', maxCards: 6 }
  ];

  return (
    <div className={styles.buttonContainer}>
      {readingTypes.map((type) => (
        <button key={type.type} className={styles.readingTypeButton} onClick={() => onTypeSelect(type)}>
          {type.type}
        </button>
      ))}
    </div>
  );
}

export function LoveReadingSelection({ onSelectLoveSpread }) {
    const loveSpreads = [
      { name: 'Check-In Spread', description: 'Reflects on your current relationship dynamics through an 8-card layout forming an upside-down pyramid.', maxCards: 8 },
      { name: 'Compatibility Spread', description: 'Explores how well you and your partner gel using a 7-card layout with two rows and a summary card.', maxCards: 7 },
      { name: 'Temple of Aphrodite Spread', description: 'Consults the goddess of love for insight into your relationship with a 7-card layout forming a capital "H".', maxCards: 7 },
      { name: 'Big Picture Spread', description: 'Provides a straightforward overview of your love story through a 3-card straight line layout.', maxCards: 3 },
      { name: 'Relationship Repair Spread', description: 'Aids in healing and improving your relationship dynamics with a 7-card layout split into three rows.', maxCards: 7 },
      { name: 'Twin Flame Spread', description: 'Helps understand the intense dynamics of a twin flame relationship through a 5-card layout symbolizing flames.', maxCards: 5 },
      { name: 'Love Triangle Spread', description: 'Determines the presence of a third party or distraction in your relationship using a 3-card straight line layout.', maxCards: 3 },
      { name: 'Is My Lover Coming Back? Spread', description: 'Assesses the possibility of rekindling a past relationship with a 4-card square layout.', maxCards: 4 },
      { name: 'Magnetic to Love Spread', description: 'Focuses on attracting new love by cleansing your aura and increasing your magnetism with a 7-card U-shaped layout.', maxCards: 7 },
      { name: 'Secret Crush Spread', description: 'Reveals details about a secret admirer through a 6-card cross layout.', maxCards: 6 },
      { name: 'My Future Love Spread', description: 'Offers insights into meeting your future significant other with a 10-card heart-shaped layout.', maxCards: 10 },
      { name: 'Manifest a Soulmate Spread', description: 'Aims to attract a soulmate into your life using a 5-card layout shaped like the capital letter "M".', maxCards: 5 },
      { name: 'Honor Yourself Spread', description: 'Encourages self-recognition and self-love through a 6-card layout forming the letter "C".', maxCards: 6 },
      { name: 'Love Yourself First Spread', description: 'Highlights personal strengths and self-care needs with a 5-card layout forming the letter "X".', maxCards: 5 },
      { name: 'Self-Care Spread', description: 'Guides on how to pamper and care for yourself with a 5-card layout split into two rows.', maxCards: 5 },
      { name: 'Tell Me I\'m Delicious Spread', description: 'Celebrates your unique traits and what makes you lovable through a 6-card layout split into two rows.', maxCards: 6 }
    ];
  
    return (
      <div className={styles.spreadSelectionContainer}>
        <p>These spreads are designed to address various aspects of love—whether it's reflecting on an existing relationship, healing from past issues, seeking new love, or fostering self-love. Each spread uses a specific card arrangement to enhance the focus and intention of the reading.</p>
        {loveSpreads.map((spread) => (
          <div key={spread.name} className={styles.spreadOption}>
            <h3>{spread.name}</h3>
            <p>{spread.description}</p>
            <button className={styles.selectSpreadButton} onClick={() => onSelectLoveSpread(spread)}>
              Select This Spread
            </button>
          </div>
        ))}
      </div>
    );
  }
  export function CareerReadingSelection({ onSelectCareerSpread }) {
    const careerSpreads = [
      { name: 'Career Path Spread', description: 'Guides you in understanding your career trajectory through a 5-card layout.', maxCards: 5 },
      { name: 'Job Interview Spread', description: 'Prepares you for an upcoming job interview with a 4-card layout focusing on preparation and outcome.', maxCards: 4 },
      { name: 'Career Decision Spread', description: 'Assists you in making a career-related decision with a 6-card layout exploring options and outcomes.', maxCards: 6 },
      { name: 'Success at Work Spread', description: 'Helps you enhance your success at work with a 5-card layout examining strengths and areas for improvement.', maxCards: 5 },
      { name: 'Professional Growth Spread', description: 'Aids in your professional development through a 7-card layout identifying opportunities and challenges.', maxCards: 7 },
      { name: 'Work-Life Balance Spread', description: 'Promotes balance between work and personal life with a 6-card layout addressing priorities and harmony.', maxCards: 6 },
      { name: 'Financial Outlook Spread', description: 'Offers insights into your financial situation and future prospects with a 5-card layout focused on money matters.', maxCards: 5 },
      { name: 'Career Change Spread', description: 'Facilitates decision-making regarding a career change using a 6-card layout evaluating motivations and risks.', maxCards: 6 },
      { name: 'Side Hustle Spread', description: 'Explores the potential of your side hustle or passion project with a 4-card layout assessing opportunities and challenges.', maxCards: 4 },
      { name: 'Freelancer\'s Forecast Spread', description: 'Forecasts your freelancing career with a 5-card layout predicting opportunities and potential obstacles.', maxCards: 5 },
      { name: 'Leadership Development Spread', description: 'Supports your growth as a leader with a 6-card layout focusing on leadership qualities and strategies.', maxCards: 6 },
      { name: 'Overcoming Career Obstacles Spread', description: 'Assists you in overcoming obstacles in your career path with a 4-card layout identifying challenges and solutions.', maxCards: 4 },
    ];
  
    return (
      <div className={styles.spreadSelectionContainer}>
        <p>These spreads are designed to provide insight and guidance on various aspects of your career—whether it's planning your career path, preparing for job interviews, making career decisions, or achieving success at work. Each spread uses a specific card arrangement to address different facets of your career journey.</p>
        {careerSpreads.map((spread) => (
          <div key={spread.name} className={styles.spreadOption}>
            <h3>{spread.name}</h3>
            <p>{spread.description}</p>
            <button className={styles.selectSpreadButton} onClick={() => onSelectCareerSpread(spread)}>
              Select This Spread
            </button>
          </div>
        ))}
      </div>
    );
  }

  export function ThreeCardReadingSelection({ onSelectThreeCardSpread }) {
    const threeCardSpreads = [
        { name: 'Linear 3 Card Tarot Spreads', description: 'These spreads suggest a sequence or a linear path, which can be great for understanding progression or cause and effect. Choose from various layouts such as Past, Present, Future; You, Your Path, Your Potential; You, Relationship, Partner; Situation, Action, Outcome; and Idea, Process, Aspiration.', maxCards: 3 },
        { name: 'Balanced 3 Card Tarot Spreads', description: 'You, Your Path, Your Potential. Focuses on personal development and future possibilities.', maxCards: 3 },
      { name: 'Foundational 3 Card Tarot Spreads', description: 'Analyzes the dynamics within a relationship from personal to relational context.', maxCards: 3 },
      { name: 'Crossed 3 Card Tarot Spreads', description: 'Looks at a specific situation, the action taken, and the potential results.', maxCards: 3 },
    ];
  
    return (
      <div className={styles.spreadSelectionContainer}>
        <p>These spreads suggest a sequence or a linear path, which can be great for understanding progression or cause and effect.</p>
        {threeCardSpreads.map((spread) => (
          <div key={spread.name} className={styles.spreadOption}>
            <h3>{spread.name}</h3>
            <p>{spread.description}</p>
            <button className={styles.selectSpreadButton} onClick={() => onSelectThreeCardSpread(spread)}>
              Select This Spread
            </button>
          </div>
        ))}
      </div>
    );
  }
  
export function ShuffleAndCutr({ isShuffling, startShuffling, stopShuffling, displayCutUI }) {
    return (
      <>
        {!isShuffling && (
          <div className={styles.cardStackContainer}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className={styles.stackedCard} style={{ transform: `translateX(${idx * -10}px)` }}>
                <img src="/cards/card-back.webp" alt="Card Back" className={styles.stackedCardImage} />
              </div>
            ))}
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
    );
  }
  export function ShuffleAndCut({ isShuffling, startShuffling, stopShuffling, displayCutUI }) {
    return (
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
    );
  }
  

export function CardSelection({ deck, maxCards, onCardSelect }) {
  return (
    <div>
      {deck.slice(0, maxCards).map((card, index) => (
        <div key={index} onClick={() => onCardSelect(card)} className={styles.card}>
          <img src={card.image} alt={card.name} className={styles.cardImage} />
        </div>
      ))}
    </div>
  );
}

export function ReadingDisplay({ reading, onReset }) {
  return (
    <div className={styles.reading}>
      <h2>Your Reading</h2>
      <p>{reading}</p>
      <button onClick={onReset} className={styles.resetButton}>Start Over</button>
    </div>
  );
}
