import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { dayjs } from '@/blocks/time/field_datetime';

export const defineDateTimeToRippleEpoch = () => {
  Blockly.Blocks['datetime_to_ripple_epoch'] = {
    init: function () {
      this.appendValueInput("DATE")
        .setCheck('DATETIME')
        .appendField("time to Ripple epoch");
      this.setOutput(true, 'String');
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Convert a Date object to a string in the Ripple epoch time');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['datetime_to_ripple_epoch'] = function (block, generator) {
    const dateInput = generator.valueToCode(block, 'DATE', Order.ATOMIC) || 'new Date()';
    const code = `datetimeToRippleEpoch(${dateInput})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterDateTimeToRippleEpoch(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('datetimeToRippleEpoch');
  const wrapper = function (dateInput:any, callback:any) {
    const rippleEpoch = dayjs('2000-01-01T00:00:00Z');
    callback(Math.floor(dayjs.tz(dateInput,'UTC').diff(rippleEpoch, 'second')));
  };
  interpreter.setProperty(globalObject, 'datetimeToRippleEpoch', interpreter.createAsyncFunction(wrapper));
}

export const defineRippleEpochToDateTime = () => {
  Blockly.Blocks['ripple_epoch_to_datetime'] = {
    init: function () {
      this.appendValueInput("EPOCHTIME")
        .setCheck('String')
        .appendField("Ripple epoch to time");
      this.setOutput(true, 'DATETIME');
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Convert a Ripple epoch time string to a Date object');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['ripple_epoch_to_datetime'] = function (block, generator) {
    const epochInput = generator.valueToCode(block, 'EPOCHTIME', Order.ATOMIC) || '0';
    const code = `rippleEpochToDateTime(${epochInput})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterRippleEpochToDateTime(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('rippleEpochToDateTime');
  const wrapper = function (epochInput:any, callback:any) {
    const rippleEpoch = dayjs('2000-01-01T00:00:00Z');
    callback(dayjs.tz(rippleEpoch,'UTC').add(epochInput, 'second'));
  };
  interpreter.setProperty(globalObject, 'rippleEpochToDateTime', interpreter.createAsyncFunction(wrapper));
}
