import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';

export const defineXrplClientSubscribeStreamsTxnsBlock = () => {
  Blockly.Blocks['xrpl_subscribe_streams'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("Subscribe streams", "bold-label"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField("XRPL client");
      this.appendValueInput("STREAMS")
        .setCheck('Array')
        .appendField("Streams");
      this.appendDummyInput()
        .appendField("Transaction info")
        .appendField(new Blockly.FieldVariable("transactionInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Subscribe to transactions for XRPL streams');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_subscribe_streams'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const streams = generator.valueToCode(block, 'STREAMS', Order.ATOMIC) || '[]';
    if (generator.nameDB_ === undefined) {
      return `xrplClientSubscribeStreamsTxns(${client}, JSON.stringify(${streams}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplClientSubscribeStreamsTxns(${client}, JSON.stringify(${streams}), '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplClientSubscribeStreamsTxns(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplClientSubscribeStreamsTxns');
  const wrapper = async function (clientKey:string, streams:any, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.send({
        command: "subscribe",
        accounts: JSON.parse(streams),
      });
      console.log(`Subscribed to streams: ${streams}`);
      client.on('transaction', async (data:any) => {
        interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
      });
      callback();
    } catch (error) {
      console.error(`Failed to subscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplClientSubscribeStreamsTxns', interpreter.createAsyncFunction(wrapper));
}
