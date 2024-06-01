import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';

export const defineNumberToTextBlock = () => {
  Blockly.Blocks['number_to_text'] = {
    init: function () {
      this.appendValueInput("NUMBER")
        .setCheck('Number')
        .appendField("text from number");
      this.setOutput(true, 'String');
      this.setColour('%{BKY_TEXTS_HUE}');
      this.setTooltip('Convert number to text');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['number_to_text'] = function (block, generator) {
    const number = generator.valueToCode(block, 'NUMBER', Order.ATOMIC) || '0';
    return [`String(${number})`, Order.ATOMIC];
  };
};
