import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient, setXrplClientEventListner, clearXrplClientEventListner } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';

export const defineXrplSubscribeAllTxnBlock = () => {
  Blockly.Blocks['xrpl_subscribe_all_txn'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Subscribe all transactions"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField(newArgsLabel("XRPL client"));
      this.appendValueInput("ID")
        .setCheck('String')
        .appendField(newArgsLabel("Subscribe ID"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Transaction info"))
        .appendField(new Blockly.FieldVariable("transactionInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Subscribes to all transactions on the XRPL and stores transaction info in the specified variable.');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_subscribe_all_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'ID', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplSubscribeAllTxn(${client}, ${id}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplSubscribeAllTxn(${client}, ${id}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplSubscribeAllTxn(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplSubscribeAllTxn');
  const wrapper = async function (clientKey:string, id:string, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        id: `${id}`,
        command: "subscribe",
        streams: ["transactions"],
      });
      console.log(`Subscribed to streams: ${JSON.stringify(result)}`);
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
  interpreter.setProperty(globalObject, 'xrplSubscribeAllTxn', interpreter.createAsyncFunction(wrapper));
}

export const defineXrplUnsubscribeAllTxnBlock = () => {
  Blockly.Blocks['xrpl_unsubscribe_all_txn'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Unsubscribe all transactions"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField(newArgsLabel("XRPL client"));
      this.appendValueInput("ID")
        .setCheck('String')
        .appendField(newArgsLabel("Subscribe ID"));
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Unsubscribes from all transactions on the XRPL for the specified client and subscribe ID.');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_unsubscribe_all_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'ID', Order.ATOMIC) || '""';
    const code = `xrplUnsubscribeAllTxn(${client}, ${id});\n`;
    return code;
  };
};

export function initInterpreterXrplUnsubscribeAllTxn(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplUnsubscribeAllTxn');
  const wrapper = async function (clientKey:string, id:string, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        id: `${id}`,
        command: "unsubscribe",
        streams: ["transactions"],
      });
      clearXrplClientEventListner(client, id, 'transaction');
      callback();
    } catch (error) {
      console.error(`Failed to unsubscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplUnsubscribeAllTxn', interpreter.createAsyncFunction(wrapper));
}
