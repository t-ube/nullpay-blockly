import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { dayjs, timezoneMenu, FieldTimeWithSeconds } from '@/blocks/time/DateTimeField';
import { FieldDate } from '@blockly/field-date';

export const defineCreateDateTimeBlock = () => {
  Blockly.Blocks['create_datetime'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("date")
        .appendField(new FieldDate(formatDateToYYYYMMDD(new Date())), 'DATE');
      this.appendDummyInput()
        .appendField("time")
        .appendField(new FieldTimeWithSeconds('00:00:00'), 'TIME');
      this.appendDummyInput()
        .appendField("timezone")
        .appendField(new Blockly.FieldDropdown(timezoneMenu), "TIMEZONE");
      this.setOutput(true, 'DATETIME');
      this.setColour(BlockColors.time);
      this.setTooltip('Get the current date and time in the specified timezone or Ripple Epoch Time');
      this.setHelpUrl('');
    }
  };

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
