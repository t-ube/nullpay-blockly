// app/api/chat/chatgpt/route.ts
export const runtime = 'edge'

import OpenAI from 'openai';

const validBlocks = [
  "text",
  "text_print",
  "dynamic_text_join",
  "text_length",
  "text_isEmpty",
  "text_to_lowercase",
  "text_to_number",
  "number_to_text",
  "text_starts_with",
  "text_ends_with",
  "text_to_uppercase",
  "math_number",
  "math_arithmetic",
  "math_percentage",
  "math_single",
  "math_trig",
  "math_constant",
  "math_number_property",
  "math_round",
  "math_on_list",
  "math_modulo",
  "math_constrain",
  "math_random_int",
  "math_random_float",
  "math_atan2",
  "controls_wait_seconds",
  "controls_wait_until_datetime",
  "logic_true",
  "logic_false",
  "logic_null",
  "logic_undefined",
  "logic_boolean",
  "logic_compare",
  "logic_operation",
  "logic_negate",
  "logic_ternary",
  "controls_whileUntil",
  "controls_for",
  "controls_forEach",
  "json_create",
  "json_get_value",
  "json_key_value_pair",
  "json_append_key_values",
  "json_to_text",
  "text_to_json",
  "json_add_key_value_pairs",
  "code_multi_line_comment",
  "datetime_current",
  "datetime_create",
  "datetime_adjust",
  "datetime_compare",
  "datetime_text_format",
  "datetime_to_text",
  "datetime_timezone",
  "lists_append",
  "lists_sort_json_value",
  "animation_confetti",
  "xrpl_ripple_epoch_to_datetime",
  "xrpl_datetime_to_ripple_epoch",
  "xrpl_payload_rippling_config",
  "xrpl_payload_nft_buy_offer",
  "xrpl_payload_token_buy_offer",
  "xrpl_payload_token_sell_offer",
  "xrpl_payload_payment",
  "xrpl_payload_token_payment",
  "xrpl_payload_trustline_config",
  "xrpl_address",
  "xrpl_exchange_address",
  "xrpl_drops_to_xrp",
  "xrpl_xrp_to_drops",
  "xrpl_extract_offer_create_details",
  "xrpl_extract_transaction_details",
  "xrpl_client_initialize",
  "xrpl_select_faucet_network_uri",
  "xrpl_select_websocket_endpoint",
  "xrpl_create_account_and_request_faucet",
  "xrpl_request_faucet",
  "xrpl_autofill_payload",
  "xrpl_submit_transaction",
  "xrpl_command_tx",
  "xrpl_command_account_info",
  "xrpl_command_account_lines",
  "xrpl_command_subscribe_account_txn",
  "xrpl_command_subscribe_streams_all_txn",
  "xrpl_command_unsubscribe_account_txn",
  "xrpl_command_unsubscribe_streams_all_txn",
  "xrpl_command_nft_buy_offers",
  "xrpl_command_submit_signed_transaction",
  "xrpl_command_get_nft_info",
  "xrpl_define_token_data",
  "xrpl_calculate_token_amount",
  "xrpl_set_token_amount",
  "xrpl_select_token",
  "xrpl_transaction_type",
  "xrpl_generate_wallet",
  "xrpl_load_wallet",
  "xrpl_wallet_info",
  "xrpl_wallet_sign",
  "xaman_request_transaction_signature",
  "xaman_request_payment_signature",
  "xaman_wait_for_signature",
  "xaman_login",
  "xaman_logout",
  "xaman_variable_get",
  "xaman_variable_name",
  "xaman_variable_set",
];

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: false
});

export async function POST(req: Request) {
  try {
    const requestJson = await req.json();
    const prompt = `以下のBlocklyブロックのみを使用してください: ${validBlocks.join(', ')}。次のタスクのためのBlockly XMLを生成してください: ${requestJson.task}`;
    const completion = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-1106:personal::9v4jFerr",
      messages: [
        { 
          role: 'system', 
          content: `あなたは経験豊富なXRPLプログラマーで、有効なBlockly XMLのみを生成するアシスタントです。以下のガイドラインに厳密に従ってください：

1. 生成するBlockly XMLの座標は常に0にしてください。
2. XMLは必ず<xml xmlns="https://developers.google.com/blockly/xml"></xml>で囲んでください。
3. ブロックは適切な順序で連鎖させ、nextタグを使用して接続してください。
4. 指定されたvalidBlocksリスト内のブロックのみを使用してください。
5. 存在しないvalue nameを使用しないでください。各ブロックで有効なvalue nameのみを使用してください。
6. XRPLの仕様に厳密に従い、適切なフィールド名と値を使用してください。
7. トランザクションタイプ、アカウント、通貨など、XRPL固有の概念を正確に表現してください。
8. 必要に応じて、適切なネストされたブロック構造を使用してください。
9. コメントブロックを使用して、複雑な操作や重要な注意点を説明してください。
10. 生成されたXMLが妥当で、Blocklyエディタで正しく読み込めることを確認してください。

これらのガイドラインに従うことで、高品質で実用的なXRPL Blockly XMLを生成してください。`
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
