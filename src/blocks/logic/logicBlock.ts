import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';


export const logic_undefined : any = {
  "type": "undefined",
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

  javascriptGenerator.forBlock['undefined'] = function (block, generator) {
    return ['undefined', Order.ATOMIC];
  };
};
  
export const logic_null : any = {
  "type": "null",
  "message0": "null",
  "output": null,
  "colour": BlockColors.logic,
  "tooltip": "Returns the null value.",
  "helpUrl": ""
};

export const defineNullBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    logic_null
  ]);

  javascriptGenerator.forBlock['null'] = function (block, generator) {
    return ['null', Order.ATOMIC];
  };
};

export const logic_true : any = {
  "type": "true",
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

  javascriptGenerator.forBlock['true'] = function (block, generator) {
    return ['true', Order.ATOMIC];
  };
};

export const logic_false : any = {
  "type": "false",
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

  javascriptGenerator.forBlock['false'] = function (block, generator) {
    return ['false', Order.ATOMIC];
  };
};
