import { NextResponse } from 'next/server';
import xaman from '@/lib/xaman';
import { XummTransactionType } from 'xumm-sdk/dist/src/types';

export const runtime = 'edge';

export async function GET(req: Request) {
  const clientID = process.env.NEXT_PUBLIC_NOTION_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_NOTION_CLIENT_SECRET;
  const redirectURI = process.env.NEXT_PUBLIC_NOTION_REDIRECT_URI;

  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code || typeof code !== 'string') {
    return NextResponse.json({ message: "Invalid code" }, { status: 400 });
  }

  const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');

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
      "redirect_uri": redirectURI,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return NextResponse.json({ message: data.error }, { status: 500 });
  }

  const payload = {
    txjson: {
      TransactionType: "SignIn" as XummTransactionType,
      Memo: [{
        MemoData: Buffer.from(JSON.stringify({ notion: data }), 'utf8').toString('hex'),
      }]
    } 
  };
  const createdPayload = await xaman.payload.create(payload);

  return NextResponse.json({ payloadUrl: createdPayload?.next.always, payloadUuid: createdPayload?.uuid }, { status: 200 });
}
