import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code || typeof code !== 'string') {
    return NextResponse.json({ message: "Invalid code" }, { status: 400 });
  }

  const credentials = Buffer.from(`${process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_ID}:${process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_SECRET}`).toString('base64');

  const response = await fetch('https://api.notion.com/v1/oauth/token', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": process.env.NEXT_PUBLIC_NOTION_REDIRECT_URI,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return NextResponse.json({ message: data.error }, { status: 500 });
  }
  
  return NextResponse.json(data, { status: 200 });
}
