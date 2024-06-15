import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';

export const defineArrayAppendBlock = () => {
  Blockly.Blocks['array_append'] = {
    init: function () {
      this.appendValueInput("ARRAY")
        .setCheck("Array")
        .appendField("append to array");
      this.appendValueInput("ITEM")
        .setCheck(null)
        .appendField("item");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(260);
      this.setTooltip('Append an item to an array');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['array_append'] = function (block, generator) {
    const array = generator.valueToCode(block, 'ARRAY', Order.ATOMIC);
    const item = generator.valueToCode(block, 'ITEM', Order.ATOMIC);
    const code = `${array}.push(${item});\n`;
    return code;
  };
};
