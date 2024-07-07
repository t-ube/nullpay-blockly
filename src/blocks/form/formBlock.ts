// @/blocks/form/formBlock.ts

import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { FieldForm, getDefaultFormValue, IFormValue } from '@/blocks/form/FieldForm';

export const defineFormModalBlock = () => {
  Blockly.Blocks['form_modal_block'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Form')
        .appendField(new FieldForm(getDefaultFormValue()), 'INPUT');
      this.setOutput(true, blockCheckType.json);
      this.setColour(BlockColors.form);
      this.setTooltip('Input a JSON of values');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['form_modal_block'] = function(block, generator) {
    const code = `formShowModal('${block.id}')`;
    return [code, Order.FUNCTION_CALL];
  };
};

async function showFormModal(blockId: string): Promise<IFormValue> {
  const workspace = Blockly.getMainWorkspace();
  const block = workspace.getBlockById(blockId);
  if (block) {
    const field = block.getField('INPUT') as FieldForm;
    return await field.showModalAtRuntime();
  }
  return getDefaultFormValue();
}

export function initInterpreterFormModal(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('formShowModal');
  const wrapper = function(blockId: string, callback: (result: IFormValue) => void) {
    showFormModal(blockId).then(result => {
      callback(interpreter.nativeToPseudo(result));
    });
  };
  interpreter.setProperty(globalObject, 'formShowModal', interpreter.createAsyncFunction(wrapper));
}

/*
export const defineFormModalBlock = () => {
  Blockly.Blocks['form_modal_block'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Form')
        .appendField(new FieldForm(getDefaultFormValue()), 'INPUT');
      this.setOutput(true, blockCheckType.json);
      this.setColour(BlockColors.json);
      this.setTooltip('Input a JSON of values');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['form_modal_block'] = function(block, generator) {
    const input = block.getFieldValue('INPUT');
    return [JSON.stringify(input), Order.ATOMIC];
  };
};
*/