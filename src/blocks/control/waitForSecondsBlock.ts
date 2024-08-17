import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

export const controls_wait_seconds : any = {
  "type": "controls_wait_seconds",
  "message0": "wait for %1 seconds",
  "args0": [
    {
      "type": "input_value",
      "name": "SECONDS",
      "check": blockCheckType.number
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.control,
  "tooltip": "Waits for the specified amount of seconds",
  "helpUrl": ""
};

export const defineWaitForSecondsBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    controls_wait_seconds
  ]);

  javascriptGenerator.forBlock['controls_wait_seconds'] = function (block, generator) {
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

export const controls_wait_until_datetime : any = {
  "type": "controls_wait_until_datetime",
  "message0": "wait until %1",
  "args0": [
    {
      "type": "input_value",
      "name": "DATETIME",
      "check": blockCheckType.datetime
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.control,
  "tooltip": "Waits until the specified date and time",
  "helpUrl": ""
};

export const defineWaitUntilDatetimeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    controls_wait_until_datetime
  ]);

  javascriptGenerator.forBlock['controls_wait_until_datetime'] = function(block, generator) {
    const datetime = generator.valueToCode(block, 'DATETIME', Order.ATOMIC) || 'new Date()';
    const code = `waitUntilDatetime(${datetime});\n`;
    return code;
  };
};

export function initInterpreterWaitUntilDatetime(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('waitUntilDatetime');
  const wrapper = async function(targetDatetime: any, callback: any) {
    const targetDate = new Date(targetDatetime);
    const checkAndWait = () => {
      const now = new Date();
      if (now < targetDate) {
        setTimeout(checkAndWait, 100); // Check every 100ms
      } else {
        callback();
      }
    };
    checkAndWait();
  };
  interpreter.setProperty(globalObject, 'waitUntilDatetime', interpreter.createAsyncFunction(wrapper));
}
