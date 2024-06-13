import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { dayjs } from '@/blocks/time/DateTimeField';

export const defineAdjustDateTimeBlock = () => {
  Blockly.Blocks['adjust_datetime'] = {
    init: function () {
      this.appendValueInput("DATETIME")
        .setCheck('DATETIME')
        .appendField("adjust time");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["after", "ADD"], 
          ["before", "SUBTRACT"]
        ]), "DIRECTION");
      this.appendValueInput("AMOUNT")
        .setCheck('Number')
        .appendField("by");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["seconds", "seconds"], 
          ["minutes", "minutes"], 
          ["hours", "hours"], 
          ["days", "days"], 
          ["years", "years"]
        ]), "UNIT");
      this.setOutput(true, 'DATETIME');
      this.setColour(BlockColors.time);
      this.setTooltip('Adjust the datetime by a specified amount');
      this.setHelpUrl('');
    }
  };

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
