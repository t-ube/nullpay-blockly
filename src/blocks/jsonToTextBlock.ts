import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

// JSONをTextに変換するブロックを定義する
export const defineJsonToTextBlock = () => {
  Blockly.Blocks['json_to_text'] = {
    init: function () {
      this.appendValueInput("JSON")
        .setCheck('String')
        .appendField("Convert JSON to text");
      this.setOutput(true, 'String');
      this.setColour(BlockColors.json);
      this.setTooltip('Convert a JSON string to a plain text');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['json_to_text'] = function (block, generator) {
    const jsonInput = generator.valueToCode(block, 'JSON', Order.ATOMIC) || '""';
    const code = `JSON.stringify(${jsonInput})`;
    return [code, Order.ATOMIC];
  };
};
