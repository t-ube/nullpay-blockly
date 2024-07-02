'use client';

import React, { useState } from 'react';
import NotionSignInModal from '@/components/NotionSignInModal';
import { Button } from '@mui/material';
import xamanPkce from '@/utils/XamanPkce';

export default function SignIn() {
  //const notionAuthUrl = `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NOTION_REDIRECT_URI}&response_type=code`;
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
    const fetchData = async () => {
      try {
        const state = await xamanPkce.state();
        if (state?.me) {
          const { sdk } = state;
          await sdk.jwtUserdata.set('notion', [token]);
        } else {
          throw new Error('Not logged in');
        }
      } catch (error) {
        console.error('Failed to save notion token:', error);
      }
    };
    fetchData();
  };
  
  return (
    <div>
      <h1>Notion Integration</h1>
      {/*<a href={notionAuthUrl}>Add to Notion</a>*/}
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
