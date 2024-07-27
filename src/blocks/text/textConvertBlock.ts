import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

export const text_to_uppercase : any = {
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
};

export const defineTextToUpperCaseBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    text_to_uppercase
  ]);

  javascriptGenerator.forBlock['text_to_uppercase'] = function(block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    const code = `${text}.toUpperCase()`;
    return [code, Order.ATOMIC];
  };
};

export const text_to_lowercase : any = {
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
};

export const defineTextToLowerCaseBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    text_to_lowercase
  ]);

  javascriptGenerator.forBlock['text_to_lowercase'] = function(block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    const code = `${text}.toLowerCase()`;
    return [code, Order.ATOMIC];
  };
};

export const number_to_text : any = {
  "type": "number_to_text",
  "message0": "text from number %1",
  "args0": [
    {
      "type": "input_value",
      "name": "NUMBER",
      "check": blockCheckType.number
    }
  ],
  "output": blockCheckType.string,
  "colour": BlockColors.text,
  "tooltip": "Convert number to text",
  "helpUrl": ""
};

export const defineNumberToTextBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    number_to_text
  ]);

  javascriptGenerator.forBlock['number_to_text'] = function (block, generator) {
    const number = generator.valueToCode(block, 'NUMBER', Order.ATOMIC) || '0';
    return [`String(${number})`, Order.ATOMIC];
  };
};

export const text_to_number : any = {
  "type": "text_to_number",
  "message0": "number from text %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TEXT",
      "check": blockCheckType.string
    }
  ],
  "output": blockCheckType.number,
  "colour": BlockColors.text,
  "tooltip": "Convert text to number",
  "helpUrl": ""
};

export const defineTextToNumberBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    text_to_number
  ]);

  javascriptGenerator.forBlock['text_to_number'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.ATOMIC) || '""';
    return [`Number(${text})`, Order.ATOMIC];
  };
};
