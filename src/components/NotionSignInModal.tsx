import React, { useState, useEffect } from 'react';
import { Modal, Button, Typography } from '@mui/material';

interface ISignInModalProps {
  open: boolean;
  onClose: () => void;
  onTokenReceived: (token: string) => void;
}

const NotionSignInModal = ({ open, onClose, onTokenReceived }: ISignInModalProps) => {


  const handleAuth = () => {
    const width = 600;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const notionAuthUrl = `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NOTION_REDIRECT_URI}&response_type=code`;
    const authWindow = window.open(notionAuthUrl, 'Notion Auth', `width=${width},height=${height},left=${left},top=${top}`);

    const authCheckInterval = setInterval(() => {
      console.log('authCheckInterval');
      try {
        if (authWindow && authWindow.location.href.includes(`${process.env.NEXT_PUBLIC_NOTION_REDIRECT_URI}`)) {
          const url = new URL(authWindow.location.href);
          const code = url.searchParams.get('code');
          if (code) {
            onTokenReceived(code);
            authWindow.close();
            clearInterval(authCheckInterval);
            onClose();
          }
        }
      } catch (error) {
        // Cross-origin access, ignore this error
      }

      if (authWindow && authWindow.closed) {
        clearInterval(authCheckInterval);
        onClose();
      }
    }, 500);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: '20px', background: 'white', margin: '100px auto', width: '300px', textAlign: 'center' }}>
        <h1>Notion Integration</h1>
        <Button variant="contained" color="primary" onClick={handleAuth}>
          Add to Notion
        </Button>
        <Button onClick={onClose} style={{ marginTop: '10px' }}>Close</Button>
      </div>
    </Modal>
  );
};

export default NotionSignInModal;
