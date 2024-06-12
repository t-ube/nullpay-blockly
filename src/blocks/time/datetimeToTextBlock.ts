import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/blockColors';
import { dayjs } from '@/blocks/time/DateTimeField';

export const defineDatedatetimeToTextBlock = () => {
  Blockly.Blocks['datetime_to_text'] = {
    init: function () {
      this.appendValueInput("DATETIME")
        .setCheck('DATETIME')
        .appendField("time to text");
      this.appendValueInput("TIMEZONE")
        .setCheck('String')
        .appendField("timezone");
      this.appendValueInput("FORMAT")
        .setCheck('String')
        .appendField("time format");
      this.setOutput(true, 'String');
      this.setColour(BlockColors.time);
      this.setTooltip('Convert a Date object to a string in the specified timezone');
      this.setHelpUrl('');
    }
  };

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
