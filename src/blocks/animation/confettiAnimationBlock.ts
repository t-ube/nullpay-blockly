import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/blockColors';

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

export const defineConfettiAnimationBlock = () => {
  Blockly.Blocks['confetti_animation'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Confetti for")
        .appendField(new Blockly.FieldNumber(5, 0, Infinity, 1), "DURATION")
        .appendField("seconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.animation);
      this.setTooltip('Trigger confetti animation for a specified duration');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['confetti_animation'] = function (block, generator) {
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
