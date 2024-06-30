import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineTextOnetimeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "text_onetime_block",
      "message0": "One-time text %1",
      "args0": [
        {
          "type": "field_input",
          "name": "INPUT",
          "text": ""
        }
      ],
      "output": "String",
      "colour": BlockColors.text,
      "tooltip": "Enter a one-time use string. The string will not be saved.",
      "helpUrl": ""
    }
  ]);
  
  javascriptGenerator.forBlock['text_onetime_block'] = function(block, generator) {
    var input = block.getFieldValue('INPUT');
    var code = `"${input}"`;
    return [code, Order.ATOMIC];
  };
};
