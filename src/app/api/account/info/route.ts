import { Client as xrplClient, AccountInfoRequest } from 'xrpl';

export const runtime = 'edge'

export async function GET(
    req: Request
  ) {
  const { searchParams } = new URL(req.url)
  
  if (!searchParams.has('network')) {
    return new Response(JSON.stringify({ message: "network is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  if (!searchParams.has('account')) {
    return new Response(JSON.stringify({ message: "account is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const network = searchParams.get('network');
  const account = searchParams.get('account');

  if (network === null)
  {
    return new Response(JSON.stringify({ message: "network is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const xahau_client = new xrplClient(network);
  await xahau_client.connect();

  try {
    const response: AccountInfoRequest = await xahau_client.request({
      command: 'account_info',
      account: `${account}`,
      ledger_index: "current",
      queue: true,
    })

    await xahau_client.disconnect();
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    await xahau_client.disconnect()
    return new Response(JSON.stringify({ message: "Failed to connect to the server" }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
