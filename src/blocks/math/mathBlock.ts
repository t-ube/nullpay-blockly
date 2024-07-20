import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

export const definePercentageBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "percentage",
      "message0": "%1 % of %2",
      "args0": [
        {
          "type": "input_value",
          "name": "PERCENTAGE",
          "check": blockCheckType.number
        },
        {
          "type": "input_value",
          "name": "VALUE",
          "check": blockCheckType.number
        }
      ],
      "inputsInline": true,
      "output": blockCheckType.number,
      "colour": BlockColors.math,
      "tooltip": "Calculate percentage of a value",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['percentage'] = function (block, generator) {
    const percentage = generator.valueToCode(block, 'PERCENTAGE', Order.ATOMIC) || '0';
    const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC) || '0';
    const code = `${value} * (${percentage} / 100)`;
    return [code, Order.MULTIPLICATION];
  };
};
