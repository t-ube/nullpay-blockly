import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { IXrplToken } from '@/interfaces/IXrplToken';
import { blockCheckType } from '@/blocks/BlockField';


// Define the block for Payment XRPL Token
export const xrpl_payload_payment_token : any = {
  "type": "xrpl_payload_payment_token",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Payment token payload",
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
      "text": "Account address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ACCOUNT_ADDRESS",
      "check": "String"
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Destination address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "DEST_ADDRESS",
      "check": "String"
    }
  ],
  "message4": "%1 %2",
  "args4": [
    {
      "type": "field_label",
      "text": "Token amount",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "output": blockCheckType.xrplTxnPayload,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Create a payment transaction on the XRPL",
  "helpUrl": ""
};

export const defineXrplPaymentTokenTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_payload_payment_token
  ]);

  // JavaScript code generator for Payment XRPL Token
  javascriptGenerator.forBlock['xrpl_payload_payment_token'] = function(block, generator) {
    const token = generator.valueToCode(block, 'TOKEN', Order.NONE) || {} as IXrplToken;
    const account = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.NONE) || '""';
    const dest = generator.valueToCode(block, 'DEST_ADDRESS', Order.NONE) || '""';
    const amount = generator.valueToCode(block, 'AMOUNT', Order.NONE) || 0;
    const code = `xrplPaymentTokenTxn(JSON.stringify(${token}),${account},${dest},String(${amount}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplPaymentTokenTxn(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplPaymentTokenTxn');
  const wrapper = function (tokenText: string, account: string, dest: string, amount: string) {
    let token = JSON.parse(tokenText) as IXrplToken;
    const payload = {
      TransactionType: 'Payment',
      Account: account,
      Destination: dest,
      Amount: {
        issuer: token.issuer,
        currency: token.currency_code,
        value: amount
      }
    };
    return interpreter.nativeToPseudo(payload);
  };
  interpreter.setProperty(globalObject, 'xrplPaymentTokenTxn', interpreter.createNativeFunction(wrapper));
}

// Define the block for Payment XRPL Token
export const xrpl_payload_payment : any = {
  "type": "xrpl_payload_payment",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Payment payload",
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
      "text": "Destination address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "DEST_ADDRESS",
      "check": "String"
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Amount (drops)",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "output": blockCheckType.xrplTxnPayload,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Create a payment transaction on the XRPL",
  "helpUrl": ""
};

export const defineXrplPaymentBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_payload_payment
  ]);

  // JavaScript code generator for Payment XRPL Token
  javascriptGenerator.forBlock['xrpl_payload_payment'] = function(block, generator) {
    const account = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.NONE) || '""';
    const dest = generator.valueToCode(block, 'DEST_ADDRESS', Order.NONE) || '""';
    const amount = generator.valueToCode(block, 'AMOUNT', Order.NONE) || 0;
    let code = `xrplPayment(${account},${dest},String(${amount}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplPayment(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplPayment');
  const wrapper = function (account: string, dest: string, amount: string) {
    const payload = {
      TransactionType: 'Payment',
      Account: account,
      Destination: dest,
      Amount: amount
    };
    return interpreter.nativeToPseudo(payload);
  };
  interpreter.setProperty(globalObject, 'xrplPayment', interpreter.createNativeFunction(wrapper));
}
