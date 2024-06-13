import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineXrplXrp2DropBlock = () => {
  Blockly.Blocks['xrpl_xrp_to_drops'] = {
    init: function () {
      this.appendValueInput("AMOUNT")
        .setCheck('Number')
      this.appendDummyInput()
        .appendField("XRP to drops");
      this.setOutput(true, 'Number');
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Enter the amount in XRP to convert to drops');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_xrp_to_drops'] = function (block, generator) {
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '0';
    const drops = `${amount} * 1000000`;
    return [drops, Order.MULTIPLICATION];
  };
};

export const defineXrplDrop2XrpBlock = () => {
  Blockly.Blocks['xrpl_drops_to_xrp'] = {
    init: function () {
      this.appendValueInput("AMOUNT")
        .setCheck('Number')
      this.appendDummyInput()
        .appendField("drops to XRP");
      this.setOutput(true, 'Number');
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Enter the amount in XRP');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_drops_to_xrp'] = function (block, generator) {
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '0';
    const xrp = `${amount} / 1000000`;
    return [xrp, Order.MULTIPLICATION];
  };
};
