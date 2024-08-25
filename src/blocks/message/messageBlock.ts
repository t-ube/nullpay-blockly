import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { FieldMessageModal, getDefaultMessageValue } from '@/blocks/message/field_message_modal';

Blockly.fieldRegistry.register('field_message_modal', FieldMessageModal);

export const defineMessageModalBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "message_modal_block",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_label",
          "text": "Message box",
          "class": "args-label"
        },
        {
          "type": "field_message_modal",
          "name": "INPUT",
          "value": getDefaultMessageValue()
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Message",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "MESSAGE",
          "check": blockCheckType.string
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Wait for Close",
          "class": "args-label"
        },
        {
          "type": "field_checkbox",
          "name": "WAIT_FOR_CLOSE",
          "checked": false
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.text,
      "tooltip": "Display a message",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['message_modal_block'] = function(block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.ATOMIC) || '""';
    const waitForOK = block.getFieldValue('WAIT_FOR_CLOSE') === 'TRUE';
    const code = `showMessageModal('${block.id}', ${message}, ${waitForOK});\n`;
    return code;
  };
};

const activeModals: Map<string, FieldMessageModal> = new Map();

async function showMessageModal(blockId: string, message: string, waitForOK: boolean): Promise<void> {
  const workspace = Blockly.getMainWorkspace();
  const block = workspace.getBlockById(blockId);
  if (block) {
    const field = block.getField('INPUT') as FieldMessageModal;
    
    if (activeModals.has(blockId)) {
      const existingModal = activeModals.get(blockId);
      if (existingModal) {
        if (waitForOK) {
          await existingModal.showModalAtRuntime('');
        }
        existingModal.customModal?.hide();
        existingModal.customModal = null;
      }
      activeModals.delete(blockId);
    }
    
    activeModals.set(blockId, field);
    
    if (waitForOK) {
      await field.showModalAtRuntime(message);
      activeModals.delete(blockId);
    } else {
      field.showModalAtRuntime(message).then(() => {
        activeModals.delete(blockId);
      });
    }
  }
}

export function initInterpreterMessageModal(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('showMessageModal');
  const wrapper = function(blockId: string, message: string, waitForOK: boolean, callback: () => void) {
    showMessageModal(blockId, message, waitForOK).then(() => {
      callback();
    });
  };
  interpreter.setProperty(globalObject, 'showMessageModal', interpreter.createAsyncFunction(wrapper));
}