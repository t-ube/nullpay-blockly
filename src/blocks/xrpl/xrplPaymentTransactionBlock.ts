import { Transaction } from 'xrpl';
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { getXrplWallet } from '@/blocks/xrpl/xrplWalletBlock';
import { IXrplToken } from '@/interfaces/IXrplToken';
import { newTitleLabel, newArgsLabel, newOutputLabel, blockCheckType } from '@/blocks/BlockField';

/*
export const defineXrplPaymentBlock = () => {
  Blockly.Blocks['xrpl_payment'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("XRPL Payment");
      this.appendValueInput("SENDER")
        .setCheck('String')
        .appendField("Sender");
      this.appendValueInput("RECIPIENT")
        .setCheck('String')
        .appendField("Recipient");
      this.appendValueInput("AMOUNT")
        .setCheck('Number')
        .appendField("Amount (drops)");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Perform a payment');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_payment'] = function (block, generator) {
    const sender = generator.valueToCode(block, 'SENDER', Order.ATOMIC) || '""';
    const recipient = generator.valueToCode(block, 'RECIPIENT', Order.ATOMIC) || '""';
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '0';
    const code = `performPayment(${sender}, ${recipient}, ${amount});\n`;
    return code;
  };
};
*/
export const defineXrplPaymentTxnBlock = () => {
  Blockly.Blocks['xrpl_payment_transaction'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Payment transaction"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField(newArgsLabel("XRPL client"));
      this.appendValueInput("WALLET")
        .setCheck('String')
        .appendField(newArgsLabel("XRPL wallet"));
      this.appendValueInput("DESTINATION")
        .setCheck('String')
        .appendField(newArgsLabel("Destination address"));
      this.appendValueInput("AMOUNT")
        .setCheck('Number')
        .appendField(newArgsLabel("Amount (drops)"));
      this.appendValueInput("FLAG")
        .setCheck('Number')
        .appendField(newArgsLabel("Flag"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Transaction"))
        .appendField(new Blockly.FieldVariable("txJson"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Create a Payment Transaction JSON');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_payment_transaction'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const wallet = generator.valueToCode(block, 'WALLET', Order.ATOMIC) || '""';
    const destination = generator.valueToCode(block, 'DESTINATION', Order.ATOMIC) || '""';
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '0';
    const flag = generator.valueToCode(block, 'FLAG', Order.ATOMIC) || '0';
    if (generator.nameDB_ === undefined) {
      return `createPaymentTransaction(${client}, ${wallet}, ${destination}, ${amount}, ${flag}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
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
export const defineXrplPaymentTokenTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_payment_token_txn",
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
    }
  ]);

  // JavaScript code generator for Payment XRPL Token
  javascriptGenerator.forBlock['xrpl_payment_token_txn'] = function(block, generator) {
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
