import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';

export const definePercentageBlock = () => {
  Blockly.Blocks['percentage'] = {
    init: function () {
      this.appendValueInput("PERCENTAGE")
        .setCheck('Number')
        .appendField(new Blockly.FieldLabelSerializable(""), "PERCENTAGE");
      this.appendValueInput("VALUE")
        .setCheck('Number')
        .appendField(new Blockly.FieldLabelSerializable("% of"), "VALUE");
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip('Calculate percentage of a value');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['percentage'] = function (block, generator) {
    const percentage = generator.valueToCode(block, 'PERCENTAGE', Order.ATOMIC) || '0';
    const value = generator.valueToCode(block, 'VALUE', Order.ATOMIC) || '0';
    const code = `${value} * (${percentage} / 100)`;
    return [code, Order.MULTIPLICATION];
  };
};
