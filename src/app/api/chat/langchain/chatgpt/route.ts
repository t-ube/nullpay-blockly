// app/api/chat/langchain/route.ts
export const runtime = 'edge'

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: false
});

export async function POST(req: Request) {
  try {
    const requestJson = await req.json();

    const embedResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: requestJson.task,
    });
    const queryEmbedding = embedResponse.data[0].embedding;

    // Pinecone query request
    const pineconeResponse = await fetch(`${process.env.NEXT_PUBLIC_PINECONE_HOST}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Api-Key': process.env.NEXT_PUBLIC_PINECONE_API_KEY,
        'X-Pinecone-API-Version': '2024-07',
      },
      body: JSON.stringify({
        vector: queryEmbedding,
        topK: 3,
        includeMetadata: true,
      }),
    });

    const searchResponse = await pineconeResponse.json();

    const similarXmls = searchResponse.matches
      .map((match: any) => match.metadata?.content as string)
      .filter(Boolean);

    if (similarXmls.length === 0) {
      throw new Error(JSON.stringify({ message: 'No similar XML found' }));
    }

    const prompt = `
    Based on the following XML documents and the user query, generate a new XML that satisfies the user's request.
    Make sure to keep the structure similar to the original XMLs, but combine and modify the content according to the query.
    
    Important:
    - The user's task may contain specific addresses or other information. Include this information in the generated XML where appropriate.
    - Do not add any additional addresses or sensitive information that are not present in the user's task or the original XMLs.
    - For any fields that might contain sensitive data not provided in the user's task, use placeholder values or descriptive tags.
    
    Original XMLs:
    ${similarXmls.map((xml:any, index:number) => `Document ${index + 1}:\n${xml}`).join('\n\n')}
    
    User Task: ${requestJson.task}
    
    Generated XML:
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt }
      ],
    });

    let generatedXml = completion.choices[0].message?.content || '';

    if (!generatedXml.includes('<xml') || !generatedXml.includes('</xml>')) {
      throw new Error(JSON.stringify({ message: generatedXml }));
    }

    return new Response(JSON.stringify(
      {
        generatedContent: generatedXml,
        explanation: "Code blocks have been created."
      }
    ) , {
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
