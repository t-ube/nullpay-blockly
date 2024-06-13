import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { timezoneMenu } from '@/blocks/time/DateTimeField';

export const defineTimezoneBlock = () => {
  Blockly.Blocks['timezone_block'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("timezone")
        .appendField(new Blockly.FieldDropdown(timezoneMenu), "TIMEZONE");
      this.setOutput(true, 'String');
      this.setColour(BlockColors.time);
      this.setTooltip('Format a Date object to a string');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['timezone_block'] = function (block, generator) {
    const timezone = block.getFieldValue('TIMEZONE') || 'UTC';
    const code = `"${timezone}"`;
    return [code, Order.ATOMIC];
  };
};
