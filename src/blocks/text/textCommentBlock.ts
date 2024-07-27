import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const text_block_comment : any = {
  "type": "text_block_comment",
  "message0": "block comment %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "CONTENT"
    }
  ],
  "colour": BlockColors.text,
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
};

export const defineTextBlockCommentBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    text_block_comment
  ]);

  javascriptGenerator.forBlock['text_block_comment'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CONTENT');
    const code = `/*
    ${statement}
    */`;
    return code;
  };
};
