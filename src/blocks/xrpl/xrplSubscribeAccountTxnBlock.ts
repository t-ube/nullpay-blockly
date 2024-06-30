// xrplSubscribeAccountTxnBlock.ts
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient, setXrplClientEventListner, clearXrplClientEventListner } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';

export const defineXrplSubscribeAccountTxnBlock = () => {
  Blockly.Blocks['xrpl_subscribe_account_txn'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Subscribe account transactions"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField(newArgsLabel("XRPL client"));
      this.appendValueInput("ID")
        .setCheck('String')
        .appendField(newArgsLabel("Subscribe ID"));
      this.appendValueInput("ACCOUNTS")
        .setCheck('Array')
        .appendField(newArgsLabel("XRPL address list"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Transaction info"))
        .appendField(new Blockly.FieldVariable("transactionInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Subscribe to transactions for a specific account on XRPL');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_subscribe_account_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'ID', Order.ATOMIC) || '""';
    const accounts = generator.valueToCode(block, 'ACCOUNTS', Order.ATOMIC) || '[]';
    if (generator.nameDB_ === undefined) {
      return `xrplSubscribeAccountTxn(${client}, ${id}, JSON.stringify(${accounts}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplSubscribeAccountTxn(${client}, ${id}, JSON.stringify(${accounts}), '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplSubscribeAccountTxn(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplSubscribeAccountTxn');
  const wrapper = async function (clientKey:string, id:string, accounts:any, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        id: `${id}`,
        command: "subscribe",
        accounts: JSON.parse(accounts),
      });
      console.log(`Subscribed to accounts transactions: ${JSON.parse(accounts)}, ${JSON.stringify(result)}`);
      const listener = async (data: any) => {
        interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
      };
      setXrplClientEventListner(client, id, 'transaction', listener);
      callback();
    } catch (error) {
      console.error(`Failed to subscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplSubscribeAccountTxn', interpreter.createAsyncFunction(wrapper));
}

export const defineXrplUnsubscribeAccountTxnBlock = () => {
  Blockly.Blocks['xrpl_unsubscribe_account_txn'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Unsubscribe account transactions"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField(newArgsLabel("XRPL client"));
      this.appendValueInput("ID")
        .setCheck('String')
        .appendField(newArgsLabel("Subscribe ID"));
      this.appendValueInput("ACCOUNTS")
        .setCheck('Array')
        .appendField(newArgsLabel("XRPL address list"));
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Unsubscribe to transactions for a specific account on XRPL');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_unsubscribe_account_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'ID', Order.ATOMIC) || '""';
    const accounts = generator.valueToCode(block, 'ACCOUNTS', Order.ATOMIC) || '[]';
    const code = `xrplUnsubscribeAccountTxn(${client}, ${id}, JSON.stringify(${accounts}));\n`;
    return code;
  };
};

export function initInterpreterXrplUnsubscribeAccountTxn(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplUnsubscribeAccountTxn');
  const wrapper = async function (clientKey:string, id:string, accounts:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        id: `${id}`,
        command: "unsubscribe",
        accounts: JSON.parse(accounts),
      });
      console.log(`Unsubscribed to account transactions: ${JSON.parse(accounts)} , ${JSON.stringify(result)}`);
      clearXrplClientEventListner(client, id, 'transaction');
      callback();
    } catch (error) {
      console.error(`Failed to subscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplUnsubscribeAccountTxn', interpreter.createAsyncFunction(wrapper));
}
