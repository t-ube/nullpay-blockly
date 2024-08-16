// app/api/chat/langchain/route.ts
export const runtime = 'edge'

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: false
});

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
})

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
    When generating, please strictly adhere to the following rules:
    1. Always begin with the <xml xmlns="https://developers.google.com/blockly/xml"> tag and end with the </xml> tag.
    2. The coordinates (x, y attributes) of all blocks must be set to 0. There are no exceptions to this rule.
    3. If there are two or more blocks, ensure that all blocks are connected. There are no exceptions to this rule.
    4. The <block> element must include both the type attribute .
    5. The <field> element must include the name attribute.
    6. Use the special block types for XRPL and Xaman (formerly XUMM) correctly.
    7. Properly use the <next> tag for connections between blocks. Use the 'next' tag only if the next block can correctly accept a 'previous' connection.
    8. The user's task may contain specific addresses or other information. Include this information in the generated XML where appropriate.
    9. Do not add any addresses or sensitive information that are not present in the user's task or the original XMLs.
    10. If there are fields in the user's task that could contain sensitive data such as addresses or seed values that are not provided, use placeholder values or descriptive tags.

    Original XMLs:
    ${similarXmls.map((xml:any, index:number) => `Document ${index + 1}:\n${xml}`).join('\n\n')}
    
    User Task: ${requestJson.task}
    
    Please provide the following:
    1. Generated XML: Create an XML based on the rules above and the user's task.
    2. Explanation: Provide a detailed explanation of the generated XML, including:
       - How it addresses the user's task
       - The purpose and function of each block in the XML
       - Why certain blocks or structures were chosen
       - Any assumptions or interpretations made about the user's requirements
    
    In your explanation, focus on the structure and functionality of the generated XML in relation to the user's task.
    You may reference concepts or approaches from the original XMLs if relevant, but do not directly compare or contrast with specific original XMLs.
    
    Format your response as follows:
    
    Generated XML:
    <xml>
    ...
    </xml>

    Explanation:
    [Your detailed explanation here]
    `;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 4096,
      messages: [
        { role: "user", content: `${prompt}` }
      ]
    });

    let generatedContent = response.content[0].type === 'text' 
      ? response.content[0].text 
      : 'Sorry, I could not generate a response.'

    // Extract XML and explanation
    const xmlMatch = generatedContent.match(/<xml[\s\S]*?<\/xml>/);
    const xmlContent = xmlMatch ? xmlMatch[0] : '';

    const explanationMatch = generatedContent.match(/Explanation:\s*([\s\S]*)/);
    const explanation = explanationMatch ? explanationMatch[1].trim() : '';

    if (!xmlContent || !explanation) {
      throw new Error('Failed to extract valid XML or explanation from the generated content');
    }

    return new Response(JSON.stringify({ 
      generatedContent: xmlContent,
      explanation: explanation 
    }), {
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
