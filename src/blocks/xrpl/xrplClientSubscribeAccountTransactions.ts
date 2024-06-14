import * as util from 'util';
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';

export const defineXrplClientSubscribeAccountTransactionsBlock = () => {
  Blockly.Blocks['xrpl_client_subscribe_account_transactions'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("Subscribe transactions", "bold-label"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField("XRPL client");
      this.appendValueInput("ACCOUNT")
        .setCheck('String')
        .appendField("XRPL Address");
      this.appendDummyInput()
        .appendField("Transaction info")
        .appendField(new Blockly.FieldVariable("transactionInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Subscribe to transactions for a specific account on XRPL');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_client_subscribe_account_transactions'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const account = generator.valueToCode(block, 'ACCOUNT', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplClientSubscribeAccountTransactions(${client}, ${account}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplClientSubscribeAccountTransactions(${client}, ${account}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplClientSubscribeAccountTransactions(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplClientSubscribeAccountTransactions');
  const wrapper = async function (clientKey:string, account:any, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.send({
        command: "subscribe",
        accounts: [account],
      });
      console.log(`Subscribed to account transactions: ${account}`);
      client.on('transaction', async (data:any) => {
        interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
      });
      callback();
    } catch (error) {
      console.error(`Failed to subscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplClientSubscribeAccountTransactions', interpreter.createAsyncFunction(wrapper));
}
