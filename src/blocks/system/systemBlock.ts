import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const fallback_statement_block : any = {
  "type": "fallback_statement_block",
  "message0": "Unknown block (statement): %1",
  "args0": [
    {
      "type": "field_input",
      "name": "BLOCK_NAME",
      "text": "block name"
    }
  ],
  "message1": "Inputs %1",
  "args1": [
    {
      "type": "input_statement",
      "name": "INPUTS"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.legacy,
  "tooltip": "Placeholder for an unknown statement block",
  "helpUrl": ""
};

const fallback_value_block = {
  "type": "fallback_value_block",
  "message0": "Unknown block (value): %1",
  "args0": [
    {
      "type": "field_input",
      "name": "BLOCK_NAME",
      "text": "block name"
    }
  ],
  "message1": "Input %1",
  "args1": [
    {
      "type": "input_value",
      "name": "INPUT"
    }
  ],
  "output": null,
  "colour": BlockColors.legacy,
  "tooltip": "Placeholder for an unknown value block",
  "helpUrl": ""
};

export const defineFallbackBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    fallback_statement_block,
    fallback_value_block
  ]);

  javascriptGenerator.forBlock['fallback_statement_block'] = function (block, generator) {
    const blockName = block.getFieldValue('BLOCK_NAME');
    const inputs = generator.statementToCode(block, 'INPUTS') || '';
    return `
    // Unknown statement block: ${blockName}
    // Inputs:
    ${inputs}
    `;
  };

  javascriptGenerator.forBlock['fallback_value_block'] = function (block, generator) {
    const blockName = block.getFieldValue('BLOCK_NAME');
    const input = generator.valueToCode(block, 'INPUT', Order.ATOMIC) || 'null';
    const code = `/* Unknown value block: ${blockName}, Input: ${input} */`;
    return [code, Order.NONE];

  };
};
