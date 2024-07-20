// control/controlRunBlock.ts
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

type TriggerRunSpeedFunction = (speed: number) => void;
let controlRunSpeedFunction: TriggerRunSpeedFunction | null = null;

export const setControlRunSpeedFunction = (fn: TriggerRunSpeedFunction) => {
  controlRunSpeedFunction = fn;
};

export const controlRunSpeed = (speed: number) => {
  if (controlRunSpeedFunction) {
    controlRunSpeedFunction(speed);
  } else {
    console.warn('controlRunSpeedFunction is not set.');
  }
};

export const defineControlRunSpeedBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "control_run_speed",
      "message0": "run speed %1",
      "args0": [
        {
          "type": "field_number",
          "name": "SPEED",
          "value": 1,
          "min": 1,
          "max": 1000,
          "precision": 1
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.control,
      "tooltip": "Set the program execution speed (1-1000)",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['control_run_speed'] = function (block, generator) {
    const speed = block.getFieldValue('SPEED');
    const code = `controlRunSpeed(${speed});\n`;
    return code;
  };
};

export function initInterpreterControlRunSpeed(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('controlRunSpeed');
  const wrapper = async function (speed:number, callback:any) {
    controlRunSpeed(speed);
    callback();
  };
  interpreter.setProperty(globalObject, 'controlRunSpeed', interpreter.createAsyncFunction(wrapper));
}
