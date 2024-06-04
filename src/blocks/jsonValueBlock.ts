import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineJsonGetValueBlock = () => {
  Blockly.Blocks['json_get_value'] = {
    init: function () {
      this.appendValueInput("VAR")
        .setCheck(null)
        .appendField("Get value from");
      this.appendValueInput("KEY")
        .setCheck("String")
        .appendField("with key");
      this.setOutput(true, null);
      this.setColour(BlockColors.json);
      this.setTooltip('Get the value from a JSON object by key');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['json_get_value'] = function (block, generator) {
    const variable = generator.valueToCode(block, 'VAR', Order.ATOMIC) || '{}';
    const key = generator.valueToCode(block, 'KEY', Order.ATOMIC) || '""';
    const code = `${variable}[${key}]`;
    return [code, Order.NONE];
  };
};
