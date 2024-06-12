import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';

export const defineTextToNumberBlock = () => {
  Blockly.Blocks['text_to_number'] = {
    init: function () {
      this.appendValueInput("TEXT")
        .setCheck('String')
        .appendField("number from text");
      this.setOutput(true, 'Number');
      this.setColour('%{BKY_TEXTS_HUE}');
      this.setTooltip('Convert text to number');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['text_to_number'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.ATOMIC) || '""';
    return [`Number(${text})`, Order.ATOMIC];
  };
};
