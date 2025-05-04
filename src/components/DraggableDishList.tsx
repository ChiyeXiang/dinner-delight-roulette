
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useDinner } from '../context/DinnerContext';
import DishCard from './DishCard';
import EditDishDialog from './EditDishDialog';

const DraggableDishList: React.FC = () => {
  const { options, reorderOptions } = useDinner();
  const [editingOption, setEditingOption] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    reorderOptions(result.source.index, result.destination.index);
  };

  const startEditing = (id: string) => {
    setEditingOption(id);
  };

  const closeEditDialog = () => {
    setEditingOption(null);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dishes">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="mt-4 space-y-2"
            >
              {options.map((option, index) => (
                <Draggable key={option.id} draggableId={option.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="animate-slide-in"
                      style={{ 
                        ...provided.draggableProps.style,
                        animationDelay: `${index * 0.05}s`
                      }}
                    >
                      <DishCard
                        option={option}
                        index={index}
                        isDragging={snapshot.isDragging}
                        onEdit={() => startEditing(option.id)}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <EditDishDialog
        optionId={editingOption}
        open={editingOption !== null}
        onClose={closeEditDialog}
      />
    </>
  );
};

export default DraggableDishList;
