import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient, setXrplClientEventListner } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';

export const defineXrplClientSubscribeStreamsTxnsBlock = () => {
  Blockly.Blocks['xrpl_client_subscribe_streams_transactions'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Subscribe streams"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField(newArgsLabel("XRPL client"));
      this.appendValueInput("ID")
        .setCheck('String')
        .appendField(newArgsLabel("Subscribe ID"));
      this.appendValueInput("STREAMS")
        .setCheck('Array')
        .appendField(newArgsLabel("Streams"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Transaction info"))
        .appendField(new Blockly.FieldVariable("transactionInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Subscribe to transactions for XRPL streams');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_client_subscribe_streams_transactions'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'ID', Order.ATOMIC) || '""';
    const streams = generator.valueToCode(block, 'STREAMS', Order.ATOMIC) || '[]';
    if (generator.nameDB_ === undefined) {
      return `xrplClientSubscribeStreamsTxns(${client}, ${id}, JSON.stringify(${streams}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplClientSubscribeStreamsTxns(${client}, ${id}, JSON.stringify(${streams}), '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplClientSubscribeStreamsTxns(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplClientSubscribeStreamsTxns');
  const wrapper = async function (clientKey:string, id:string, streams:any, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        id: `${id}`,
        command: "subscribe",
        accounts: JSON.parse(streams),
      });
      console.log(`Subscribed to streams: ${streams}, ${JSON.stringify(result)}`);
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
  interpreter.setProperty(globalObject, 'xrplClientSubscribeStreamsTxns', interpreter.createAsyncFunction(wrapper));
}
