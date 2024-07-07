import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { FieldModal } from '@/blocks/dev/FieldModal';
import { FieldPopup } from '@/blocks/dev/FieldPopup';

export const defineJsonEditorBlock = () => {
  Blockly.Blocks['json_editor_block'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('JSON')
        .appendField(new FieldModal({}), 'INPUT');
      this.setOutput(true, blockCheckType.json);
      this.setColour(BlockColors.json);
      this.setTooltip('Input a JSON of values');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['json_editor_block'] = function(block, generator) {
    const input = block.getFieldValue('INPUT');
    return [JSON.stringify(input), Order.ATOMIC];
  };
};

export const defineJsonPopupBlock = () => {
  Blockly.Blocks['json_popup_block'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('JSON')
        .appendField(new FieldPopup({}), 'INPUT');
      this.setOutput(true, blockCheckType.json);
      this.setColour(BlockColors.json);
      this.setTooltip('Popup a JSON of values');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['json_popup_block'] = function(block, generator) {
    const input = block.getFieldValue('INPUT');
    return [JSON.stringify(input), Order.ATOMIC];
  };
};
