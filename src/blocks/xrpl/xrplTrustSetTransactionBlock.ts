import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { IXrplToken } from '@/interfaces/IXrplToken';
import { findTokenTotalSupply } from '@/blocks/xrpl/xrplToken';

// Define the block for setting XRPL Trust set
export const xrpl_payload_trustline_config : any = {
  "type": "xrpl_payload_trustline_config",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Trust set payload",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Token",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "CURRECY_CODE_AND_ISSUER_AND_SUPPLY",
      "check": blockCheckType.xrplToken
    }
  ],
  "message2": "%1 %2",
  "args2": [
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
  "output": blockCheckType.xrplTxnPayload,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Create a trust line setting transaction for the XRPL",
  "helpUrl": ""
};

export const defineXrplTrustSetTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_payload_trustline_config
  ]);

  // JavaScript code generator for the XRPL trust set block
  javascriptGenerator.forBlock['xrpl_payload_trustline_config'] = function(block, generator) {
    const token = generator.valueToCode(block, 'CURRECY_CODE_AND_ISSUER_AND_SUPPLY', Order.NONE) || {} as IXrplToken;
    const address = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.NONE) || '""';
    const code = `xrplTrustSetTxn(JSON.stringify(${token}),${address})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplTrustSetTxn(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplTrustSetTxn');
  const wrapper = function (tokenText: string, address: string) {
    let token = JSON.parse(tokenText) as IXrplToken;
    const totalSupply = findTokenTotalSupply(token.currency_code, token.issuer);
    const transaction = {
      TransactionType: 'TrustSet',
      Account: address,
      LimitAmount: {
        issuer: token.issuer,
        currency: token.currency_code,
        value: totalSupply ? totalSupply : token.total_supply
      }
    };
    console.log(transaction);
    return interpreter.nativeToPseudo(transaction);
  };
  interpreter.setProperty(globalObject, 'xrplTrustSetTxn', interpreter.createNativeFunction(wrapper));
}
