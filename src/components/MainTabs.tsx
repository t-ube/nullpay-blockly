"use client"

import { ReactNode, useState, useEffect, useRef } from "react";
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
  overflow: 'auto', // Enable scrolling when needed
}));

const CenteredTabs = styled(Tabs)({
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
  },
});

interface ITabProps {
  page: string;
  onTabChange: (newValue: string) => void;
  children?: ReactNode;
}

export function MainTabs({ page, onTabChange, children }: ITabProps) {
  const [tabsWidth, setTabsWidth] = useState('100%');
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  useEffect(() => {
    const updateTabsWidth = () => {
      if (tabsRef.current) {
        const containerWidth = tabsRef.current.offsetWidth;
        const tabsContent = tabsRef.current.querySelector('.MuiTabs-flexContainer');
        if (tabsContent) {
          const contentWidth = tabsContent.scrollWidth;
          setTabsWidth(contentWidth > containerWidth ? `${contentWidth}px` : '100%');
        }
      }
    };

    updateTabsWidth();
    window.addEventListener('resize', updateTabsWidth);

    return () => {
      window.removeEventListener('resize', updateTabsWidth);
    };
  }, []);

  return (
    <TransparentPaper sx={{ width: '100%' }}>
      <Box ref={tabsRef} sx={{ overflow: 'auto', width: '100%' }}>
        <CenteredTabs
          value={page}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs template"
          sx={{ 
            minHeight: '36px',
            width: tabsWidth,
          }}
        >
          <Tab
            sx={{
              fontWeight: 'bold',
              fontSize: '0.875rem',
              minHeight: '36px',
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
              minHeight: '36px',
              paddingTop: '6px',
              paddingBottom: '6px',
            }}
            value="code"
            label="Code"
          />
          <Tab
            sx={{
              fontWeight: 'bold',
              fontSize: '0.875rem',
              minHeight: '36px',
              paddingTop: '6px',
              paddingBottom: '6px',
            }}
            value="struct"
            label="Struct"
          />
        </CenteredTabs>
      </Box>
      {children}
    </TransparentPaper>
  );
}