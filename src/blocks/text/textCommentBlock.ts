import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineTextBlockCommentBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "text_block_comment",
      "message0": Blockly.Msg.BKY_TEXT_BLOCK_COMMENT_TITLE,
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
    }
  ]);

  javascriptGenerator.forBlock['text_block_comment'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CONTENT');
    const code = `/*
    ${statement}
    */`;
    return code;
  };
};
