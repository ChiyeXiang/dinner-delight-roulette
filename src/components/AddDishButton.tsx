
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { useDinner } from '../context/DinnerContext';
import TagSelector from './TagSelector';
import WeightSelector from './WeightSelector';

const AddDishButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { addOption } = useDinner();
  const [name, setName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [weight, setWeight] = useState(3);

  const handleToggleTag = (tagId: string) => {
    setTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addOption({
        name: name.trim(),
        tags,
        weight,
      });
      setName('');
      setTags([]);
      setWeight(3);
      setOpen(false);
    }
  };

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New Dish
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Dish</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Dish Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter dish name"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <TagSelector 
                selectedTags={tags} 
                onToggleTag={handleToggleTag} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Weight (Priority)</label>
              <WeightSelector 
                value={weight} 
                onChange={setWeight} 
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Dish</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddDishButton;
