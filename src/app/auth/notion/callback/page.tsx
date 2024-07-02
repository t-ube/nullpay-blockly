'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import xamanPkce from '@/utils/XamanPkce';

const NotionCallback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if (error) {
      console.error('OAuth error:', error);
    } else if (code) {
      fetch(`/api/auth/notion?code=${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Token exchange error:', data.error);
        } else {
          console.log('Token exchange success:', data);
          setAccessToken(data.access_token);

          const fetchData = async () => {
            try {
              const state = await xamanPkce.state();
              if (state?.me) {
                const { sdk } = state;
                await sdk.jwtUserdata.set('notion', data.access_token);
              } else {
                throw new Error('Not logged in');
              }
            } catch (error) {
              console.error('Failed to save notion token:', error);
            }
          };
          fetchData();
        }
      })
      .catch(console.error);
    }
  }, [code, error]);

  return (
    <>
      <h1>Notion OAuth Callback</h1>
      {error ? <p>Authentication failed: {error}</p> : <p>Processing authentication...</p>}
      {accessToken && {accessToken}}
    </>
  );
};

const NotionCallbackPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotionCallback />
    </Suspense>
  );
};

export default NotionCallbackPage;
