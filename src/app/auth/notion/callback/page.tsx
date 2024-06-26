import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotionCallback = () => {
  const router = useRouter();
  const { code, error } = router.query;

  useEffect(() => {
    if (error) {
      console.error('OAuth error:', error);
    } else if (code) {
      fetch(`/api/notion-auth?code=${code}`)
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
