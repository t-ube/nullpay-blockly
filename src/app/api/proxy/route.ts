// app/api/proxy/route.ts
export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const requestJson = await req.json();
    let payload: { method: string; headers?: Record<string, string>; body?: string } = {
      method: requestJson.method
    };

    if (requestJson.headers) {
      payload.headers = requestJson.headers;
    }
    if (requestJson.body) {
      payload.body = JSON.stringify(requestJson.body);
    }

    const response = await fetch(requestJson.url, payload);
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
