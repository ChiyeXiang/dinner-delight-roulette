
import React from 'react';
import { useDinner } from '../context/DinnerContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Props {
  tagIds: string[];
  showEmpty?: boolean;
  className?: string;
}

const TagDisplay: React.FC<Props> = ({ tagIds, showEmpty = false, className }) => {
  const { getTagById } = useDinner();

  if (tagIds.length === 0 && !showEmpty) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tagIds.length === 0 && showEmpty ? (
        <span className="text-sm text-muted-foreground italic">No tags</span>
      ) : (
        tagIds.map((id, index) => {
          const tag = getTagById(id);
          if (!tag) return null;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 200
              }}
              className={cn(
                "food-tag shadow-sm",
                `bg-gradient-to-r from-${tag.color} to-${tag.color}/80 text-white`
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-1 text-lg">{tag.emoji}</span>
              {tag.name}
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default TagDisplay;
