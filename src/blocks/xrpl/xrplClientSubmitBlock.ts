// xrplClientSubmitBlock.ts
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';

export const defineXrplClientSubmitBlock = () => {
  Blockly.Blocks['xrpl_client_submit'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("Submit", "bold-label"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField("XRPL client");
      this.appendValueInput("BLOB")
        .setCheck('String')
        .appendField("Transaction BLOB");
      this.appendDummyInput()
        .appendField("Result")
        .appendField(new Blockly.FieldVariable("result"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Submit to transaction');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_client_submit'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const blob = generator.valueToCode(block, 'BLOB', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplClientSubmit(${client}, ${blob}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplClientSubmit(${client}, ${blob}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplClientSubmit(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplClientSubmit');
  const wrapper = async function (clientKey:string, blob:string, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        command: "submit",
        tx_blob: blob,
      });
      console.log(`Submit transactions: ${JSON.stringify(result)}`);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(result));
      callback();
    } catch (error) {
      console.error(`Failed to subscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplClientSubmit', interpreter.createAsyncFunction(wrapper));
}
