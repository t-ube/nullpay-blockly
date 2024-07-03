'use client';

import React, { useState } from 'react';
import NotionSignInModal from '@/components/NotionSignInModal';
import { Button } from '@mui/material';

export default function SignIn() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTokenReceived = (token: string) => {
    setToken(token);
    console.log('Token received:', token);
  };
  
  return (
    <div>
      <h1>Notion Integration</h1>
      <div>
        <h1>Main Page</h1>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Sign In with Notion
        </Button>
        <NotionSignInModal open={open} onClose={handleClose} onTokenReceived={handleTokenReceived} />
        {token && <p>Received token: {token}</p>}
      </div>
    </div>
  );
}
