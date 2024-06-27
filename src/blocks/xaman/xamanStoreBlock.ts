import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import xamanPkce from '@/utils/XamanPkce';
import { blockCheckType } from '@/blocks/BlockField';
import { getAsyncSuccess, getAsyncError } from '@/blocks/AsyncBlockResult';

// Define the XamanStoreKey block
export const defineXamanStoreKeyBlock = () => {
  const xamanStoreKeyValidator = (newValue: string) => {
    const keyRegex = /^[a-z0-9]{4,}$/;
    if (keyRegex.test(newValue)) {
      return newValue;
    } else {
      return null;
    }
  };

  const xamanStoreKeyJson = {
    "type": "xaman_store_key",
    "message0": "Xaman store key %1",
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
    "tooltip": "Input a key for Xaman Store (at least 4 characters, a-z0-9)",
    "helpUrl": ""
  };
  
  Blockly.defineBlocksWithJsonArray([xamanStoreKeyJson]);

  Blockly.Blocks['xaman_store_key'].init = function () {
    this.jsonInit(xamanStoreKeyJson);
    const keyField = this.getField('KEY');
    keyField.setValidator(xamanStoreKeyValidator);
  };

  // Add validation to the input field
  /*
  Blockly.Blocks['xaman_store_key'].onchange = function () {
    const key = this.getFieldValue('KEY');
    console.log(key.length);
    if (!/^[a-z0-9]{4,}$/.test(key)) {
      this.setWarningText('Invalid key: must be at least 4 characters long and contain only a-z0-9');
    } else {
      this.setWarningText(null);
    }
  };
  */
  javascriptGenerator.forBlock['xaman_store_key'] = function (block, generator) {
    const key = block.getFieldValue('KEY');
    return [generator.quote_(key), Order.ATOMIC];
  };
};

export const defineXamanStoreSetBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xaman_store_set",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Xaman store data",
          "class": "title-label"
        }
      ],
      "message1": "Data %1 Key %2",
      "args1": [
        {
          "type": "input_value",
          "name": "DATA",
          "check": blockCheckType.string
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
  
  javascriptGenerator.forBlock['xaman_store_set'] = function (block, generator) {
    const data = generator.valueToCode(block, 'DATA', Order.NONE) || '""';
    const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
    if (generator.nameDB_ === undefined) {
      return `xamanStoreSet(${data}, ${key}, '');\n`;
    }
    const status = generator.nameDB_.getName(block.getFieldValue('STATUS'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xamanStoreSet(${data}, ${key}, '${status}');\n`;
    return code;
  };
};

export function initInterpreterxamanStoreSet(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xamanStoreSet');
  const wrapper = async function (data:string, key:string, statusVar:any, callback:any) {
    try {
      if (!/^[a-z0-9]{3,}$/.test(key)) {
        throw new Error('Invalid key, only a-z0-9 (min three chars) allowed');
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
  interpreter.setProperty(globalObject, 'xamanStoreSet', interpreter.createAsyncFunction(wrapper));
}


export const defineXamanStoreGetBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xaman_store_get",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Xaman get data",
          "class": "title-label"
        }
      ],
      "message1": "Key %1",
      "args1": [
        {
          "type": "input_value",
          "name": "KEY",
          "check": blockCheckType.string
        }
      ],
      "message2": "%1 %2 %3",
      "args2": [
        {
          "type": "field_label",
          "text": "Result",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "DATA",
          "variable": "data"
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
      "tooltip": "Gets user data from Xaman with the specified key",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xaman_store_get'] = function (block, generator) {
    const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
    if (generator.nameDB_ === undefined) {
      return `xamanStoreGet(${key}, '', '');\n`;
    }
    const status = generator.nameDB_.getName(block.getFieldValue('STATUS'), Blockly.VARIABLE_CATEGORY_NAME);
    const data = generator.nameDB_.getName(block.getFieldValue('DATA'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xamanStoreGet(${key}, '${data}', '${status}');\n`;
    return code;
  };
};

export function initInterpreterxamanStoreGet(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xamanStoreGet');
  const wrapper = async function (key:string, dataVar:any, statusVar:any, callback:any) {
    try {
      const state = await xamanPkce.state();
      if (state?.me) {
        const { sdk } = state;
        const data = await sdk.jwtUserdata.get(key);
        if (typeof data === "string") {
          const parseData = JSON.parse(data);
          const result = Array.isArray(parseData) && parseData.length > 0 ? parseData[0] : null;
          interpreter.setProperty(globalObject, dataVar, interpreter.nativeToPseudo(result));
        }
        interpreter.setProperty(globalObject, statusVar, interpreter.nativeToPseudo(getAsyncSuccess(data)));
      } else {
        throw new Error('Not logged in');
      }
      callback();
    } catch (error) {
      console.error('Failed to get user data:', error);
      interpreter.setProperty(globalObject, status, interpreter.nativeToPseudo(getAsyncError(`${error}`)));
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xamanStoreGet', interpreter.createAsyncFunction(wrapper));
}
