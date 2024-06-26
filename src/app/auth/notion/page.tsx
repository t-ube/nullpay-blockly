'use client';

export default function SignIn() {
  const notionAuthUrl = `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${process.env.NEXT_PUBLIC_NOTION_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NOTION_REDIRECT_URI}&response_type=code`;

  return (
    <div>
      <h1>Notion Integration</h1>
      <a href={notionAuthUrl}>Add to Notion</a>
    </div>
  );
}
