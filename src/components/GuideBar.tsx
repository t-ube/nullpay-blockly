import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { guideData, IGuideStep } from '@/data/guideData';
import dynamic from 'next/dynamic';
import * as Blockly from 'blockly/core';

interface IGideBarProps {
  onBlockSelectedV2: (json: string, eventType: string, event: MouseEvent) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  mainWorkspace: Blockly.WorkspaceSvg;
}

const GuideBar = ({ onBlockSelectedV2, open, setOpen, mainWorkspace }: IGideBarProps) => {
  const [selectedStep, setSelectedStep] = useState<IGuideStep | null>(null);
  const [lastOpenedStep, setLastOpenedStep] = useState<IGuideStep | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((step: IGuideStep) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setSelectedStep(step);
      setLastOpenedStep(step);
    }, 200);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
  }, []);

  const handleContentClose = useCallback(() => {
    setSelectedStep(null);
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInside = 
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;
        if (!isInside) {
          handleContentClose();
        }
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [handleContentClose]);

  return (
    <Box 
      ref={containerRef}
      sx={{ display: 'flex', height: '100%', maxWidth: '800px', margin: 'auto' }}
    >
      <Paper elevation={3} sx={{ bgcolor: 'background.paper', display: 'flex', width: '100%', height: '100%' }}>
        <List sx={{ width: '200px', borderRight: 1, borderColor: 'divider', fontSize: '0.75rem' }}>
          {guideData.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <ListSubheader 
                sx={{ 
                  bgcolor: 'background.default', 
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  paddingLeft: '16px',
                }}
              >
                {category.category}
              </ListSubheader>
              {category.steps.map((step, stepIndex) => (
                <ListItem 
                  key={step.id}
                  onMouseEnter={() => handleMouseEnter(step)}
                  onMouseLeave={handleMouseLeave}
                  selected={selectedStep?.id === step.id}
                  sx={{ 
                    cursor: 'pointer',
                    textAlign: 'left',
                    paddingLeft: '28px',
                    bgcolor: lastOpenedStep?.id === step.id ? 'action.selected' : 'inherit',
                    '& .MuiListItemText-primary': {
                      fontSize: '0.9rem',  // Smaller text size for the list items
                    },
                  }}
                >
                  <ListItemText primary={step.title} />
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
        <Box 
          sx={{ flexGrow: 1, maxWidth: '400px', height: '100%', overflowY: 'auto', position: 'relative' }}
        >
          {selectedStep ? (
            <Box sx={{ p: 3 }}>
              <GuideContent 
                step={selectedStep}
                onBlockSelectedV2={onBlockSelectedV2}
                onClose={handleContentClose}
              />
            </Box>
          ) : (
            lastOpenedStep && (
              <></>
            )
          )}
        </Box>
      </Paper>
    </Box>
  );
};

interface IGuideComponentProps {
  onBlockSelectedV2: (json: string, eventType: string, event: MouseEvent) => void;
  onClose: () => void;
}

interface IGuideContentProps extends IGuideComponentProps {
  step: IGuideStep;
}

const GuideContent = ({ step, onBlockSelectedV2, onClose }: IGuideContentProps) => {
  const [content, setContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const DynamicGuideContent = dynamic<IGuideComponentProps>(() => import(`./guides/${step.componentName}`));
        setContent(
          <DynamicGuideContent 
            onBlockSelectedV2={onBlockSelectedV2}
            onClose={onClose}
          />
        );
      } catch (error) {
        console.error('Error loading guide content:', error);
        setContent(<div>Error loading content</div>);
      }
    };
    
    loadContent();
  }, [step, onBlockSelectedV2, onClose]);

  if (!content) {
    return <div>Loading content...</div>;
  }

  return content;
};

export default GuideBar;
