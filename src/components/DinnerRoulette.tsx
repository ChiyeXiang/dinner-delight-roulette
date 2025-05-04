
import React, { useState, useEffect, useRef } from 'react';
import { useDinner } from '../context/DinnerContext';
import { DinnerOption, RouletteState } from '../types/dinner';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { RefreshCw } from 'lucide-react';
import TagDisplay from './TagDisplay';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const DinnerRoulette: React.FC = () => {
  const { options } = useDinner();
  const [rouletteState, setRouletteState] = useState<RouletteState>({
    spinning: false,
    selectedOption: null,
    showResult: false,
  });
  
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Function to select a random dish based on weight
  const selectRandomDish = (): DinnerOption | null => {
    if (options.length === 0) return null;

    // Calculate total weight
    const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
    
    // Get a random number between 0 and totalWeight
    let random = Math.random() * totalWeight;
    
    // Find the selected option based on weight
    for (const option of options) {
      random -= option.weight;
      if (random <= 0) {
        return option;
      }
    }
    
    // Fallback to first option (shouldn't happen if weights are positive)
    return options[0];
  };

  const handleSpin = () => {
    if (options.length === 0) return;
    
    setRouletteState({
      spinning: true,
      selectedOption: null,
      showResult: false,
    });
    
    // After 3 seconds (matching animation duration), show the result
    setTimeout(() => {
      const selected = selectRandomDish();
      setRouletteState({
        spinning: false,
        selectedOption: selected,
        showResult: true,
      });
      
      // Trigger confetti effect
      if (buttonRef.current && selected) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const x = buttonRect.left + buttonRect.width / 2;
        const y = buttonRect.top + buttonRect.height / 2;
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { 
            x: x / window.innerWidth, 
            y: y / window.innerHeight 
          }
        });
      }
    }, 3000);
  };

  const renderRouletteButton = () => (
    <Button
      ref={buttonRef}
      disabled={options.length === 0 || rouletteState.spinning}
      onClick={handleSpin}
      className="text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      size="lg"
    >
      {rouletteState.spinning ? (
        <>
          <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
          Spinning...
        </>
      ) : (
        "What should I eat tonight?"
      )}
    </Button>
  );

  const renderResult = () => {
    if (!rouletteState.selectedOption) return null;
    
    const option = rouletteState.selectedOption;
    
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.4 }}
      >
        <Card className="mt-6 overflow-hidden card-shadow">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">{option.name}</h2>
            <TagDisplay tagIds={option.tags} showEmpty className="mb-6" />
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
              <Button onClick={handleSpin} className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Spin Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <motion.div
        className={`mb-8 ${rouletteState.spinning ? 'animate-spin-roulette' : ''}`}
        whileTap={{ scale: 0.95 }}
      >
        {renderRouletteButton()}
      </motion.div>
      
      {rouletteState.showResult && renderResult()}
    </div>
  );
};

export default DinnerRoulette;
