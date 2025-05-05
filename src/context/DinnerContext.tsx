
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DinnerOption, TagType } from '../types/dinner';
import { toast } from '@/hooks/use-toast';

// Predefined tags
export const AVAILABLE_TAGS: TagType[] = [
  { id: 'spicy', emoji: '🌶️', name: 'Spicy', color: 'food-spicy' },
  { id: 'healthy', emoji: '🥗', name: 'Healthy', color: 'food-healthy' },
  { id: 'budget', emoji: '💰', name: 'Budget', color: 'food-budget' },
  { id: 'fancy', emoji: '✨', name: 'Fancy', color: 'food-fancy' },
  { id: 'quick', emoji: '⏱️', name: 'Quick', color: 'food-quick' },
  { id: 'homemade', emoji: '🏠', name: 'Homemade', color: 'food-homemade' },
];

// Default dinner options
const DEFAULT_OPTIONS: DinnerOption[] = [
  { id: '1', name: 'Pizza', tags: ['quick'], weight: 3, lastChosen: null },
  { id: '2', name: 'Pasta', tags: ['budget', 'homemade'], weight: 4, lastChosen: null },
  { id: '3', name: 'Salad', tags: ['healthy', 'quick'], weight: 2, lastChosen: null },
  { id: '4', name: 'Sushi', tags: ['fancy'], weight: 5, lastChosen: null },
  { id: '5', name: 'Tacos', tags: ['spicy', 'budget'], weight: 4, lastChosen: null },
  { id: '6', name: 'Steak', tags: ['homemade'], weight: 3, lastChosen: null }
];

// Context type definition
interface DinnerContextType {
  options: DinnerOption[];
  setOptions: React.Dispatch<React.SetStateAction<DinnerOption[]>>;
  addOption: (option: Omit<DinnerOption, 'id'>) => void;
  updateOption: (id: string, option: Partial<DinnerOption>) => void;
  deleteOption: (id: string) => void;
  reorderOptions: (startIndex: number, endIndex: number) => void;
  getTagById: (id: string) => TagType | undefined;
  exportOptions: () => void;
  importOptions: (jsonString: string) => void;
}

const DinnerContext = createContext<DinnerContextType>({} as DinnerContextType);

export const useDinner = () => useContext(DinnerContext);

export const DinnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [options, setOptions] = useState<DinnerOption[]>([]);

  // Initialize options from localStorage on first load
  useEffect(() => {
    const savedOptions = localStorage.getItem('dinnerOptions');
    if (savedOptions) {
      try {
        setOptions(JSON.parse(savedOptions));
      } catch (e) {
        console.error('Failed to parse saved options', e);
        setOptions(DEFAULT_OPTIONS);
      }
    } else {
      setOptions(DEFAULT_OPTIONS);
    }
  }, []);

  // Save options to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dinnerOptions', JSON.stringify(options));
  }, [options]);

  // Add a new dinner option
  const addOption = (option: Omit<DinnerOption, 'id'>) => {
    const newOption: DinnerOption = {
      ...option,
      id: Date.now().toString(),
    };
    setOptions((prev) => [...prev, newOption]);
    toast({
      title: "Added new dinner option",
      description: `${option.name} has been added to your list.`
    });
  };

  // Update an existing dinner option
  const updateOption = (id: string, updatedFields: Partial<DinnerOption>) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, ...updatedFields } : option
      )
    );
  };

  // Delete a dinner option
  const deleteOption = (id: string) => {
    setOptions((prev) => {
      const optionToDelete = prev.find(option => option.id === id);
      if (optionToDelete) {
        toast({
          title: "Deleted dinner option",
          description: `${optionToDelete.name} has been removed.`
        });
      }
      return prev.filter((option) => option.id !== id);
    });
  };

  // Reorder options (for drag and drop)
  const reorderOptions = (startIndex: number, endIndex: number) => {
    const result = Array.from(options);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setOptions(result);
  };

  // Get tag information by ID
  const getTagById = (id: string) => {
    return AVAILABLE_TAGS.find((tag) => tag.id === id);
  };

  // Export options to JSON
  const exportOptions = () => {
    const dataStr = JSON.stringify(options, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `dinner-options-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Options exported",
      description: "Your dinner options have been exported to a JSON file."
    });
  };

  // Import options from JSON
  const importOptions = (jsonString: string) => {
    try {
      const importedOptions = JSON.parse(jsonString);
      
      if (!Array.isArray(importedOptions)) {
        throw new Error('Imported data is not an array');
      }
      
      // Validate imported options (basic validation)
      const validOptions = importedOptions.filter((option: any) => 
        option.id && 
        typeof option.name === 'string' && 
        Array.isArray(option.tags) && 
        typeof option.weight === 'number'
      );
      
      if (validOptions.length === 0) {
        throw new Error('No valid dinner options found in imported data');
      }
      
      setOptions(validOptions);
      toast({
        title: "Options imported",
        description: `${validOptions.length} dinner options have been imported.`
      });
    } catch (error) {
      console.error('Error importing options:', error);
      toast({
        title: "Import failed",
        description: "There was a problem importing your dinner options.",
        variant: "destructive"
      });
    }
  };

  const value = {
    options,
    setOptions,
    addOption,
    updateOption,
    deleteOption,
    reorderOptions,
    getTagById,
    exportOptions,
    importOptions
  };

  return (
    <DinnerContext.Provider value={value}>
      {children}
    </DinnerContext.Provider>
  );
};
