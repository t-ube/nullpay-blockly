import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { dayjs, FieldTime, timezoneMenu, FieldTimeWithSeconds } from '@/blocks/time/field_datetime';
import { FieldDate } from '@blockly/field-date';

Blockly.fieldRegistry.register('field_date', FieldDate);
Blockly.fieldRegistry.register('field_time', FieldTime);
Blockly.fieldRegistry.register('field_time_with_seconds', FieldTimeWithSeconds);

export const defineCurrentDateTimeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "current_datetime",
      "message0": "current time",
      "output": "DATETIME",
      "colour": BlockColors.time,
      "tooltip": "Get the current date and time",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['current_datetime'] = function (block) {
    const code = `getCurrentDateTime()`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterCurrentDateTime(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('getCurrentDateTime');
  const wrapper = function (callback:any) {
    callback(dayjs().tz('UTC').toDate());
  };
  interpreter.setProperty(globalObject, 'getCurrentDateTime', interpreter.createAsyncFunction(wrapper));
}

export const defineCreateDateTimeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "create_datetime",
      "message0": "date %1",
      "args0": [
        {
          "type": "field_date",
          "name": "DATE",
          "date": formatDateToYYYYMMDD(new Date())
        }
      ],
      "message1": "time %1",
      "args1": [
        {
          "type": "field_time_with_seconds",
          "name": "TIME",
          "time": "00:00:00"
        }
      ],
      "message2": "timezone %1",
      "args2": [
        {
          "type": "field_dropdown",
          "name": "TIMEZONE",
          "options": timezoneMenu
        }
      ],
      "output": "DATETIME",
      "colour": BlockColors.time,
      "tooltip": "Get the current date and time in the specified timezone or Ripple Epoch Time",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['create_datetime'] = function (block, generator) {
    const dateInput = block.getFieldValue('DATE') || formatDateToYYYYMMDD(new Date());
    const timeInput = block.getFieldValue('TIME') || '00:00:00';
    const timezone = block.getFieldValue('TIMEZONE') || 'UTC';
    const datetime = `${dateInput}T${timeInput}`;
    const code = `createDateTime("${datetime}", "${timezone}")`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterCreateDateTime(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('createDateTime');
  const wrapper = function (dateInput:any, timezone:any, callback:any) {
      callback(dayjs.tz(dateInput,timezone).toDate());
  };
  interpreter.setProperty(globalObject, 'createDateTime', interpreter.createAsyncFunction(wrapper));
}

function formatDateToYYYYMMDD(date:Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const defineAdjustDateTimeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "adjust_datetime",
      "message0": "adjust time %1 %2 by %3 %4",
      "args0": [
        {
          "type": "input_value",
          "name": "DATETIME",
          "check": "DATETIME"
        },
        {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [
            ["after", "ADD"],
            ["before", "SUBTRACT"]
          ]
        },
        {
          "type": "input_value",
          "name": "AMOUNT",
          "check": "Number"
        },
        {
          "type": "field_dropdown",
          "name": "UNIT",
          "options": [
            ["seconds", "seconds"],
            ["minutes", "minutes"],
            ["hours", "hours"],
            ["days", "days"],
            ["years", "years"]
          ]
        }
      ],
      "output": "DATETIME",
      "colour": BlockColors.time,
      "tooltip": "Adjust the datetime by a specified amount",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['adjust_datetime'] = function (block) {
    const datetime = javascriptGenerator.valueToCode(block, 'DATETIME', Order.ATOMIC) || 'new Date()';
    const direction = block.getFieldValue('DIRECTION') === 'ADD' ? 'add' : 'subtract';
    const amount = javascriptGenerator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '0';
    const unit = block.getFieldValue('UNIT');
    const code = `adjustDateTime(${datetime}, "${direction}", ${amount}, "${unit}")`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterAdjustDateTime(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('adjustDateTime');
  const wrapper = function (datetime:string, direction: string, amount:number, unit:dayjs.ManipulateType | undefined, callback:any) {
    let result = dayjs(datetime);
    if (direction === 'add') {
      result = result.add(amount, unit);
    } else {
      result = result.subtract(amount, unit);
    }
    callback(result.toDate());
  };
  interpreter.setProperty(globalObject, 'adjustDateTime', interpreter.createAsyncFunction(wrapper));
}

export const defineCompareDateTimeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "compare_datetime",
      "message0": "compare time %1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "DATETIME1",
          "check": "DATETIME"
        },
        {
          "type": "field_dropdown",
          "name": "COMPARISON",
          "options": [
            ["<", "BEFORE"],
            [">", "AFTER"],
            ["=", "EQUAL"]
          ]
        },
        {
          "type": "input_value",
          "name": "DATETIME2",
          "check": "DATETIME"
        }
      ],
      "inputsInline": true,
      "output": "Boolean",
      "colour": BlockColors.time,
      "tooltip": "Compare two datetime objects",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['compare_datetime'] = function (block, generator) {
    const datetime1 = generator.valueToCode(block, 'DATETIME1', Order.ATOMIC) || 'new Date()';
    const datetime2 = generator.valueToCode(block, 'DATETIME2', Order.ATOMIC) || 'new Date()';
    const comparison = block.getFieldValue('COMPARISON');
    let code = `compareDateTime(${datetime1},${datetime2},"${comparison}")`
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterCompareDateTime(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('compareDateTime');
  const wrapper = function (datetime1:string, datetime2:string, comparison:string, callback:any) {
    let result;
    switch (comparison) {
      case 'BEFORE':
        result = dayjs(datetime1).isBefore(dayjs(datetime2));
        break;
      case 'AFTER':
        result = dayjs(datetime1).isAfter(dayjs(datetime2));
        break;
      case 'EQUAL':
        result = dayjs(datetime1).isSame(dayjs(datetime2));
        break;
      default:
        result = false;
    }
    callback(result);
  };
  interpreter.setProperty(globalObject, 'compareDateTime', interpreter.createAsyncFunction(wrapper));
}

export const defineDateTimeTextFormatBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "datetime_text_format",
      "message0": "time format %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "FORMAT",
          "options": [
            ["YYYY-MM-DD", "YYYY-MM-DD"], 
            ["MM/DD/YYYY", "MM/DD/YYYY"],
            ["DD/MM/YYYY", "DD/MM/YYYY"],
            ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss"],
            ["HH:mm:ss", "HH:mm:ss"],
            ["MMMM D, YYYY", "MMMM D, YYYY"],
            ["ddd, MMM D, YYYY", "ddd, MMM D, YYYY"],
            ["YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DDTHH:mm:ssZ"]
          ]
        }
      ],
      "output": "String",
      "colour": BlockColors.time,
      "tooltip": "Format a Date object to a string",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['datetime_text_format'] = function (block, generator) {
    const format = block.getFieldValue('FORMAT') || 'YYYY-MM-DD HH:mm:ss';
    const code = `"${format}"`;
    return [code, Order.ATOMIC];
  };
};

