import { AccountSetAsfFlags } from 'xrpl';
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

// Define the block for setting XRPL rippling
export const xrpl_rippling_txn : any = {
  "type": "xrpl_rippling_txn",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_label",
      "text": "Rippling payload"
    },
    {
      "type": "field_dropdown",
      "name": "RIPPLING",
      "options": [
        ["Enable", "ENABLE"],
        ["Disable", "DISABLE"]
      ]
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
      "name": "ADDRESS",
      "check": "String"
    }
  ],
  "output": blockCheckType.xrplTxnPayload,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Sets the rippling flag for the specified account",
  "helpUrl": ""
};

export const defineXrplRipplingTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_rippling_txn
  ]);

  // JavaScript code generator for the XRPL rippling block
  javascriptGenerator.forBlock['xrpl_rippling_txn'] = function(block, generator) {
    const rippling = block.getFieldValue('RIPPLING');
    const address = generator.valueToCode(block, 'ADDRESS', Order.NONE) || '""';
    const code = `xrplRipplingTxn(${rippling === 'ENABLE' ? 'true' : 'false'},${address})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplRipplingTxn(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplRipplingTxn');
  const wrapper = function (rippling: boolean, address: string) {
    let transaction = {};
    if (rippling === true) {
      transaction = {
        TransactionType: 'AccountSet',
        Account: address,
        SetFlag: AccountSetAsfFlags.asfDefaultRipple
      };
    } else {
      transaction = {
        TransactionType: 'AccountSet',
        Account: address,
        ClearFlag: AccountSetAsfFlags.asfDefaultRipple
      }; 
    }
    return interpreter.nativeToPseudo(transaction);
  };
  interpreter.setProperty(globalObject, 'xrplRipplingTxn', interpreter.createNativeFunction(wrapper));
}
