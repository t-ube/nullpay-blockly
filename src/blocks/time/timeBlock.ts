import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { dayjs, FieldTime, timezoneMenu, FieldTimeWithSeconds } from '@/blocks/time/field_datetime';
import { FieldDate } from '@blockly/field-date';

Blockly.fieldRegistry.register('field_date', FieldDate);
Blockly.fieldRegistry.register('field_time', FieldTime);
Blockly.fieldRegistry.register('field_time_with_seconds', FieldTimeWithSeconds);

export const datetime_current : any = {
  "type": "datetime_current",
  "message0": "current time",
  "output": "DATETIME",
  "colour": BlockColors.time,
  "tooltip": "Get the current date and time",
  "helpUrl": ""
};

export const defineCurrentDateTimeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    datetime_current
  ]);

  javascriptGenerator.forBlock['datetime_current'] = function (block) {
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


function formatDateToYYYYMMDD(date:Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Dummy
export const datetime_create : any = {
  "type": "datetime_create",
  "message0": "date %1",
  "args0": [
    {
      "type": "field_date",
      "name": "DATE",
      "date": "2024-01-01"
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
};

export const defineCreateDateTimeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "datetime_create",
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

  javascriptGenerator.forBlock['datetime_create'] = function (block, generator) {
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


export const datetime_adjust : any = {
  "type": "datetime_adjust",
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
};

export const defineAdjustDateTimeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    datetime_adjust
  ]);

  javascriptGenerator.forBlock['datetime_adjust'] = function (block) {
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


export const datetime_compare : any = {
  "type": "datetime_compare",
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
};

export const defineCompareDateTimeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    datetime_compare
  ]);

  javascriptGenerator.forBlock['datetime_compare'] = function (block, generator) {
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


export const datetime_text_format : any = {
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
};

export const defineDateTimeTextFormatBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    datetime_text_format
  ]);

  javascriptGenerator.forBlock['datetime_text_format'] = function (block, generator) {
    const format = block.getFieldValue('FORMAT') || 'YYYY-MM-DD HH:mm:ss';
    const code = `"${format}"`;
    return [code, Order.ATOMIC];
  };
};


export const datetime_timezone : any = {
  "type": "datetime_timezone",
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
};

export const defineTimezoneBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    datetime_timezone
  ]);

  javascriptGenerator.forBlock['datetime_timezone'] = function (block, generator) {
    const timezone = block.getFieldValue('TIMEZONE') || 'UTC';
    const code = `"${timezone}"`;
    return [code, Order.ATOMIC];
  };
};


export const datetime_to_text : any = {
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
};

export const defineDatedatetimeToTextBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    datetime_to_text
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
