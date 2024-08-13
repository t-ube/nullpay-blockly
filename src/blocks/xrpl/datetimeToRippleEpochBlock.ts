import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { dayjs } from '@/blocks/time/field_datetime';


export const xrpl_datetime_to_ripple_epoch : any = {
  "type": "xrpl_datetime_to_ripple_epoch",
  "message0": "time to Ripple epoch %1",
  "args0": [
    {
      "type": "input_value",
      "name": "DATE",
      "check": "DATETIME"
    }
  ],
  "output": "String",
  "colour": BlockColors.xrpl,
  "tooltip": "Convert a Date object to a string in the Ripple epoch time",
  "helpUrl": ""
};

export const defineDateTimeToRippleEpoch = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_datetime_to_ripple_epoch
  ]);

  javascriptGenerator.forBlock['xrpl_datetime_to_ripple_epoch'] = function (block, generator) {
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


export const xrpl_ripple_epoch_to_datetime : any = {
  "type": "xrpl_ripple_epoch_to_datetime",
  "message0": "Ripple epoch to time %1",
  "args0": [
    {
      "type": "input_value",
      "name": "RIPPLE_EPOCH_TIME",
      "check": "String"
    }
  ],
  "output": "DATETIME",
  "colour": BlockColors.xrpl,
  "tooltip": "Convert a Ripple epoch time string to a Date object",
  "helpUrl": ""
};

export const defineRippleEpochToDateTime = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_ripple_epoch_to_datetime
  ]);

  javascriptGenerator.forBlock['xrpl_ripple_epoch_to_datetime'] = function (block, generator) {
    const epochInput = generator.valueToCode(block, 'RIPPLE_EPOCH_TIME', Order.ATOMIC) || '0';
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
