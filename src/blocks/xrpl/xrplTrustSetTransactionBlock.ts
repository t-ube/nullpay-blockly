import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { xrplToken } from '@/blocks/xrpl/xrplToken';

// Define the block for setting XRPL Trust set
export const defineXrplTrustSetTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_trust_set_txn",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Trust set transaction",
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
          "name": "TOKEN",
          "check": blockCheckType.xrplToken
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Address",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "ADDRESS",
          "check": "String"
        }
      ],
      "output": blockCheckType.xrplTxnPayload,
      "inputsInline": false,
      "colour": BlockColors.xrpl,
      "tooltip": "Create a trust line setting transaction for the XRPL",
      "helpUrl": ""
    }
  ]);

  // JavaScript code generator for the XRPL trust set block
  javascriptGenerator.forBlock['xrpl_trust_set_txn'] = function(block, generator) {
    const token = generator.valueToCode(block, 'TOKEN', Order.NONE) || {} as xrplToken;
    const address = generator.valueToCode(block, 'ADDRESS', Order.NONE) || '""';
    const code = `xrplTrustSetTxn(JSON.stringify(${token}),${address})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplTrustSetTxn(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplTrustSetTxn');
  const wrapper = function (tokenText: string, address: string) {
    console.log(tokenText);
    let token = JSON.parse(tokenText) as xrplToken;
    console.log(token);
    const transaction = {
      TransactionType: 'TrustSet',
      Account: address,
      LimitAmount: {
        issuer: token.issuer,
        currency: token.currency_code,
        value: token.total_supply
      }
    };
    return interpreter.nativeToPseudo(transaction);
  };
  interpreter.setProperty(globalObject, 'xrplTrustSetTxn', interpreter.createNativeFunction(wrapper));
}
