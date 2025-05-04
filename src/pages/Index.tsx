
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DraggableDishList from '@/components/DraggableDishList';
import AddDishButton from '@/components/AddDishButton';
import DinnerRoulette from '@/components/DinnerRoulette';
import DataControls from '@/components/DataControls';
import { DinnerProvider } from '@/context/DinnerContext';
import { motion } from 'framer-motion';

const Index = () => {
  const [activeTab, setActiveTab] = useState('roulette');

  return (
    <DinnerProvider>
      <div className="min-h-screen p-4 md:p-6">
        <header className="max-w-3xl mx-auto text-center mb-6">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🍽️ Dinner Roulette
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Spin the wheel to decide what's for dinner tonight!
          </motion.p>
        </header>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="roulette">Roulette</TabsTrigger>
              <TabsTrigger value="manage">Manage Options</TabsTrigger>
            </TabsList>
            
            <TabsContent value="roulette" className="space-y-4">
              <DinnerRoulette />
            </TabsContent>
            
            <TabsContent value="manage" className="space-y-4">
              <div className="flex justify-between flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <AddDishButton />
                </div>
                <div className="w-full sm:w-1/2">
                  <DataControls />
                </div>
              </div>
              <DraggableDishList />
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.footer 
          className="mt-12 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>Save your dinner options locally and never wonder "what to eat?" again.</p>
        </motion.footer>
      </div>
    </DinnerProvider>
  );
};

export default Index;
