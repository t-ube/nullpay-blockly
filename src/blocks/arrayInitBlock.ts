import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';

export const defineArrayInitBlock = () => {
  Blockly.Blocks['array_init'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("initialize array")
        .appendField(new Blockly.FieldVariable("item"), "VAR");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(260);
      this.setTooltip('Initializes an empty array');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['array_init'] = function (block, generator) {
    if (generator.nameDB_ === undefined) {
        return `defArray = [];\n`
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `${variable} = [];\n`;
    return code;
  };
};
