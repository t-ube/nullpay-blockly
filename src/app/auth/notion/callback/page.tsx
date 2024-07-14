'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const NotionCallback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      console.error('OAuth error:', error);
    } else if (code) {
    }
  }, [code, error]);

  return (
    <>
      <h1>Notion OAuth Callback</h1>
      {error ? <p>Authentication failed: {error}</p> : <p>Processing authentication...</p>}
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
