import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';

export const defineConsoleLogBlock = () => {
  Blockly.Blocks['console_log'] = {
    init: function () {
      this.appendValueInput("VAR")
        .setCheck(null)
        .appendField("log");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Log the value of a variable to the console');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['console_log'] = function (block, generator) {
    const variable = generator.valueToCode(block, 'VAR', Order.ATOMIC) || '""';
    const code = `console.log(${variable});\n`;
    return code;
  };
};
