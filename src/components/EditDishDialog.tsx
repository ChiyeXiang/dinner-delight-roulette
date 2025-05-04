
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useDinner } from '../context/DinnerContext';
import { DinnerOption } from '../types/dinner';
import TagSelector from './TagSelector';
import WeightSelector from './WeightSelector';
import { toast } from '@/hooks/use-toast';

interface Props {
  optionId: string | null;
  open: boolean;
  onClose: () => void;
}

const EditDishDialog: React.FC<Props> = ({ optionId, open, onClose }) => {
  const { options, updateOption } = useDinner();
  const [form, setForm] = useState<{
    name: string;
    tags: string[];
    weight: number;
  }>({
    name: '',
    tags: [],
    weight: 3,
  });

  useEffect(() => {
    if (optionId) {
      const option = options.find(o => o.id === optionId);
      if (option) {
        setForm({
          name: option.name,
          tags: option.tags,
          weight: option.weight,
        });
      }
    } else {
      // Reset form when creating a new dish
      setForm({
        name: '',
        tags: [],
        weight: 3,
      });
    }
  }, [optionId, options]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast({
        title: "Error",
        description: "Dish name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    if (optionId) {
      updateOption(optionId, {
        name: form.name,
        tags: form.tags,
        weight: form.weight,
      });
      toast({
        title: "Dish updated",
        description: `${form.name} has been updated.`
      });
    }
    
    onClose();
  };

  const handleTagToggle = (tagId: string) => {
    setForm(prev => {
      const hasTag = prev.tags.includes(tagId);
      const newTags = hasTag
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId];
      return { ...prev, tags: newTags };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Dish</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Dish Name
            </label>
            <Input
              id="name"
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter dish name"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <TagSelector 
              selectedTags={form.tags} 
              onToggleTag={handleTagToggle} 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Weight (Priority)</label>
            <WeightSelector 
              value={form.weight} 
              onChange={(weight) => setForm(prev => ({ ...prev, weight }))} 
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDishDialog;
