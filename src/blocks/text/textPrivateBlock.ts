import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

export const defineTextOnetimeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "text_onetime_block",
      "message0": "one-time text %1",
      "args0": [
        {
          "type": "field_input",
          "name": "TEXT",
          "text": ""
        }
      ],
      "output": blockCheckType.string,
      "colour": BlockColors.text,
      "tooltip": "Enter a one-time use string. The string will not be saved.",
      "helpUrl": ""
    }
  ]);
  
  javascriptGenerator.forBlock['text_onetime_block'] = function(block, generator) {
    var input = block.getFieldValue('TEXT');
    var code = `"${input}"`;
    return [code, Order.ATOMIC];
  };
};
