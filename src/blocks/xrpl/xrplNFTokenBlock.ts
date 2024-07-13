import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

export const defineNFTokenBuyOfferBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_nftoken_buy_offer",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "NFT buy offer payload",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Owner address",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "OWNER_ID",
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
          "name": "TOKEN_ID",
          "check": blockCheckType.string
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Amount",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "AMOUNT",
          "check": [blockCheckType.xrplTokenAmount, blockCheckType.number]
        }
      ],
      "message4": "%1 %2",
      "args4": [
        {
          "type": "field_label",
          "text": "Expiration (Ripple epoch)",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "EXPIRATION",
          "check": null
        }
      ],
      "message5": "%1 %2",
      "args5": [
        {
          "type": "field_label",
          "text": "Destination address",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "DESTINATION",
          "check": null
        }
      ],
      "output": blockCheckType.xrplTxnPayload,
      "inputsInline": false,
      "colour": BlockColors.xrpl,
      "tooltip": "Create an NFT buy offer payload with the specified token details and offer amount",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_nftoken_buy_offer'] = function(block, generator) {
    const ownerID = generator.valueToCode(block, 'OWNER_ID', Order.NONE) || '""';
    const tokenID = generator.valueToCode(block, 'TOKEN_ID', Order.NONE) || '""';
    const amount = generator.valueToCode(block, 'AMOUNT', Order.NONE) || '"0"';
    const expiration = generator.valueToCode(block, 'EXPIRATION', Order.NONE) || 'null';
    const destination = generator.valueToCode(block, 'DESTINATION', Order.NONE) || '""';
    const code = `xrplNftokenBuyOffer(${ownerID},${tokenID},JSON.stringify(${amount}),${expiration},${destination})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplNftokenBuyOffer(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplNftokenBuyOffer');
  const wrapper = function (ownerID: string, tokenID: string, amountText: string, expiration: number, destination: string) {
    let payload : any = {};

    try {
      const amount = JSON.parse(amountText);
      
      payload = {
        TransactionType: 'NFTokenCreateOffer',
        Owner: ownerID,
        NFTokenID: tokenID,
        Amount: typeof amount === 'number' ? String(amount) : amount
      };

      if (expiration !== null) {
        payload.Expiration = expiration;
      }
      if (destination.length > 0) {
        payload.Destination = destination;
      }
      
      return interpreter.nativeToPseudo(payload);
    } catch (error) {
      console.error(`Failed to parse json: ${amountText}`);
    }
  };
  interpreter.setProperty(globalObject, 'xrplNftokenBuyOffer', interpreter.createNativeFunction(wrapper));
}
