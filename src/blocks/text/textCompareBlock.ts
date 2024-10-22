import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineTextStartsWithBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "text_starts_with",
      "message0": "%1 starts with %2",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT",
          "check": "String"
        },
        {
          "type": "input_value",
          "name": "PREFIX",
          "check": "String"
        }
      ],
      "inputsInline": true,
      "output": "Boolean",
      "colour": BlockColors.text,
      "tooltip": "Checks if a text starts with a prefix",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['text_starts_with'] = function(block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    const prefix = generator.valueToCode(block, 'PREFIX', Order.NONE) || '""';
    const code = `textStartsWith(${text},${prefix})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterTextStartsWith(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('textStartsWith');
  const wrapper = function (str: string, suffix: string) {
    return str.startsWith(suffix);
  };
  interpreter.setProperty(globalObject, 'textStartsWith', interpreter.createNativeFunction(wrapper));
}

export const defineTextEndsWithBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "text_ends_with",
      "message0": "%1 ends with %2",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT",
          "check": "String"
        },
        {
          "type": "input_value",
          "name": "SUFFIX",
          "check": "String"
        }
      ],
      "inputsInline": true,
      "output": "Boolean",
      "colour": BlockColors.text,
      "tooltip": "Checks if a text ends with a suffix",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['text_ends_with'] = function(block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    const suffix = generator.valueToCode(block, 'SUFFIX', Order.NONE) || '""';
    const code = `textEndsWith(${text},${suffix})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterTextEndsWith(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('textEndsWith');
  const wrapper = function (str: string, suffix: string) {
    return str.endsWith(suffix);
  };
  interpreter.setProperty(globalObject, 'textEndsWith', interpreter.createNativeFunction(wrapper));
}

export const defineTextContainsBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "text_contains",
      "message0": "%1 contains %2",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT",
          "check": "String"
        },
        {
          "type": "input_value",
          "name": "SUBSTRING",
          "check": "String"
        }
      ],
      "inputsInline": true,
      "output": "Boolean",
      "colour": BlockColors.text,
      "tooltip": "Checks if a text contains a substring",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['text_contains'] = function(block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || '""';
    const substring = generator.valueToCode(block, 'SUBSTRING', Order.NONE) || '""';
    const code = `textContains(${text},${substring})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterTextContains(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('textContains');
  const wrapper = function (str: string, substring: string) {
    return str.includes(substring);
  };
  interpreter.setProperty(globalObject, 'textContains', interpreter.createNativeFunction(wrapper));
}
