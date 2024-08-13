import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineWaitForSecondsBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "wait_seconds",
      "message0": "wait for %1 seconds",
      "args0": [
        {
          "type": "input_value",
          "name": "SECONDS",
          "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.control,
      "tooltip": "Waits for the specified amount of seconds",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['wait_seconds'] = function (block, generator) {
    const time = generator.valueToCode(block, 'SECONDS', Order.ATOMIC) || '1000';
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