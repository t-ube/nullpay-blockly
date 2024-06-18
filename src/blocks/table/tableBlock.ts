import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
//import { FieldJSpreadsheet } from '@/blocks/table/JSpreadsheetField';
import { FieldTable } from '@/blocks/table/TableField';
import { BlockColors } from '@/blocks/BlockColors';

export const defineTableBlock = () => {
  Blockly.Blocks['table_input'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Table')
        .appendField(new FieldTable([['', ''], ['', '']]), 'TABLE');
      this.setOutput(true, 'Array');
      this.setColour(BlockColors.json);
      this.setTooltip('Input a table of values');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['table_input'] = function (block, generator) {
    const table = block.getFieldValue('TABLE');
    return [JSON.stringify(table), Order.ATOMIC];
  };
};
