
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

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
        {weights.map(weight => {
          const isActive = weight <= value;
          
          return (
            <motion.button
              key={weight}
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
              transition={{ 
                duration: 0.3,
                type: isActive ? "spring" : "tween", 
                stiffness: 300 
              }}
              onClick={() => onChange(weight)}
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center transition-all",
                isActive
                  ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400"
              )}
            >
              <Star className={cn(
                "h-5 w-5",
                isActive ? "fill-current" : "fill-none"
              )} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default WeightSelector;
