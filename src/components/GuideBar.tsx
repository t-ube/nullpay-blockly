import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, ListSubheader, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import dynamic from 'next/dynamic';
import * as Blockly from 'blockly/core';
import { guideData, IGuideStep } from '@/data/guideData';
import { useGuideBar } from '@/contexts/GuideBarContext';

interface IGideBarProps {
  onBlockSelectedV2: (json: string, eventType: string, event: MouseEvent) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  mainWorkspace: Blockly.WorkspaceSvg;
}

const GuideBar = ({
  onBlockSelectedV2,
  open,
  setOpen,
  mainWorkspace,
}: IGideBarProps) => {
  const [selectedStep, setSelectedStep] = useState<IGuideStep | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { openCategories, setOpenCategories, lastOpenedStep, setLastOpenedStep } = useGuideBar();

  const handleMouseEnter = useCallback((step: IGuideStep) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setSelectedStep(step);
      setLastOpenedStep(step);
    }, 200);
  }, [setSelectedStep,setLastOpenedStep]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
  }, []);

  const handleContentClose = useCallback(() => {
    setSelectedStep(null);
    setOpen(false);
  }, [setOpen]);

  const handleCategoryClick = (categoryIndex: number) => {
    setOpenCategories(prev => ({ ...prev, [categoryIndex]: !prev[categoryIndex] }));
  };

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
      <Paper elevation={3} sx={{ 
        bgcolor: 'background.paper', 
        display: 'flex', 
        width: '100%', 
        height: '100%',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <Box sx={{
          width: '220px', 
          borderRight: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
          <List sx={{ 
            flexGrow: 1,
            overflowY: 'auto',
            fontSize: '0.75rem',
            bgcolor: '#f8f9fa',
            '& .MuiListItem-root': {
              padding: '4px 16px',
            },
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced4da',
              borderRadius: '3px',
            },
          }}>
            {guideData.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <ListItem 
                  button 
                  onClick={() => handleCategoryClick(categoryIndex)}
                  sx={{ 
                    bgcolor: '#f1f3f5', 
                    color: '#495057',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    padding: '8px 16px',
                    lineHeight: '1.2',
                    letterSpacing: '0.3px',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid #e9ecef',
                    '&:hover': {
                      bgcolor: '#e9ecef',
                    },
                  }}
                >
                  <ListItemText 
                    primary={category.category} 
                    primaryTypographyProps={{ 
                      fontSize: '0.8rem',
                      fontWeight: '600',
                    }}
                  />
                  {openCategories[categoryIndex] ? 
                    <ExpandLess fontSize="small" /> : 
                    <ExpandMore fontSize="small" />
                  }
                </ListItem>
                <Collapse in={openCategories[categoryIndex]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {category.steps.map((step, stepIndex) => (
                      <ListItem 
                        key={step.id}
                        onMouseEnter={() => handleMouseEnter(step)}
                        onMouseLeave={handleMouseLeave}
                        selected={selectedStep?.id === step.id}
                        sx={{ 
                          cursor: 'pointer',
                          textAlign: 'left',
                          paddingLeft: '24px',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)',
                          },
                          '&.Mui-selected': {
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                            '&:hover': {
                              bgcolor: 'primary.main',
                            },
                          },
                          bgcolor: lastOpenedStep?.id === step.id ? 'action.selected' : 'inherit',
                          '& .MuiListItemText-primary': {
                            fontSize: '0.75rem',
                            fontWeight: 'normal',
                          },
                          '& .MuiListItemText-root': {
                            margin: 0,
                          },
                          minHeight: '32px',
                        }}
                      >
                        <ListItemText primary={step.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>
        <Box 
          sx={{ 
            flexGrow: 1, 
            maxWidth: '580px', 
            height: '100%', 
            overflowY: 'auto', 
            position: 'relative',
            bgcolor: '#ffffff',
            borderLeft: '1px solid',
            borderColor: 'divider',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced4da',
              borderRadius: '3px',
            },
          }}
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
        setContent(<Typography color="error">Error loading content</Typography>);
      }
    };
    
    loadContent();
  }, [step, onBlockSelectedV2, onClose]);

  if (!content) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Typography variant="body2" color="text.secondary">Loading content...</Typography>
    </Box>;
  }

  return content;
};

export default GuideBar;