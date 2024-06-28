import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import xamanPkce from '@/utils/XamanPkce';
import { blockCheckType } from '@/blocks/BlockField';
import { getAsyncSuccess, getAsyncError } from '@/blocks/AsyncBlockResult';

// Define the XamanStoreKey block
export const defineXamanVariableKeyBlock = () => {
  const xamanStoreKeyValidator = (newValue: string) => {
    const keyRegex = /^[a-z0-9]{3,}$/;
    if (keyRegex.test(newValue)) {
      return newValue;
    } else {
      return null;
    }
  };

  const xamanStoreKeyJson = {
    "type": "xaman_variable_name",
    "message0": "Xaman variable name %1",
    "args0": [
      {
        "type": "field_input",
        "name": "KEY",
        "text": "",
        "spellcheck": false
      }
    ],
    "output": blockCheckType.string,
    "colour": BlockColors.xaman,
    "tooltip": "Input a key for Xaman Store (min three characters, a-z0-9)",
    "helpUrl": ""
  };
  
  Blockly.defineBlocksWithJsonArray([xamanStoreKeyJson]);

  Blockly.Blocks['xaman_variable_name'].init = function () {
    this.jsonInit(xamanStoreKeyJson);
    const keyField = this.getField('KEY');
    keyField.setValidator(xamanStoreKeyValidator);
  };

  // Add validation to the input field
  /*
  Blockly.Blocks['xaman_variable_name'].onchange = function () {
    const key = this.getFieldValue('KEY');
    console.log(key.length);
    if (!/^[a-z0-9]{3,}$/.test(key)) {
      this.setWarningText('Invalid key: must be at least 3 characters long and contain only a-z0-9');
    } else {
      this.setWarningText(null);
    }
  };
  */
  javascriptGenerator.forBlock['xaman_variable_name'] = function (block, generator) {
    const key = block.getFieldValue('KEY');
    return [generator.quote_(key), Order.ATOMIC];
  };
};

export const defineXamanVariableSetBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xaman_variable_set",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Xaman set variable",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Variable name",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "KEY",
          "check": blockCheckType.string
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Value (Text)",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "DATA",
          "check": blockCheckType.string
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Result",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "STATUS",
          "variable": "status"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.xaman,
      "tooltip": "Stores user data in Xaman with the specified key",
      "helpUrl": ""
    }
  ]);
  
  javascriptGenerator.forBlock['xaman_variable_set'] = function (block, generator) {
    const data = generator.valueToCode(block, 'DATA', Order.NONE) || '""';
    const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
    if (generator.nameDB_ === undefined) {
      return `xamanVariableSet(${data}, ${key}, '');\n`;
    }
    const status = generator.nameDB_.getName(block.getFieldValue('STATUS'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xamanVariableSet(${data}, ${key}, '${status}');\n`;
    return code;
  };
};

export function initInterpreterXamanVariableSet(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xamanVariableSet');
  const wrapper = async function (data:string, key:string, statusVar:any, callback:any) {
    try {
      if (!/^[a-z0-9]{3,}$/.test(key)) {
        throw new Error('Invalid name, only a-z0-9 (min three chars) allowed');
      }
      const state = await xamanPkce.state();
      if (state?.me) {
        const { sdk, me } = state;
        sdk.jwtUserdata.set(key, [data]);
      } else {
        throw new Error('Not logged in');
      }
      interpreter.setProperty(globalObject, statusVar, interpreter.nativeToPseudo(getAsyncSuccess(null)));
      callback();
    } catch (error) {
      console.error('Failed to set user data:', error);
      interpreter.setProperty(globalObject, statusVar, interpreter.nativeToPseudo(getAsyncError(`${error}`)));
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xamanVariableSet', interpreter.createAsyncFunction(wrapper));
}

export const defineXamanVariableGetBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xaman_variable_get",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Xaman get variable",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Variable name",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "KEY",
          "check": blockCheckType.string
        }
      ],
      "output": [blockCheckType.string, null],
      "inputsInline": false,
      "colour": BlockColors.xaman,
      "tooltip": "Gets user data from Xaman with the specified key",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xaman_variable_get'] = function (block, generator) {
    const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
    const code = `xamanVariableGet(${key})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXamanVariableGet(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xamanVariableGet');
  const wrapper = async function (key:string, callback:any) {
    try {
      const state = await xamanPkce.state();
      if (state?.me) {
        const { sdk } = state;
        const data = await sdk.jwtUserdata.get(key);
        if (typeof data === "string") {
          const parseData = JSON.parse(data);
          const result = Array.isArray(parseData) && parseData.length > 0 ? parseData[0] : null;
          callback(interpreter.nativeToPseudo(result));
          return;
        }
      } else {
        throw new Error('Not logged in');
      }
    } catch (error) {
      console.error('Failed to get user data:', error);
    }
    callback(interpreter.nativeToPseudo(null));
  };
  interpreter.setProperty(globalObject, 'xamanVariableGet', interpreter.createAsyncFunction(wrapper));
}
