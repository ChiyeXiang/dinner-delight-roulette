
import React from 'react';
import { AVAILABLE_TAGS } from '../context/DinnerContext';
import { cn } from '@/lib/utils';
import { motion } from "framer-motion";

interface Props {
  selectedTags: string[];
  onToggleTag: (tagId: string) => void;
  className?: string;
}

const TagSelector: React.FC<Props> = ({ selectedTags, onToggleTag, className }) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {AVAILABLE_TAGS.map((tag, index) => {
        const isSelected = selectedTags.includes(tag.id);
        
        return (
          <motion.div 
            key={tag.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.05,
              type: "spring", 
              stiffness: 300,
              damping: 15
            }}
          >
            <motion.button
              type="button"
              onClick={() => onToggleTag(tag.id)}
              className={cn(
                `food-tag cursor-pointer shadow-sm transition-all`,
                isSelected 
                  ? `bg-gradient-to-r from-${tag.color} to-${tag.color}/80 text-white` 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2 text-lg">{tag.emoji}</span>
              {tag.name}
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TagSelector;
