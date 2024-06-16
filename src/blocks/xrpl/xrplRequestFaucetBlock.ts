import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';

export const defineXrplRequestFaucetBlock = () => {
  Blockly.Blocks['xrpl_request_faucet'] = {
    init: function () {
      this.appendDummyInput()
      .appendField(newTitleLabel("Request faucet"));
      this.appendValueInput("CONNECTION")
        .setCheck('String')
        .appendField(newArgsLabel("Faucet URI"))
      this.appendValueInput("ADDRESS")
        .setCheck('String')
        .appendField(newArgsLabel("Destination address"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Faucet info"))
        .appendField(new Blockly.FieldVariable("faucetInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Request Faucet for the specified XRPL address and amount');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_request_faucet'] = function (block, generator) {
    const address = generator.valueToCode(block, 'ADDRESS', Order.ATOMIC) || '""';
    const connection = generator.valueToCode(block, 'CONNECTION', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplRequestFaucet(${address}, ${connection}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplRequestFaucet(${address}, ${connection}, '${variable}');\n`;
    return code;
  };
};
  
export function initInterpreterXrplRequestFaucet(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplRequestFaucet');
  const wrapper = async function (address:any, connection:any, variable:any, callback:any) {
    try {
      const response = await fetch(connection, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ destination: address })
      });
      const data = await response.json();
      console.log('Faucet request successful:', data);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
      callback();
    } catch (error) {
      console.error('Error requesting Faucet:', error);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplRequestFaucet', interpreter.createAsyncFunction(wrapper));
}
