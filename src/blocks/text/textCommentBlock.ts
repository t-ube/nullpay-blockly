import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const code_multi_line_comment : any = {
  "type": "code_multi_line_comment",
  "message0": "multi line comment %1",
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
    code_multi_line_comment
  ]);

  javascriptGenerator.forBlock['code_multi_line_comment'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CONTENT');
    const code = `/*
    ${statement}
    */`;
    return code;
  };
};
