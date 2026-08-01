'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type ExerciseType = 'menulis' | 'sambung-cocok';

interface AutoHintContextType {
  hasBeenShown: Record<ExerciseType, boolean>;
  setHasBeenShown: (type: ExerciseType, value: boolean) => void;
}

const AutoHintContext = createContext<AutoHintContextType | undefined>(undefined);

export const AutoHintProvider = ({ children }: { children: ReactNode }) => {
  const [hasBeenShown, setHasBeenShownState] = useState<Record<ExerciseType, boolean>>({
    'menulis': false,
    'sambung-cocok': false,
  });

  const setHasBeenShown = (type: ExerciseType, value: boolean) => {
    setHasBeenShownState(prev => ({ ...prev, [type]: value }));
  };

  return (
    <AutoHintContext.Provider value={{ hasBeenShown, setHasBeenShown }}>
      {children}
    </AutoHintContext.Provider>
  );
};

export const useAutoHint = () => {
  const context = useContext(AutoHintContext);
  if (!context) {
    throw new Error('useAutoHint must be used within an AutoHintProvider');
  }
  return context;
};
