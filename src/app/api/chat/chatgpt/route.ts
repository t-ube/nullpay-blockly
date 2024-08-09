// app/api/chat/route.ts
export const runtime = 'edge'

import OpenAI from 'openai';

const validBlocks = [
  "text",
  "text_print",
  "dynamic_text_join",
  "text_length",
  "text_isEmpty",
  "number_to_text",
  "text_to_number",
  "text_starts_with",
  "text_ends_with",
  "text_to_uppercase",
  "text_to_lowercase",
  "text_block_comment",
  "math_number",
  "math_arithmetic",
  "wait_seconds",
  "true",
  "false",
  "null",
  "undefined",
  "controls_whileUntil",
  "controls_for",
  "controls_forEach",
  "confetti_animation",
  "json_input_block",
  "json_get_value",
  "json_key_value_pair",
  "json_set_key_values",
  "json_to_text",
  "json_to_text_v2",
  "text_to_json",
  "text_to_json_v2",
  "dynamic_json_key_values",
  "text_to_lowercase",
  "text_to_number",
  "text_to_uppercase",
  "number_to_text",
  "text_block_comment",
  "current_datetime",
  "create_datetime",
  "adjust_datetime",
  "compare_datetime",
  "datetime_text_format",
  "datetime_to_text",
  "timezone_block",
  "ripple_epoch_to_datetime",
  "datetime_to_ripple_epoch",
  "xrpl_account_info",
  "xrpl_account_lines_command",
  "xrpl_rippling_txn",
  "xrpl_address",
  "xrpl_exchange_address",
  "xrpl_drops_to_xrp",
  "xrpl_xrp_to_drops",
  "xrpl_extract_offer_create_txn",
  "xrpl_read_txn_info",
  "xrpl_client_initialize",
  "xrpl_clio_nft_info",
  "xrpl_faucet_network_selection",
  "xrpl_network_wss_selection",
  "xrpl_nftoken_buy_offer",
  "xrpl_buy_token_offer_txn",
  "xrpl_sale_token_offer_txn",
  "xrpl_nft_buy_offers",
  "xrpl_payment_token_txn",
  "xrpl_payment_transaction",
  "xrpl_request_custom_faucet",
  "xrpl_request_faucet",
  "xrpl_client_autofill",
  "xrpl_client_submit",
  "xrpl_easy_submit",
  "xrpl_tx_command",
  "xrpl_subscribe_account_txn",
  "xrpl_subscribe_all_txn",
  "xrpl_unsubscribe_account_txn",
  "xrpl_unsubscribe_all_txn",
  "xrpl_create_new_token",
  "xrpl_token_amount_arithmetic",
  "xrpl_token_amount_set",
  "xrpl_token_select",
  "xrpl_trust_set_txn",
  "xrpl_txn_type_select",
  "xrpl_create_account",
  "xrpl_load_wallet",
  "xrpl_wallet_info",
  "xrpl_wallet_sign",
  "xaman_payload_set",
  "xaman_payment",
  "xaman_wait_for_signature",
  "xaman_simple_login",
  "xaman_simple_logout",
  "xaman_variable_get",
  "xaman_variable_name",
  "xaman_variable_set",
  "lists_append",
  "array_init",
  "lists_sort_json_value"
];

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: false
});

export async function POST(req: Request) {
  try {
    const requestJson = await req.json();
    //const prompt = `以下のBlocklyブロックのみを使用してください: ${validBlocks.join(', ')}。次のタスクのためのBlockly XMLを生成してください: ${requestJson.task}`;
    const prompt = `${requestJson.task}`;
    const completion = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-1106:personal::9pt5iPm3",
      messages: [
        { 
          role: 'system', 
          content: "あなたは経験豊富なXRPLプログラマーで、有効なBlockly XMLのみを生成するアシスタントです。生成するBlockly XMLの座標は常に0にしてください。"
        },
        { role: "user", content: prompt }
      ],
    });

    let generatedXml = completion.choices[0].message?.content || '';

    if (!generatedXml.includes('<xml') || !generatedXml.includes('</xml>')) {
      throw new Error(JSON.stringify({ message: generatedXml }));
    }

    for (const block of generatedXml.split('<block type="')) {
      if (!validBlocks.some(validBlock => block.includes(validBlock))) {
        generatedXml = generatedXml.replace(`<block type="${block}`, '');
      }
    }
   
    return new Response(JSON.stringify({ generatedContent: generatedXml }) , {
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
