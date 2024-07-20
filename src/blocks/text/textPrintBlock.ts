import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import * as util from 'util';

export const defineTextUtilInspectPrintBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "text_util_inspect_print",
      "message0": "inspect and print %1",
      "args0": [
        {
          "type": "input_value",
          "name": "OBJECT",
          "check": null
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.text,
      "tooltip": "Inspect an object and print its structure to the console using util.inspect",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['text_util_inspect_print'] = function (block, generator) {
    const object = generator.valueToCode(block, 'OBJECT', Order.NONE) || 'null';
    const code = `textUtilInspectPrint(${object});\n`;
    return code;
  };
};

export function initInterpreterTextUtilInspectPrint(interpreter: any, globalObject: any, logArea:HTMLTextAreaElement) {
  javascriptGenerator.addReservedWords('textUtilInspectPrint');
  const wrapper = function (object: any) {
    if (logArea) {
      logArea.value += `\n${util.inspect(object, { showHidden: false, depth: null, colors: false })}`;
    }
  };
  interpreter.setProperty(globalObject, 'textUtilInspectPrint', interpreter.createNativeFunction(wrapper));
}
