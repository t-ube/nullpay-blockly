import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineUndefinedBlock = () => {
  Blockly.Blocks['undefined'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("undefined");
      this.setOutput(true, null);
      this.setColour(BlockColors.logic);
      this.setTooltip('Returns undefined');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['undefined'] = function (block, generator) {
    return ['undefined', Order.ATOMIC];
  };
};
  
export const defineNullBlock = () => {
  Blockly.Blocks['null'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("null");
      this.setOutput(true, null);
      this.setColour(BlockColors.logic);
      this.setTooltip('Returns null');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['null'] = function (block, generator) {
    return ['null', Order.ATOMIC];
  };
};
