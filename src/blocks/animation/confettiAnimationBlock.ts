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
      "name": "DURATION_SECONDS",
      "value": 5,
      "min": 0,
      "max": "Infinity",
      "precision": 1
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Wait for Completion",
      "class": "args-label"
    },
    {
      "type": "field_checkbox",
      "name": "WAIT_FOR_COMPLETION",
      "checked": false
    }
  ],
  "inputsInline": false,
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
    const duration = block.getFieldValue('DURATION_SECONDS');
    const waitForCompletion = block.getFieldValue('WAIT_FOR_COMPLETION') === 'TRUE';
    const code = `confettiAnimation(${duration},${waitForCompletion});\n`;
    return code;
  };
};

export function initInterpreterConfettiAnimationFunctions(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('confettiAnimation');
  const wrapper = function (duration: any, waitForCompletion: boolean, callback: any) {
    confettiAnimation(duration);
    if (waitForCompletion) {
      setTimeout(callback, duration * 1000);
    } else {
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'confettiAnimation', interpreter.createAsyncFunction(wrapper));
}
