import { Transaction } from 'xrpl';
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { getXrplWallet } from '@/blocks/xrpl/xrplWalletBlock';
import { IXrplToken } from '@/interfaces/IXrplToken';
import { blockCheckType } from '@/blocks/BlockField';


export const xrpl_payment_transaction : any = {
  "type": "xrpl_payment_transaction",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Payment transaction",
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
      "check": "Client"
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "XRPL wallet ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "WALLET_ID",
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
      "name": "DESTINATION",
      "check": "String"
    }
  ],
  "message4": "%1 %2",
  "args4": [
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
  "message5": "%1 %2",
  "args5": [
    {
      "type": "field_label",
      "text": "Flag",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "FLAG",
      "check": "Number"
    }
  ],
  "message6": "%1 %2",
  "args6": [
    {
      "type": "field_label",
      "text": "Transaction",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "TX_JSON",
      "variable": "txJson"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Create a Payment Transaction JSON",
  "helpUrl": ""
};

export const defineXrplPaymentTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_payment_transaction
  ]);

  javascriptGenerator.forBlock['xrpl_payment_transaction'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const wallet = generator.valueToCode(block, 'WALLET_ID', Order.ATOMIC) || '""';
    const destination = generator.valueToCode(block, 'DESTINATION', Order.ATOMIC) || '""';
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '0';
    const flag = generator.valueToCode(block, 'FLAG', Order.ATOMIC) || '0';
    if (generator.nameDB_ === undefined) {
      return `createPaymentTransaction(${client}, ${wallet}, ${destination}, ${amount}, ${flag}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('TX_JSON'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `createPaymentTransaction(${client}, ${wallet}, ${destination}, ${amount}, ${flag}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplPaymentTxn(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('createPaymentTransaction');

  const wrapper = async function (clientKey:string, walletID: string, destination: string, amount: number, flag: number, variable: any, callback:any) {
    const client = getXrplClient(clientKey);
    if (!client) {
      throw new Error(`Client not found for ID: ${clientKey}`);
    }
    const wallet = getXrplWallet(walletID);
    if (!wallet) {
      throw new Error(`Wallet not found for ID: ${walletID}`);
    }
    const txnJSON : Transaction = {
      Account: wallet.address,
      TransactionType: "Payment",
      Destination: destination,
      Amount: amount.toString(),
      Flags: flag,
    };
    try {
      const payload = await client.autofill(txnJSON);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(payload));
      console.log('Transaction JSON:', JSON.stringify(payload));
      callback();
    } catch (error) {
      console.error('Failed to autofill transaction:', error);
      callback();
    }
  };

  interpreter.setProperty(globalObject, 'createPaymentTransaction', interpreter.createAsyncFunction(wrapper));
}


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
