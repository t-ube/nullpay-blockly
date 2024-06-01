import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';

export const defineCancelBlock = () => {
  Blockly.Blocks['cancel_execution'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("cancel execution");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip('Cancels the current execution');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['cancel_execution'] = function (block, generator) {
    const code = 'controller.abort();\n';
    return code;
  };
};
