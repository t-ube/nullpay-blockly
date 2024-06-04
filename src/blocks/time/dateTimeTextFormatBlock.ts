import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineDateTimeTextFormatBlock = () => {
  Blockly.Blocks['datetime_text_format'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("time format")
        .appendField(new Blockly.FieldDropdown([
          ["YYYY-MM-DD", "YYYY-MM-DD"], 
          ["MM/DD/YYYY", "MM/DD/YYYY"],
          ["DD/MM/YYYY", "DD/MM/YYYY"],
          ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss"],
          ["HH:mm:ss", "HH:mm:ss"],
          ["MMMM D, YYYY", "MMMM D, YYYY"],
          ["ddd, MMM D, YYYY", "ddd, MMM D, YYYY"],
          ["YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DDTHH:mm:ssZ"]
        ]), "FORMAT");
      this.setOutput(true, 'String');
      this.setColour(BlockColors.time);
      this.setTooltip('Format a Date object to a string');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['datetime_text_format'] = function (block, generator) {
    const format = block.getFieldValue('FORMAT') || 'YYYY-MM-DD HH:mm:ss';
    const code = `"${format}"`;
    return [code, Order.ATOMIC];
  };
};
