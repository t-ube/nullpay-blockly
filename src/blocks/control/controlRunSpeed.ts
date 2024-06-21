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
  Blockly.Blocks['control_run_speed'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("run speed")
        .appendField(new Blockly.FieldNumber(1, 1, 1000, 1), "SPEED")
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.control);
      this.setTooltip('Set the execution speed');
      this.setHelpUrl('');
    }
  };

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
