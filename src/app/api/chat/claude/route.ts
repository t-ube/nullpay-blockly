// app/api/chat/route.ts
export const runtime = 'edge'

import Anthropic from '@anthropic-ai/sdk'

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
  "array_append",
  "array_init",
  "lists_sort_json_value"
];

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
})

export async function POST(req: Request) {
  try {
    const requestJson = await req.json();
    const prompt = `
以下のBlocklyブロックのみを使用してください: ${validBlocks.join(', ')}。
次のタスクのためのBlockly XMLを生成してください: ${requestJson.task}

生成する際は以下のルールを厳守してください：
1. 必ず<xml xmlns="https://developers.google.com/blockly/xml">タグで始まり、</xml>タグで終わること。
2. すべてのブロックの座標（x, y属性）は必ず0に設定すること。この規則に例外はありません。
3. 2個以上のブロックが存在する場合は必ずすべてのブロックを接続すること。この規則に例外はありません。
4. 変数は<variables>セクション内で定義し、適切に使用すること。
5. <block>要素には必ずtype属性とid属性を含めること。
6. <field>要素にはname属性を含めること。
7. XRPLとXaman（旧XUMM）の特殊なブロックタイプを正しく使用すること。
8. ブロック間の接続には<next>タグを適切に使用すること。 'next' タグは、次のブロックが確実に 'previous' 接続を受け入れる場合にのみ使用してください。
9. 提供されたvalidBlocksリスト内のブロックのみを使用すること。リストにないブロックは使用しないでください。
10. 生成するXMLは、指定されたタスクを実行するための具体的な手順を表現すること。
11. 値を返すブロック（例：xrpl_wallet_info）は、直接他のブロックに接続せず、変数に代入するか、他のブロックの入力値として使用してください。
12. ステートメントブロック（例：xaman_simple_login, xrpl_payment_transaction）のみを直接接続してください。
以下は、10 XRPを送金するための有効なBlockly XMLの例です：

<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="userInfoVar">userInfo</variable>
    <variable id="payloadIDVar">payloadID</variable>
    <variable id="errorVar">error</variable>
  </variables>
  <block type="xaman_simple_login" id="loginBlock" x="0" y="0">
    <field name="VAR" id="userInfoVar">userInfo</field>
    <next>
      <block type="xaman_payment" id="paymentBlock">
        <field name="VAR" id="payloadIDVar">payloadID</field>
        <field name="ERROR_VAR" id="errorVar">error</field>
        <value name="DESTINATION">
          <block type="text" id="destAddressBlock">
            <field name="TEXT">rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY</field>
          </block>
        </value>
        <value name="AMOUNT">
          <block type="xrpl_xrp_to_drops" id="amountBlock">
            <value name="AMOUNT">
              <block type="math_number" id="xrpAmountBlock">
                <field name="NUM">10</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="xaman_wait_for_signature" id="waitSignatureBlock">
            <value name="PAYLOAD">
              <block type="variables_get" id="getPayloadIDBlock">
                <field name="VAR" id="payloadIDVar">payloadID</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>

この例を参考に、要求されたタスクに適したXMLを生成してください。生成したXMLが上記のルールを満たしているか必ず確認してください。特に、すべてのブロックの座標が0に設定されていることを確認してください。
また、生成されたXMLが指定されたタスクを適切に実行できることを確認してください。XMLのみを出力し、説明は不要です。
`;

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4096,
      messages: [
        { role: "user", content: `Human: ${prompt}\n\nAssistant: ここにBlockly XMLを生成します。` }
      ]
    });

    let generatedContent = response.content[0].type === 'text' 
      ? response.content[0].text 
      : 'Sorry, I could not generate a response.'

    const xmlStartIndex = generatedContent.indexOf('<xml');
    const xmlEndIndex = generatedContent.lastIndexOf('</xml>') + 6; // '</xml>'.length = 6

    if (xmlStartIndex !== -1 && xmlEndIndex !== -1) {
      generatedContent = generatedContent.substring(xmlStartIndex, xmlEndIndex);
    } else {
      throw new Error('Valid XML not found in the generated content');
    }

    if (!generatedContent.includes('<xml') || !generatedContent.includes('</xml>')) {
      throw new Error(JSON.stringify({ message: 'Generated content is not a valid XML' }));
    }

    /*
    for (const block of generatedContent.split('<block type="')) {
      if (!validBlocks.some(validBlock => block.includes(validBlock))) {
        generatedContent = generatedContent.replace(`<block type="${block}`, '');
      }
    }
    */

    return new Response(JSON.stringify({ generatedContent: generatedContent }) , {
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
