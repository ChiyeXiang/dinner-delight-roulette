
import React from 'react';
import { DinnerOption } from '../types/dinner';
import { useDinner } from '../context/DinnerContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Trash, Edit } from 'lucide-react';
import TagDisplay from './TagDisplay';
import WeightSelector from './WeightSelector';

interface Props {
  option: DinnerOption;
  index: number;
  isDragging?: boolean;
  onEdit: () => void;
  dragHandleProps?: any;
}

const DishCard: React.FC<Props> = ({ option, index, isDragging, onEdit, dragHandleProps }) => {
  const { deleteOption, updateOption } = useDinner();

  const handleDelete = () => {
    deleteOption(option.id);
  };

  const handleWeightChange = (weight: number) => {
    updateOption(option.id, { weight });
  };

  return (
    <Card 
      className={`mb-4 transition-all ${isDragging ? 'dragging' : ''} card-shadow`}
      {...dragHandleProps}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">{option.name}</h3>
            <div className="mb-2">
              <TagDisplay tagIds={option.tags} />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8" 
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 text-destructive"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2">
          <WeightSelector value={option.weight} onChange={handleWeightChange} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DishCard;
