
import React from 'react';
import { useDinner } from '../context/DinnerContext';
import { cn } from '@/lib/utils';

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
        <span className="text-sm text-muted-foreground">No tags</span>
      ) : (
        tagIds.map((id) => {
          const tag = getTagById(id);
          if (!tag) return null;

          return (
            <div
              key={id}
              className={`food-tag bg-${tag.color} text-white`}
            >
              <span className="mr-1">{tag.emoji}</span>
              {tag.name}
            </div>
          );
        })
      )}
    </div>
  );
};

export default TagDisplay;
