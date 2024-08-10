"use client"

import React, { createContext, useContext, useState, useCallback } from 'react';
import { IGuideStep } from '@/data/guideData';

interface GuideBarContextType {
  openCategories: { [key: number]: boolean };
  setOpenCategories: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  lastOpenedStep: IGuideStep | null;
  setLastOpenedStep: React.Dispatch<React.SetStateAction<IGuideStep | null>>;
}

const GuideBarContext = createContext<GuideBarContextType | undefined>(undefined);

export const useGuideBar = () => {
  const context = useContext(GuideBarContext);
  if (context === undefined) {
    throw new Error('useGuideBar must be used within a GuideBarProvider');
  }
  return context;
};

export const GuideBarProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({});
  const [lastOpenedStep, setLastOpenedStep] = useState<IGuideStep | null>(null);

  const value = {
    openCategories,
    setOpenCategories,
    lastOpenedStep,
    setLastOpenedStep,
  };

  return (
    <GuideBarContext.Provider value={value}>
      {children}
    </GuideBarContext.Provider>
  );
};