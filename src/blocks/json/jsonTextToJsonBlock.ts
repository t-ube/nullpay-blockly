import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

export const defineJsonTextToJsonBlock = () => {
    Blockly.Blocks['text_to_json'] = {
        init: function () {
        this.appendValueInput("TEXT")
            .setCheck('String')
            .appendField("text to JSON");
        this.setOutput(true, 'String');
        this.setColour(BlockColors.json);
        this.setTooltip('Convert a plain text to a JSON string');
        this.setHelpUrl('');
        }
    };

    javascriptGenerator.forBlock['text_to_json'] = function (block, generator) {
        const textInput = generator.valueToCode(block, 'TEXT', Order.ATOMIC) || '""';
        const code = `JSON.parse(${textInput})`;
        return [code, Order.ATOMIC];
    };
};

export const defineJsonTextBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "json_text_block",
      "message0": "JSON %1",
      "args0": [
        {
          "type": "field_input",
          "name": "INPUT",
          "text": ""
        }
      ],
      "output": blockCheckType.json,
      "colour": BlockColors.json,
      "tooltip": "Convert a plain text to a JSON",
      "helpUrl": ""
    }
  ]);
  
  javascriptGenerator.forBlock['json_text_block'] = function(block, generator) {
    var input = block.getFieldValue('INPUT');
    var code = `xrplJsonText('${input}')`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterJsonText(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplJsonText');
  const wrapper = function (jsonText:string) {
    try {
      const json = JSON.parse(jsonText);
      return interpreter.nativeToPseudo(json);
    } catch (error) {
      console.error(`Failed to parse json: ${jsonText}`);
      return interpreter.nativeToPseudo({});
    }
  };
  interpreter.setProperty(globalObject, 'xrplJsonText', interpreter.createNativeFunction(wrapper));
}
