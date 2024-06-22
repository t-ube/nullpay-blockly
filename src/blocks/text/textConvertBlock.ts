import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineTextToUpperCaseBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "text_to_uppercase",
      "message0": "to uppercase %1",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT",
          "check": "String"
        }
      ],
      "output": "String",
      "colour": BlockColors.text,
      "tooltip": "Converts a string to uppercase",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['text_to_uppercase'] = function(block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    const code = `${text}.toUpperCase()`;
    return [code, Order.ATOMIC];
  };
};

export const defineTextToLowerCaseBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "text_to_lowercase",
      "message0": "to lowercase %1",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT",
          "check": "String"
        }
      ],
      "output": "String",
      "colour": BlockColors.text,
      "tooltip": "Converts a string to lowercase",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['text_to_lowercase'] = function(block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    const code = `${text}.toLowerCase()`;
    return [code, Order.ATOMIC];
  };
};
