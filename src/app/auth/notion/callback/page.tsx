'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const NotionCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const [payloadUrl, setPayloadUrl] = useState('');
  const [payloadUuid, setPayloadUuid] = useState('');

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
            setPayloadUrl(data.payloadUrl);
            setPayloadUuid(data.payloadUuid);
          }
        })
        .catch(console.error);
    }
  }, [code, error]);

  return (
    <>
      <h1>Notion OAuth Callback</h1>
      {error ? <p>Authentication failed: {error}</p> : <p>Processing authentication...</p>}
      {payloadUrl && <a href={payloadUrl}>Complete Sign-In with Xaman</a>}
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
