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
      this.setTooltip('Returns the undefined value.');
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
      this.setTooltip('Returns the null value.');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['null'] = function (block, generator) {
    return ['null', Order.ATOMIC];
  };
};

export const defineTrueBlock = () => {
  Blockly.Blocks['true'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("true");
      this.setOutput(true, null);
      this.setColour(BlockColors.logic);
      this.setTooltip('Returns the boolean value true.');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['true'] = function (block, generator) {
    return ['true', Order.ATOMIC];
  };
};

export const defineFalseBlock = () => {
  Blockly.Blocks['false'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("false");
      this.setOutput(true, null);
      this.setColour(BlockColors.logic);
      this.setTooltip('Returns the boolean value false.');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['false'] = function (block, generator) {
    return ['false', Order.ATOMIC];
  };
};

