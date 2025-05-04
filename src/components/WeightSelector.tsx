
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  className?: string;
}

const WeightSelector: React.FC<Props> = ({ 
  value, 
  onChange, 
  max = 5,
  className
}) => {
  // Generate array of numbers from 1 to max
  const weights = Array.from({ length: max }, (_, i) => i + 1);
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="mr-2 text-sm font-medium">Priority:</div>
      <div className="flex space-x-1">
        {weights.map(weight => (
          <motion.button
            key={weight}
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(weight)}
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
              weight <= value
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400"
            )}
          >
            {weight}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default WeightSelector;
