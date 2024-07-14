import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { IXrplToken } from '@/interfaces/IXrplToken';

// Define the block for BuyOffer
export const defineBuyTokenOfferTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_buy_token_offer_txn",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Buy token offer payload",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Account address",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "ACCOUNT_ADDRESS",
          "check": "String"
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Token",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "TOKEN",
          "check": blockCheckType.xrplToken
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Token amount",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "TOKEN_AMOUNT",
          "check": blockCheckType.number
        }
      ],
      "message4": "%1 %2",
      "args4": [
        {
          "type": "field_label",
          "text": "XRP amount (drops)",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "XRP_AMOUNT",
          "check": blockCheckType.number
        }
      ],
      "output": blockCheckType.xrplTxnPayload,
      "inputsInline": false,
      "colour": BlockColors.xrpl,
      "tooltip": "Create a buy offer for tokens on the XRPL DEX",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_buy_token_offer_txn'] = function(block, generator) {
    const account = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.NONE) || '""';
    const token = generator.valueToCode(block, 'TOKEN', Order.NONE) || {} as IXrplToken;
    const tokenAmount = generator.valueToCode(block, 'TOKEN_AMOUNT', Order.NONE) || 0;
    const xrpAmount = generator.valueToCode(block, 'XRP_AMOUNT', Order.NONE) || 0;
    const code = `xrplBuyTokenOfferTxn(${account}, JSON.stringify(${token}), String(${tokenAmount}), String(${xrpAmount}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterBuyTokenOfferTxn(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplBuyTokenOfferTxn');
  const wrapper = function(account: string, tokenText: string, tokenAmount: string, xrpAmount: string) {
    let token = JSON.parse(tokenText) as IXrplToken;
    const transaction = {
      TransactionType: 'OfferCreate',
      Account: account,
      TakerGets: xrpAmount,
      TakerPays: {
        currency: token.currency_code,
        issuer: token.issuer,
        value: tokenAmount
      }
    };
    return interpreter.nativeToPseudo(transaction);
  };
  interpreter.setProperty(globalObject, 'xrplBuyTokenOfferTxn', interpreter.createNativeFunction(wrapper));
}

// Define the block for SaleOffer
export const defineSaleTokenOfferTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_sale_token_offer_txn",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Sale token offer payload",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Account address",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "ACCOUNT_ADDRESS",
          "check": "String"
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Token",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "TOKEN",
          "check": blockCheckType.xrplToken
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Token amount",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "TOKEN_AMOUNT",
          "check": blockCheckType.number
        }
      ],
      "message4": "%1 %2",
      "args4": [
        {
          "type": "field_label",
          "text": "XRP amount (drops)",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "XRP_AMOUNT",
          "check": blockCheckType.number
        }
      ],
      "output": blockCheckType.xrplTxnPayload,
      "inputsInline": false,
      "colour": BlockColors.xrpl,
      "tooltip": "Create a sale offer for tokens on the XRPL DEX",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_sale_token_offer_txn'] = function(block, generator) {
    const account = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.NONE) || '""';
    const token = generator.valueToCode(block, 'TOKEN', Order.NONE) || {} as IXrplToken;
    const tokenAmount = generator.valueToCode(block, 'TOKEN_AMOUNT', Order.NONE) || 0;
    const xrpAmount = generator.valueToCode(block, 'XRP_AMOUNT', Order.NONE) || 0;
    const code = `xrplSaleTokenOfferTxn(${account}, JSON.stringify(${token}), String(${tokenAmount}), String(${xrpAmount}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterSaleTokenOfferTxn(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplSaleTokenOfferTxn');
  const wrapper = function(account: string, tokenText: string, tokenAmount: string, xrpAmount: string) {
    let token = JSON.parse(tokenText) as IXrplToken;
    const transaction = {
      TransactionType: 'OfferCreate',
      Account: account,
      TakerGets: {
        currency: token.currency_code,
        issuer: token.issuer,
        value: tokenAmount
      },
      TakerPays: xrpAmount
    };
    return interpreter.nativeToPseudo(transaction);
  };
  interpreter.setProperty(globalObject, 'xrplSaleTokenOfferTxn', interpreter.createNativeFunction(wrapper));
}
