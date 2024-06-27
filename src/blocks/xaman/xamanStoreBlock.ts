import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import xamanPkce from '@/utils/XamanPkce';
import { blockCheckType } from '@/blocks/BlockField';

export const defineXamanStoreSetBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xaman_store_set",
      "message0": "store user data %1 with key %2",
      "args0": [
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
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Result",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "result"
        }
      ],
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
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xamanStoreSet(${data}, ${key}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterxamanStoreSet(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xamanStoreSet');
  const wrapper = async function (data:string, key:string, variable:any, callback:any) {
    try {
      const state = await xamanPkce.state();
      if (state?.me) {
        const { sdk, me } = state;
        sdk.jwtUserdata.set(key, [data]);
      } else {
        throw new Error('Not logged in');
      }
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo());
      callback();
    } catch (error) {
      console.error('Failed to set user data:', error);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo());
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xamanStoreSet', interpreter.createAsyncFunction(wrapper));
}