export const defineTimezoneBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "timezone_block",
      "message0": "timezone %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TIMEZONE",
          "options": timezoneMenu
        }
      ],
      "output": "String",
      "colour": BlockColors.time,
      "tooltip": "Format a Date object to a string",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['timezone_block'] = function (block, generator) {
    const timezone = block.getFieldValue('TIMEZONE') || 'UTC';
    const code = `"${timezone}"`;
    return [code, Order.ATOMIC];
  };
};

export const defineDatedatetimeToTextBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "datetime_to_text",
      "message0": "time to text %1",
      "args0": [
        {
          "type": "input_value",
          "name": "DATETIME",
          "check": "DATETIME"
        }
      ],
      "message1": "timezone %1",
      "args1": [
        {
          "type": "input_value",
          "name": "TIMEZONE",
          "check": "String"
        }
      ],
      "message2": "format %1",
      "args2": [
        {
          "type": "input_value",
          "name": "FORMAT",
          "check": "String"
        }
      ],
      "output": "String",
      "colour": BlockColors.time,
      "tooltip": "Convert a Date object to a string in the specified timezone",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['datetime_to_text'] = function (block, generator) {
    const datetime = javascriptGenerator.valueToCode(block, 'DATETIME', Order.ATOMIC) || 'new Date()';
    const timezone = javascriptGenerator.valueToCode(block, 'TIMEZONE', Order.ATOMIC) || '"UTC"';
    const format = javascriptGenerator.valueToCode(block, 'FORMAT', Order.ATOMIC) || '"YYYY-MM-DD HH:mm:ss"';
    const code = `datetimeToText(${datetime}, ${timezone}, ${format})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterDatedatetimeToText(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('datetimeToText');
  const wrapper = function (dateInput:any, timezone:any, format:any, callback:any) {
    callback(dayjs.tz(dateInput,timezone).format(format));
  };
  interpreter.setProperty(globalObject, 'datetimeToText', interpreter.createAsyncFunction(wrapper));
}
