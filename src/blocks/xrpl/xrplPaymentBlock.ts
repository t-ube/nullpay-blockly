import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/blockColors';

export const defineXrplPaymentBlock = () => {
  Blockly.Blocks['xrpl_payment'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("XRPL Payment");
      this.appendValueInput("SENDER")
        .setCheck('String')
        .appendField("Sender");
      this.appendValueInput("RECIPIENT")
        .setCheck('String')
        .appendField("Recipient");
      this.appendValueInput("AMOUNT")
        .setCheck('Number')
        .appendField("Amount (drops)");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Perform a payment');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_payment'] = function (block, generator) {
    const sender = generator.valueToCode(block, 'SENDER', Order.ATOMIC) || '""';
    const recipient = generator.valueToCode(block, 'RECIPIENT', Order.ATOMIC) || '""';
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '0';
    const code = `performPayment(${sender}, ${recipient}, ${amount});\n`;
    return code;
  };
};
