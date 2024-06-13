import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal, Box, Button, Typography, Fade, Stack, FormControlLabel, Checkbox, Divider } from '@mui/material';
import { ReleaseInfo } from '@/types/featureType';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useMobile } from '@/contexts/MobileContext';

interface FeatureModalProps {
  releaseInfo: ReleaseInfo;
}

const FeatureModal = ({ releaseInfo } : FeatureModalProps) => {
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
        left: isMobile && isPortrait ? 'none' :'50%',
        transform: isMobile && isPortrait ? 'none' : 'translate(-50%, -50%)',
        width: 600,
        maxWidth: '100vw',
        height: isMobile && isPortrait ? 600 : 400,
        maxHeight: '100vw',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: isMobile ? 1 : 4,
        pt: isMobile ? 1 : 2,
        outline: 0,
        borderRadius: isMobile && isPortrait ? 0 : 2
      }}>
        <Typography id="feature-modal-title" variant="h5" component="h2" fontWeight={'bold'} gutterBottom textAlign={isMobile ? 'center' : 'start'}>
          {`What's New in Version ${releaseInfo.displayVersion} 👻`}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {releaseInfo.features.map((feature, index) => (
          <Fade
            in={activeStep === index}
            style={{ transformOrigin: '0 0 0' }}
            {...(activeStep === index ? { timeout: 1000 } : {})}
            key={index}
          >
            <Box sx={{ display: activeStep === index ? 'block' : 'none' }}>
              <Stack direction="row" spacing={2}>
                <Box flex={1}>
                  <Image src={feature.image} alt={feature.title} width={300} height={300} objectFit="contain" />
                </Box>
                <Box flex={1}>
                  <Typography variant="h6">{feature.title}</Typography>
                  <Typography variant="body1">{feature.description}</Typography>
                </Box>
              </Stack>
            </Box>
          </Fade>
        ))}
        <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleBack} disabled={activeStep === 0} sx={{color: '#A855F7'}}>
            Prev
          </Button>
          {activeStep === releaseInfo.features.length - 1 ? (
            <Button onClick={handleClose} variant="contained" color="primary" sx={{
              bgcolor: '#A855F7',
              '&:hover': {
                bgcolor: '#8E24AA',
              },
            }}>
              Start
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained" color="primary" sx={{
              bgcolor: '#A855F7',
              '&:hover': {
                bgcolor: '#8E24AA',
              },
            }}>
              Next
            </Button>
          )}
        </Box>
        <Box sx={{ position: 'absolute', bottom: 80, left: 32 }}>
          <FormControlLabel
            control={<Checkbox checked={dontShowAgain} onChange={handleDontShowAgainChange} />}
            label="Don't show this again"
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default FeatureModal;
