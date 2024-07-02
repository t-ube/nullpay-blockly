// app/api/proxy/route.ts
export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const response = await fetch(payload.url, {
      method: payload.method,
      headers: payload.headers,
      body: JSON.stringify(payload.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Failed to process request", error: data }), {
        status: response.status,
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
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to connect to the server", error }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
