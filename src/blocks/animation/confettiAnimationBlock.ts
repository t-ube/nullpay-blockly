import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

type TriggerRewardFunction = (duration: number) => void;
let confettiAnimationFunction: TriggerRewardFunction | null = null;

export const setConfettiAnimationFunction = (fn: TriggerRewardFunction) => {
  confettiAnimationFunction = fn;
};

export const confettiAnimation = (duration: number) => {
  if (confettiAnimationFunction) {
    confettiAnimationFunction(duration);
  } else {
    console.warn('confettiAnimationFunction is not set.');
  }
};

export const animation_confetti : any = {
  "type": "animation_confetti",
  "message0": "Confetti for %1 seconds",
  "args0": [
    {
      "type": "field_number",
      "name": "DURATION",
      "value": 5,
      "min": 0,
      "max": "Infinity",
      "precision": 1
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.animation,
  "tooltip": "Trigger confetti animation for a specified duration",
  "helpUrl": ""
};

export const defineConfettiAnimationBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    animation_confetti
  ]);

  javascriptGenerator.forBlock['animation_confetti'] = function (block, generator) {
    const duration = block.getFieldValue('DURATION');
    const code = `confettiAnimation(${duration});\n`;
    return code;
  };
};

export function initInterpreterConfettiAnimationFunctions(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('confettiAnimation');
  const wrapper = interpreter.createAsyncFunction(
    function (duration: any, callback: any) {
      confettiAnimation(duration);
      setTimeout(callback, duration * 1000);
    },
  );
  interpreter.setProperty(globalObject, 'confettiAnimation', wrapper);
}
