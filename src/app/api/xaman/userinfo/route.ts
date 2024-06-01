export const runtime = 'edge'

export async function GET (
  req: Request
  ) {
  const { searchParams } = new URL(req.url);

  if (!searchParams.has('uuid')) {
    return new Response(JSON.stringify({ message: "uuid is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const uuid = searchParams.get('uuid');

  try {
    const response = await fetch(`https://xumm.app/api/v1/platform/payload/${uuid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to connect to the server" }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
