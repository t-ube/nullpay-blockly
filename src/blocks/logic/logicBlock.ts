import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';


export const logic_undefined : any = {
  "type": "logic_undefined",
  "message0": "undefined",
  "output": null,
  "colour": BlockColors.logic,
  "tooltip": "Returns the undefined value.",
  "helpUrl": ""
};

export const defineUndefinedBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    logic_undefined
  ]);

  javascriptGenerator.forBlock['logic_undefined'] = function (block, generator) {
    return ['logic_undefined', Order.ATOMIC];
  };
};

export const logic_true : any = {
  "type": "logic_true",
  "message0": "true",
  "output": null,
  "colour": BlockColors.logic,
  "tooltip": "Returns the boolean value true.",
  "helpUrl": ""
};

export const defineTrueBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    logic_true
  ]);

  javascriptGenerator.forBlock['logic_true'] = function (block, generator) {
    return ['true', Order.ATOMIC];
  };
};

export const logic_false : any = {
  "type": "logic_false",
  "message0": "false",
  "output": null,
  "colour": BlockColors.logic,
  "tooltip": "Returns the boolean value false.",
  "helpUrl": ""
};

export const defineFalseBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    logic_false
  ]);

  javascriptGenerator.forBlock['logic_false'] = function (block, generator) {
    return ['false', Order.ATOMIC];
  };
};
