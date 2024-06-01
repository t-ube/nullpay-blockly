"use client"

import { ReactNode, useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { styled } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const TransparentPaper = styled(Paper)(({ theme }) => ({
  opacity: 1.0,
  '& th, & td': {
    borderBottom: '1px solid #010',
  },
  '& tr': {
    borderBottom: '1px solid #010',
  },
}));

interface Props {
  page: string;
  onTabChange: (newValue: string) => void;
  children?: ReactNode;
}

export function MainTabs ({page, onTabChange, children} : Props) {
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
      aria-label="secondary tabs example"
    >
      <Tab sx={{ fontWeight: 'bold' }} value="log" label="Log"/>
      <Tab sx={{ fontWeight: 'bold' }} value="code" label="Code"/>
    </Tabs>
    {children}
  </TransparentPaper>
  );
}
