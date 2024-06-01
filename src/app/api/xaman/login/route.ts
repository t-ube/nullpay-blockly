export const runtime = 'edge'

export async function POST (
  req: Request
  ) {

  try {
    const response = await fetch('https://xumm.app/api/v1/platform/payload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_XUMM_API_KEY,
        'x-api-secret': process.env.NEXT_PUBLIC_XUMM_API_SECRET
      },
      body: JSON.stringify({
        txjson: {
          TransactionType: 'SignIn'
        }
      })
    });
    const data = await response.json();
    
    if (data?.error) {
      return new Response(JSON.stringify({ message: "Failed to login", error: data.error }), {
        status: 400,
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
    return new Response(JSON.stringify({ message: "Failed to connect to the server" }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
