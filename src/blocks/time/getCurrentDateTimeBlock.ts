import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { dayjs } from '@/blocks/time/DateTimeField';


export const defineCurrentDateTimeBlock = () => {
  Blockly.Blocks['current_datetime'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("current time");
      this.setOutput(true, 'DATETIME');
      this.setColour(BlockColors.time);
      this.setTooltip('Get the current date and time in the specified timezone or Ripple Epoch Time');
      this.setHelpUrl('');
    },
  };

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
