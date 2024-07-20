import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineUndefinedBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "undefined",
      "message0": "undefined",
      "output": null,
      "colour": BlockColors.logic,
      "tooltip": "Returns the undefined value.",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['undefined'] = function (block, generator) {
    return ['undefined', Order.ATOMIC];
  };
};
  
export const defineNullBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "null",
      "message0": "null",
      "output": null,
      "colour": BlockColors.logic,
      "tooltip": "Returns the null value.",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['null'] = function (block, generator) {
    return ['null', Order.ATOMIC];
  };
};

export const defineTrueBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "true",
      "message0": "true",
      "output": null,
      "colour": BlockColors.logic,
      "tooltip": "Returns the boolean value true.",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['true'] = function (block, generator) {
    return ['true', Order.ATOMIC];
  };
};

export const defineFalseBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "false",
      "message0": "false",
      "output": null,
      "colour": BlockColors.logic,
      "tooltip": "Returns the boolean value false.",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['false'] = function (block, generator) {
    return ['false', Order.ATOMIC];
  };
};
