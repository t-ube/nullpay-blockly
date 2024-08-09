import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import dynamic from 'next/dynamic';
import { IGuideStep, guideData } from '@/data/guideData';

interface GuidePopoverProps {
  open: boolean;
  onClose: () => void;
  guideStep: IGuideStep | null;
}

const GuidePopover: React.FC<GuidePopoverProps> = ({ open, onClose, guideStep }) => {
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [currentStep, setCurrentStep] = useState<IGuideStep | null>(null);

  useEffect(() => {
    setCurrentStep(guideStep);
  }, [guideStep]);

  useEffect(() => {
    if (currentStep) {
      const DynamicGuideContent = dynamic(() => import(`./guides/${currentStep.componentName}`));
      setContent(<DynamicGuideContent />);
    }
  }, [currentStep]);

  const allSteps = guideData.flatMap(category => category.steps);
  const currentIndex = allSteps.findIndex(step => step.id === currentStep?.id);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentStep(allSteps[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < allSteps.length - 1) {
      setCurrentStep(allSteps[currentIndex + 1]);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="guide-modal-title"
      aria-describedby="guide-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ overflowY: 'auto', flexGrow: 1, mb: 2 }}>
          {content}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button 
            onClick={handlePrevious} 
            disabled={currentIndex === 0}
            startIcon={<ArrowBackIcon />}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={currentIndex === allSteps.length - 1}
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GuidePopover;