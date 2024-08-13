import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { blockCheckType } from '@/blocks/BlockField';
import { getBlockSuccess, getBlockError } from '@/blocks/BlockResult';


// XRPL nft_buy_offers command
export const xrpl_command_nft_buy_offers : any = {
  "type": "xrpl_command_nft_buy_offers",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Get NFT buy offers",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "XRPL client",
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
      "name": "NFT_BUY_OFFERS",
      "variable": "nftBuyOffers"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Get the current buy offers for a specific NFT on the XRPL. Requires an XRPL client connection and NFT ID as inputs.",
  "helpUrl": ""
};

export const defineXrplNftBuyOffersCommandBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_nft_buy_offers
  ]);

  javascriptGenerator.forBlock['xrpl_command_nft_buy_offers'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const nftID = generator.valueToCode(block, 'NFT_ID', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplNftBuyOffersCommand(${client}, ${nftID}, '', '');\n`;
    }
    const isError = generator.nameDB_.getName(block.getFieldValue('IS_ERROR'), Blockly.VARIABLE_CATEGORY_NAME);
    const response = generator.nameDB_.getName(block.getFieldValue('NFT_BUY_OFFERS'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplNftBuyOffersCommand(${client}, ${nftID}, '${isError}', '${response}');\n`;
    return code;
  };
};

export function initInterpreterXrplNftBuyOffersCommand(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplNftBuyOffersCommand');
  const wrapper = async function (clientKey:string, nftID:string, isErrorVar:any, responseVar:any, callback:any) {
    try {
      const client = getXrplClient(clientKey);
      if (!client) {
        throw new Error(`Client not found for ID: ${clientKey}`);
      }
      const transaction = await client.request({
        command: 'nft_buy_offers',
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
  interpreter.setProperty(globalObject, 'xrplNftBuyOffersCommand', interpreter.createAsyncFunction(wrapper));
}
