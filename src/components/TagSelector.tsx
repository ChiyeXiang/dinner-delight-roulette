
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
            transition={{ delay: index * 0.05 }}
          >
            <button
              type="button"
              onClick={() => onToggleTag(tag.id)}
              className={cn(
                `food-tag cursor-pointer`,
                isSelected 
                  ? `bg-${tag.color} text-white` 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              )}
            >
              <span className="mr-1">{tag.emoji}</span>
              {tag.name}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TagSelector;
