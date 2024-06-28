import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControlLabel, Checkbox } from '@mui/material';
import useLocalStorage from '@/hooks/useLocalStorage';

interface IWelcomeDialogProps {
  onYes: () => void;
}

const WelcomeDialog: React.FC<IWelcomeDialogProps> = ({ onYes }) => {
  const [open, setOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useLocalStorage('dontShowWelcomeDialog', false);

  useEffect(() => {
    if (!dontShowAgain) {
      setOpen(true);
    }
  }, [dontShowAgain]);

  const handleYes = () => {
    onYes();
    setOpen(false);
  };

  const handleNo = () => {
    setOpen(false);
  };

  const handleDontShowAgainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDontShowAgain(event.target.checked);
  };

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleNo}>
      <DialogTitle>Welcome!</DialogTitle>
      <DialogContent>
        <p>Would you like to display the demo blocks?</p>
        <FormControlLabel
          control={<Checkbox checked={dontShowAgain} onChange={handleDontShowAgainChange} />}
          label="Don't show this again"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYes} color="primary">Yes</Button>
        <Button onClick={handleNo} color="secondary">No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomeDialog;
