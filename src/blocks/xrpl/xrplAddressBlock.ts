import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineXrplAddressBlock = () => {
  const xrplAddressValidator = (newValue: string) => {
    const xrplAddressRegex = /^r[1-9A-HJ-NP-Za-km-z]{25,34}$/;
    if (xrplAddressRegex.test(newValue)) {
      return newValue;
    } else {
      return null;
    }
  };

  Blockly.Blocks['xrpl_address'] = {
    init: function () {
      const addressField = new Blockly.FieldTextInput("", xrplAddressValidator);
      this.appendDummyInput()
        .appendField("XRPL address")
        .appendField(addressField, "ADDRESS");
      this.setOutput(true, 'String');
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Enter the XRPL address');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_address'] = function (block, generator) {
    const address = block.getFieldValue('ADDRESS');
    const code = `'${address}'`;
    return [code, Order.ATOMIC];
  };
};
