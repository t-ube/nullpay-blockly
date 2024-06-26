'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const NotionCallback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      console.error('OAuth error:', error);
    } else if (code) {
      fetch(`/api/notion/auth?code=${code}`, {
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
          }
        })
        .catch(console.error);
    }
  }, [code, error]);

  return (
    <>
      <h1>Notion OAuth Callback</h1>
      {error ? <p>Authentication failed: {error}</p> : <p>Processing authentication...</p>}
    </>
  );
};

export default NotionCallback;
