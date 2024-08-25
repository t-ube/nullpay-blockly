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
          "text": "Style",
          "class": "args-label"
        },
        {
          "type": "field_dropdown",
          "name": "MESSAGE_BOX_STYLE",
          "options": [
            ["Normal", "Normal"],
            ["Celebrate", "Celebrate"],
            ["Console", "Console"]
          ]
        }
      ],
      "message3": "%1 %2",
      "args3": [
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
      "tooltip": "Display a customizable message box. Choose from three styles: Normal, Celebrate, or Console. Option to wait for the user to close the message before continuing.",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['message_modal_block'] = function(block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.ATOMIC) || '""';
    const style = block.getFieldValue('MESSAGE_BOX_STYLE');
    const waitForClose = block.getFieldValue('WAIT_FOR_CLOSE') === 'TRUE';
    const code = `showMessageModal('${block.id}', ${message}, '${style}', ${waitForClose});\n`;
    return code;
  };
};

const activeModals: Map<string, FieldMessageModal> = new Map();

async function showMessageModal(blockId: string, message: string, style: 'Normal' | 'Celebrate' | 'Console', waitForClose: boolean): Promise<void> {
  const workspace = Blockly.getMainWorkspace();
  const block = workspace.getBlockById(blockId);
  if (block) {
    const field = block.getField('INPUT') as FieldMessageModal;
    
    if (activeModals.has(blockId)) {
      const existingModal = activeModals.get(blockId);
      if (existingModal) {
        if (waitForClose) {
          await existingModal.showModalAtRuntime('', style);
        }
        existingModal.customModal?.hide();
        existingModal.customModal = null;
      }
      activeModals.delete(blockId);
    }
    
    activeModals.set(blockId, field);
    
    if (waitForClose) {
      await field.showModalAtRuntime(message, style);
      activeModals.delete(blockId);
    } else {
      field.showModalAtRuntime(message, style).then(() => {
        activeModals.delete(blockId);
      });
    }
  }
}

export function initInterpreterMessageModal(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('showMessageModal');
  const wrapper = function(blockId: string, message: string, style: 'Normal' | 'Celebrate' | 'Console', waitForClose: boolean, callback: () => void) {
    showMessageModal(blockId, message, style, waitForClose).then(() => {
      callback();
    });
  };
  interpreter.setProperty(globalObject, 'showMessageModal', interpreter.createAsyncFunction(wrapper));
}