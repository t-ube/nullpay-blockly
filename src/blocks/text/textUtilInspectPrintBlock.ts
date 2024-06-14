import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import * as util from 'util';

export const defineTextUtilInspectPrintBlock = () => {
  Blockly.Blocks['text_util_inspect_print'] = {
    init: function () {
      this.appendValueInput("OBJECT")
        .setCheck(null)
        .appendField("Inspect and print");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.text);
      this.setTooltip('Inspect and print an object using util.inspect');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['text_util_inspect_print'] = function (block, generator) {
    const object = generator.valueToCode(block, 'OBJECT', Order.NONE) || 'null';
    const code = `textUtilInspectPrint(${object});\n`;
    return code;
  };
};

export function initInterpreterTextUtilInspectPrint(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('textUtilInspectPrint');
  const wrapper = function (object: any) {
    console.log(util.inspect(object, { showHidden: false, depth: null, colors: true }));
  };
  interpreter.setProperty(globalObject, 'textUtilInspectPrint', interpreter.createNativeFunction(wrapper));
}
