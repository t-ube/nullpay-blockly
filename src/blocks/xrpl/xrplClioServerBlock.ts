import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { blockCheckType } from '@/blocks/BlockField';
import { getBlockSuccess, getBlockError } from '@/blocks/BlockResult';

// XRPL nft_buy_offers command
export const xrpl_command_get_nft_info : any = {
  "type": "xrpl_command_get_nft_info",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Get NFT info",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "XRPL client (Requiered Clio)",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "XRPL_CLIENT",
      "check": blockCheckType.xrplClient
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "NFT ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "NFT_ID",
      "check": blockCheckType.string
    }
  ],
  "message3": "%1 %2 %3",
  "args3": [
    {
      "type": "field_label",
      "text": "Result",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "IS_ERROR",
      "variable": "isError"
    },
    {
      "type": "field_variable",
      "name": "NFT_INFO",
      "variable": "nftInfo"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Get information about an NFT on the XRP Ledger using the Clio API service. Requires an XRPL client connection and NFT ID as inputs",
  "helpUrl": ""
};

export const defineXrplClioNftInfoBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_get_nft_info
  ]);

  javascriptGenerator.forBlock['xrpl_command_get_nft_info'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const nftID = generator.valueToCode(block, 'NFT_ID', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplClioNftInfo(${client}, ${nftID}, '', '');\n`;
    }
    const isError = generator.nameDB_.getName(block.getFieldValue('IS_ERROR'), Blockly.VARIABLE_CATEGORY_NAME);
    const response = generator.nameDB_.getName(block.getFieldValue('NFT_INFO'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplClioNftInfo(${client}, ${nftID}, '${isError}', '${response}');\n`;
    return code;
  };
};

export function initInterpreterXrplClioNftInfo(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplClioNftInfo');
  const wrapper = async function (clientKey:string, nftID:string, isErrorVar:any, responseVar:any, callback:any) {
    try {
      const client = getXrplClient(clientKey);
      if (!client) {
        throw new Error(`Client not found for ID: ${clientKey}`);
      }
      const transaction = await client.request({
        command: 'nft_info',
        nft_id: nftID
      });
      if (transaction.result) {
        interpreter.setProperty(globalObject, isErrorVar, false);
        interpreter.setProperty(globalObject, responseVar, interpreter.nativeToPseudo(transaction.result));
        callback();
        return;
      }
    } catch (error) {
      const message = 'Failed to get transaction';
      console.error(`${message}:`, error);
      interpreter.setProperty(globalObject, isErrorVar, true);
    }
    callback();
  };
  interpreter.setProperty(globalObject, 'xrplClioNftInfo', interpreter.createAsyncFunction(wrapper));
}
