// @/blocks/form/formBlock.ts

import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { FieldForm, getDefaultFormValue } from '@/blocks/form/field_form';
import { IFormResult } from '@/interfaces/IForm';
import { blockCheckType } from '@/blocks/BlockField';

Blockly.fieldRegistry.register('field_form', FieldForm);

export const defineFormModalBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "form_modal_block",
      "message0": "Form %1",
      "args0": [
        {
          "type": "field_form",
          "name": "INPUT",
          "value": getDefaultFormValue()
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Result",
          "class": "args-label"
        },
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "result"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.form,
      "tooltip": "Create and display a form",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['form_modal_block'] = function(block, generator) {
    if (generator.nameDB_ === undefined) {
      const code = `formShowModal('${block.id}','');\n`;
      return code;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `formShowModal('${block.id}','${variable}');\n`;
    return code;
  };
};

async function showFormModal(blockId: string): Promise<IFormResult> {
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
  const wrapper = function(blockId: string, variable: any, callback:any) {
    showFormModal(blockId).then(result => {
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(result));
      callback();
    });
  };
  interpreter.setProperty(globalObject, 'formShowModal', interpreter.createAsyncFunction(wrapper));
}
/*
export function initInterpreterFormModal(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('formShowModal');
  const wrapper = function(blockId: string, variable: any, callback: (result: IFormResult) => void) {
    showFormModal(blockId).then(result => {
      callback(interpreter.nativeToPseudo(result));
    });
  };
  interpreter.setProperty(globalObject, 'formShowModal', interpreter.createAsyncFunction(wrapper));
}
*/
export const defineFormSubmittedBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "form_submitted",
      "message0": "form submitted %1",
      "args0": [
        {
          "type": "input_value",
          "name": "FORM_RESULT",
          "check": blockCheckType.json
        }
      ],
      "output": blockCheckType.boolean,
      "inputsInline": false,
      "colour": BlockColors.form,
      "tooltip": "Check if a form has been submitted. Accepts a JSON form result object as input and outputs 'true' if the form was submitted, 'false' otherwise.",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['form_submitted'] = function (block, generator) {
    const result = generator.valueToCode(block, 'FORM_RESULT', Order.ATOMIC) || '{}';
    const code = `formSubmitted(JSON.stringify(${result}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterFormSubmitted(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('formSubmitted');
  const wrapper = function (resultText: string) {
    try {
      const json = JSON.parse(resultText) as IFormResult;
      if (json.return.submit === true) {
        return interpreter.nativeToPseudo(true);
      }
      return interpreter.nativeToPseudo(false);
    } catch (error) {
      console.error(`Failed to convert: ${resultText}`,error);
      return interpreter.nativeToPseudo(false);
    }
  };
  interpreter.setProperty(globalObject, 'formSubmitted', interpreter.createNativeFunction(wrapper));
}

export const defineFormVariableGetBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "form_variable_get",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Form get variable",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Form result",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "FORM_RESULT",
          "check": blockCheckType.json
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Variable name",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "NAME",
          "check": blockCheckType.string
        }
      ],
      "output": [blockCheckType.string, blockCheckType.number, null],
      "inputsInline": false,
      "colour": BlockColors.form,
      "tooltip": "Get the value of a variable from a submitted form",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['form_variable_get'] = function (block, generator) {
    const result = generator.valueToCode(block, 'FORM_RESULT', Order.ATOMIC) || '{}';
    const name = generator.valueToCode(block, 'NAME', Order.NONE) || '""';
    const code = `formVariableGet(JSON.stringify(${result}),${name})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterFormVariableGet(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('formVariableGet');
  const wrapper = function (resultText: string, name:string) {
    try {
      const json = JSON.parse(resultText) as IFormResult;
      if (json.return.submit === true) {
        console.log(json.items);
        const item = Object.values(json.items).find(item => item.name.default === name);
        if (item) {
          return interpreter.nativeToPseudo(item.value);
        }
      }
      return interpreter.nativeToPseudo(null);
    } catch (error) {
      console.error(`Failed to convert: ${resultText}`,error);
      return interpreter.nativeToPseudo(null);
    }
  };
  interpreter.setProperty(globalObject, 'formVariableGet', interpreter.createNativeFunction(wrapper));
}
