import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { blockCheckType } from '@/blocks/BlockField';
import { getBlockSuccess, getBlockError } from '@/blocks/BlockResult';

// XRPL nft_buy_offers command
export const xrpl_clio_nft_info : any = {
  "type": "xrpl_clio_nft_info",
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
      "name": "CLIENT",
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
      "name": "STATUS",
      "variable": "status"
    },
    {
      "type": "field_variable",
      "name": "RESPONSE",
      "variable": "response"
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
    xrpl_clio_nft_info
  ]);

  javascriptGenerator.forBlock['xrpl_clio_nft_info'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const nftID = generator.valueToCode(block, 'NFT_ID', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplClioNftInfo(${client}, ${nftID}, '', '');\n`;
    }
    const status = generator.nameDB_.getName(block.getFieldValue('STATUS'), Blockly.VARIABLE_CATEGORY_NAME);
    const response = generator.nameDB_.getName(block.getFieldValue('RESPONSE'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplClioNftInfo(${client}, ${nftID}, '${status}', '${response}');\n`;
    return code;
  };
};

export function initInterpreterXrplClioNftInfo(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplClioNftInfo');
  const wrapper = async function (clientKey:string, nftID:string, statusVar:any, responseVar:any, callback:any) {
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
        interpreter.setProperty(globalObject, statusVar, interpreter.nativeToPseudo(getBlockSuccess()));
        interpreter.setProperty(globalObject, responseVar, interpreter.nativeToPseudo(transaction.result));
        callback();
        return;
      }
    } catch (error) {
      const message = 'Failed to get transaction';
      console.error(`${message}:`, error);
      interpreter.setProperty(globalObject, statusVar, interpreter.nativeToPseudo(getBlockError(message)));
    }
    callback();
  };
  interpreter.setProperty(globalObject, 'xrplClioNftInfo', interpreter.createAsyncFunction(wrapper));
}

/* Web API 
export const defineXrplClioNftInfoBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_clio_nft_info",
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
          "text": "Clio URL",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "CLIO_URL",
          "check": blockCheckType.string
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
          "name": "STATUS",
          "variable": "status"
        },
        {
          "type": "field_variable",
          "name": "RESPONSE",
          "variable": "response"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.xrpl,
      "tooltip": "Get information about an NFT on the XRP Ledger using the Clio API service. Requires an XRPL client connection and NFT ID as inputs",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_clio_nft_info'] = function (block, generator) {
    const clioUrl = generator.valueToCode(block, 'CLIO_URL', Order.ATOMIC) || '"https://s1.ripple.com:51234/"';
    const nftID = generator.valueToCode(block, 'NFT_ID', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplClioNftInfo(${clioUrl}, ${nftID}, '', '');\n`;
    }
    const status = generator.nameDB_.getName(block.getFieldValue('STATUS'), Blockly.VARIABLE_CATEGORY_NAME);
    const response = generator.nameDB_.getName(block.getFieldValue('RESPONSE'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplClioNftInfo(${clioUrl}, ${nftID}, '${status}', '${response}');\n`;
    return code;
  };
};


export function initInterpreterXrplClioNftInfo(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplClioNftInfo');
  const wrapper = async function (clioUrl:string, nftID:string, statusVar:any, responseVar:any, callback:any) {
    try {
      const dataPayload = getClioRequest(
        clioUrl,
        {
          method: "nft_info",
          params: [
            {
              nft_id: nftID,
            },
          ],
        }
      );
      const payload = {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataPayload)
      };
      const response = await fetch('/api/proxy/', payload);
      const responseJson = await response.json();
      interpreter.setProperty(globalObject, statusVar, interpreter.nativeToPseudo(getBlockSuccess()));
      interpreter.setProperty(globalObject, responseVar, interpreter.nativeToPseudo(responseJson));
      callback();
    } catch (error) {
      const message = 'Failed to get transaction';
      console.error(`${message}:`, error);
      interpreter.setProperty(globalObject, statusVar, interpreter.nativeToPseudo(getBlockError(message)));
    }
    callback();
  };
  interpreter.setProperty(globalObject, 'xrplClioNftInfo', interpreter.createAsyncFunction(wrapper));
}
*/
