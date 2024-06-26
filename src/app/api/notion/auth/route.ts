export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams, protocol, host } = new URL(req.url);
  const credentials = Buffer.from(`${process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_ID}:${process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_SECRET}`).toString('base64');
  const code = searchParams.get('code');

  if (!code || typeof code !== 'string') {
    return new Response(JSON.stringify({ message: "Invalid code" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const response = await fetch('https://api.notion.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.NEXT_PUBLIC_NOTION_REDIRECT_URI,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return new Response(JSON.stringify({ message: data.error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
