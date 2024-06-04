import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineWaitForSecondsBlock = () => {
  Blockly.Blocks['wait_seconds'] = {
    init: function () {
      this.appendValueInput("TIME")
        .setCheck("Number")
        .appendField("wait for");
      this.appendDummyInput()
        .appendField("seconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.control);
      this.setTooltip('Waits for the specified amount of seconds');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['wait_seconds'] = function (block, generator) {
    const time = generator.valueToCode(block, 'TIME', Order.ATOMIC) || '1000';
    const code = `waitForSeconds(${time});\n`;
    return code;
  };
};

export function initInterpreterWaitForSeconds(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('waitForSeconds');
  const wrapper = interpreter.createAsyncFunction(
    function (timeInSeconds:any, callback:any) {
      // Delay the call to the callback.
      setTimeout(callback, timeInSeconds * 1000);
    },
  );
  interpreter.setProperty(globalObject, 'waitForSeconds', wrapper);
}