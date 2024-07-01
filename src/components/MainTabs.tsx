"use client"

import { ReactNode, useState, useEffect, useRef } from "react";
import { styled } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';

const TransparentPaper = styled(Paper)(({ theme }) => ({
  opacity: 1.0,
  '& th, & td': {
    borderBottom: '1px solid #010',
  },
  '& tr': {
    borderBottom: '1px solid #010',
  },
}));

interface ITabProps {
  page: string;
  onTabChange: (newValue: string) => void;
  children?: ReactNode;
}

export function MainTabs({ page, onTabChange, children }: ITabProps) {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  return (
    <TransparentPaper sx={{ width: '100%' }}>
      <Tabs
        value={page}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs template"
        sx={{ minHeight: '36px' }} // Adjust the height of the Tabs container
      >
        <Tab
          sx={{
            fontWeight: 'bold',
            fontSize: '0.875rem',
            minHeight: '36px', // Adjust the height of each Tab
            paddingTop: '6px',
            paddingBottom: '6px',
          }}
          value="log"
          label="Log"
        />
        <Tab
          sx={{
            fontWeight: 'bold',
            fontSize: '0.875rem',
            minHeight: '36px', // Adjust the height of each Tab
            paddingTop: '6px',
            paddingBottom: '6px',
          }}
          value="code"
          label="Code"
        />
      </Tabs>
      {children}
    </TransparentPaper>
  );
}
