import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { dayjs } from '@/blocks/time/DateTimeField';

export const defineCompareDateTimeBlock = () => {
  Blockly.Blocks['compare_datetime'] = {
    init: function () {
      this.appendValueInput("DATETIME1")
        .setCheck('DATETIME')
        .appendField("compare time");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["<", "BEFORE"], 
          [">", "AFTER"], 
          ["=", "EQUAL"]
        ]), "COMPARISON");
      this.appendValueInput("DATETIME2")
        .setCheck('DATETIME')
      this.setOutput(true, 'Boolean');
      this.setColour(BlockColors.time);
      this.setTooltip('Compare two datetime objects');
      this.setHelpUrl('');
    }
  };

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
