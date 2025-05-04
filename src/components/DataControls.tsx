
import React, { useRef } from 'react';
import { Button } from './ui/button';
import { useDinner } from '../context/DinnerContext';
import { Download, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DataControls: React.FC = () => {
  const { exportOptions, importOptions } = useDinner();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        importOptions(content);
      } catch (error) {
        console.error('Error reading file:', error);
        toast({
          title: "Import Failed",
          description: "Could not read the selected file.",
          variant: "destructive"
        });
      }
    };
    reader.onerror = () => {
      toast({
        title: "Import Failed",
        description: "Error reading the file.",
        variant: "destructive"
      });
    };
    reader.readAsText(file);

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button 
        variant="outline" 
        onClick={exportOptions}
        className="flex-1"
      >
        <Download className="mr-2 h-4 w-4" />
        Export Options
      </Button>
      
      <Button 
        variant="outline" 
        onClick={handleImportClick}
        className="flex-1"
      >
        <Upload className="mr-2 h-4 w-4" />
        Import Options
      </Button>
      
      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
    </div>
  );
};

export default DataControls;
