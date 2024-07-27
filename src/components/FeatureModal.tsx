import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal, Box, Button, Typography, Fade, Stack, FormControlLabel, Checkbox, Divider } from '@mui/material';
import { IReleaseInfo } from '@/interfaces/IReleaseInfo';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useMobile } from '@/contexts/MobileContext';

interface IFeatureModalProps {
  releaseInfo: IReleaseInfo;
}

const FeatureModal = ({ releaseInfo } : IFeatureModalProps) => {
  const { isMobile, isPortrait, isLoaded } = useMobile();
  const [open, setOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useLocalStorage(`dontShowReleaseInfo-${releaseInfo.version}`, false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!dontShowAgain) {
      setOpen(true);
    }
  }, [dontShowAgain]);

  const handleDontShowAgainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDontShowAgain(event.target.checked);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="feature-modal-title"
      aria-describedby="feature-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: isMobile && isPortrait ? '10%' : '50%',
        left: isMobile && isPortrait ? 'none' : '50%',
        transform: isMobile && isPortrait ? 'none' : 'translate(-50%, -50%)',
        width: 800,
        maxWidth: '100vw',
        height: isMobile && isPortrait ? '70vh' : '80vh',
        maxHeight: isMobile && isPortrait ? '100vh' : 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: isMobile ? 1 : 4,
        pt: isMobile ? 1 : 2,
        outline: 0,
        borderRadius: isMobile && isPortrait ? 0 : 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Typography id="feature-modal-title" variant="h5" component="h2" fontWeight="bold" gutterBottom textAlign="center">
          {`What's New in Version ${releaseInfo.displayVersion} 👻`}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box flex={1} overflow="auto">
          {releaseInfo.features.map((feature, index) => (
            <Fade
              in={activeStep === index}
              style={{ transformOrigin: '0 0 0' }}
              {...(activeStep === index ? { timeout: 1000 } : {})}
              key={index}
            >
              <Box sx={{ display: activeStep === index ? 'block' : 'none' }}>
                <Typography variant="h6" textAlign="center" mb={2}>{feature.title}</Typography>
                <Box textAlign="center" mb={2}>
                  {feature.image.endsWith('.mp4') ? (
                    <video width="100%" height="auto" controls autoPlay loop muted style={{ maxHeight: '360px' }}>
                      <source src={feature.image} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Box
                      minHeight={'300px'}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={isMobile ? 200 : 400}
                        height={isMobile ? 200 : 400}
                        objectFit="contain"
                        style={{ display: 'block', margin: '0 auto' }}
                      />
                    </Box>
                  )}
                </Box>
                <Typography variant="body1" textAlign="left" mb={2} sx={{ mx: isMobile ? 2 : 4 }}>
                  {feature.description}
                </Typography>
                {feature.onDemoEvent && (
                  <Box textAlign="center">
                    <Button
                      onClick={() => {
                        if (feature.onDemoEvent) {
                          feature.onDemoEvent();
                        }
                        handleClose();
                      }}
                      sx={{
                        bgcolor: '#ffffff',
                        color: '#A855F7',
                        border: '1px solid #A855F7',
                        '&:hover': {
                          bgcolor: '#f0f0f0',
                          color: '#8E24AA',
                          border: '1px solid #8E24AA',
                        },
                      }}
                    >
                      TRY IT
                    </Button>
                  </Box>
                )}
              </Box>
            </Fade>
          ))}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <FormControlLabel
            control={<Checkbox checked={dontShowAgain} onChange={handleDontShowAgainChange} />}
            label="Don't show this again"
          />
          <Box>
            <Button 
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                marginRight: 2,
                color: '#A855F7'
              }}
            >
              Prev
            </Button>
            {activeStep === releaseInfo.features.length - 1 ? (
              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: '#A855F7',
                  '&:hover': {
                    bgcolor: '#8E24AA',
                  }
                }}
              >
                Start
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: '#A855F7',
                  '&:hover': {
                    bgcolor: '#8E24AA',
                  },
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FeatureModal;
