import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient } from './xrplClientInitializeBlock';
import { getXrplWallet } from './xrplWalletBlock';
import { Transaction } from 'xrpl';

export const defineXrplPaymentTxnBlock = () => {
  Blockly.Blocks['xrpl_payment_transaction'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("Payment transaction", "bold-label"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField("XRPL client");
      this.appendValueInput("WALLET")
        .setCheck('String')
        .appendField("XRPL wallet");
      this.appendValueInput("DESTINATION")
        .setCheck('String')
        .appendField("Destination address");
      this.appendValueInput("AMOUNT")
        .setCheck('Number')
        .appendField("Amount (drops)");
      this.appendValueInput("FLAG")
        .setCheck('Number')
        .appendField("Flag");
      this.appendDummyInput()
        .appendField("Transaction")
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
