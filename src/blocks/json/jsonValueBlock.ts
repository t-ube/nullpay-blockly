import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import '@/blocks/json/jsonDynamicCreate';

export const defineJsonInputJsonBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "json_input_block",
      "message0": "JSON %1",
      "args0": [
        {
          "type": "field_input",
          "name": "INPUT",
          "text": ""
        }
      ],
      "output": blockCheckType.json,
      "colour": BlockColors.json,
      "tooltip": "Convert a plain text to a JSON",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['json_input_block'] = function(block, generator) {
    var input = block.getFieldValue('INPUT');
    var code = `jsonInputJson('${input}')`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterJsonInputJson(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('jsonInputJson');
  const wrapper = function (jsonText:string) {
    try {
      const json = JSON.parse(jsonText);
      return interpreter.nativeToPseudo(json);
    } catch (error) {
      console.error(`Failed to parse json: ${jsonText}`);
      return interpreter.nativeToPseudo({});
    }
  };
  interpreter.setProperty(globalObject, 'jsonInputJson', interpreter.createNativeFunction(wrapper));
}

export const defineJsonToTextV2Block = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "json_to_text_v2",
      "message0": "JSON to text %1",
      "args0": [
        {
          "type": "input_value",
          "name": "JSON",
          "check": [
            blockCheckType.json, 
            blockCheckType.xrplTxnPayload,
            blockCheckType.xrplToken,
            blockCheckType.xrplTokenAmount,
          ]
        }
      ],
      "output": blockCheckType.string,
      "colour": BlockColors.json,
      "tooltip": "Convert a JSON object to a plain text",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['json_to_text_v2'] = function (block, generator) {
    const jsonInput = generator.valueToCode(block, 'JSON', Order.ATOMIC) || '""';
    const code = `JSON.stringify(${jsonInput})`;
    return [code, Order.ATOMIC];
  };
};

export const defineJsonTextToJsonV2Block = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "text_to_json_v2",
      "message0": "text to JSON %1",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT",
          "check": blockCheckType.string
        }
      ],
      "output": blockCheckType.json,
      "inputsInline": false,
      "colour": BlockColors.json,
      "tooltip": "Convert a plain text to a JSON object",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['text_to_json_v2'] = function (block, generator) {
    const textInput = generator.valueToCode(block, 'TEXT', Order.ATOMIC) || '""';
    const code = `TextToJsonV2(${textInput})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterJsonTextToJsonV2(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('TextToJsonV2');
  const wrapper = function (textInput: string) {
    try {
      const json = JSON.parse(textInput);
      return interpreter.nativeToPseudo(json);
    } catch (error) {
      console.error(`Failed to convert: ${textInput}`,error);
      return interpreter.nativeToPseudo(null);
    }
  };
  interpreter.setProperty(globalObject, 'TextToJsonV2', interpreter.createNativeFunction(wrapper));
}

export const defineJsonSetKVsBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "json_set_key_values",
      "message0": "Set JSON %1",
      "args0": [
        {
          "type": "input_value",
          "name": "BASE_JSON",
          "check": blockCheckType.json
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Key-Values",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "KEY_VALUES",
          "check": blockCheckType.jsonKvArray
        }
      ],
      "inputsInline": false,
      "output": blockCheckType.json,
      "colour": BlockColors.json,
      "tooltip": "Set a list of JSON key-value pairs",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['json_set_key_values'] = function (block, generator) {
    const baseJson = generator.valueToCode(block, 'BASE_JSON', Order.ATOMIC) || '{}';
    const keyValues = generator.valueToCode(block, 'KEY_VALUES', Order.ATOMIC) || '[]';
    const code = `jsonSetKVs(JSON.stringify(${baseJson}), JSON.stringify(${keyValues}))`;
    return [code, Order.NONE];
  };
};

export function initInterpreterJsonSetKVs(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('jsonSetKVs');
  const wrapper = function (jsonText:string, kvArrayText:string) {
    try {
      const json = JSON.parse(jsonText);
      const kvArray = JSON.parse(kvArrayText);
      const newJson = {...json, ...kvArray.reduce((obj:any, item:any) => {
        const key = Object.keys(item)[0];
        obj[key] = item[key];
        return obj;
      }, {})};
      return interpreter.nativeToPseudo(newJson);
    } catch (error) {
      console.error(`Failed to parse json: ${jsonText},${kvArrayText}`, error);
      return interpreter.nativeToPseudo({});
    }
  };
  interpreter.setProperty(globalObject, 'jsonSetKVs', interpreter.createNativeFunction(wrapper));
}

export const defineJsonGetValueBlock = () => {
  Blockly.Blocks['json_get_value'] = {
    init: function () {
      this.appendValueInput("VAR")
        .setCheck(null)
        .appendField("Get JSON");
      this.appendValueInput("KEY")
        .setCheck("String")
        .appendField("Key");
      this.setOutput(true, null);
      this.setColour(BlockColors.json);
      this.setTooltip('Get the value from a JSON object by key');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['json_get_value'] = function (block, generator) {
    const variable = generator.valueToCode(block, 'VAR', Order.ATOMIC) || '{}';
    const key = generator.valueToCode(block, 'KEY', Order.ATOMIC) || '""';
    const code = `${variable}[${key}]`;
    return [code, Order.NONE];
    //return [code, Order.MEMBER];
  };
};

export const defineDynamicJsonKVsBlock = () => {
  javascriptGenerator.forBlock['dynamic_json_key_values'] = function (block:any, generator) {
    let elements = [];
    for (let i = 0; i < block.itemCount; i++) {
      const value = generator.valueToCode(block, `ADD${i}`, Order.NONE) || 'null';
      if (value !== 'null')
        elements.push(value);
    }
    const code = `[${elements.join(',')}]`;
    return [code, Order.ATOMIC];
  };
};

export const defineJsonKeyValueBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "json_key_value_pair",
      "message0": "%1:%2",
      "args0": [
        {
          "type": "input_value",
          "name": "KEY",
          "check": blockCheckType.string
        },
        {
          "type": "input_value",
          "name": "VALUE",
          "check": null
        }
      ],
      "inputsInline": true,
      "output": blockCheckType.jsonKv,
      "colour": BlockColors.json,
      "tooltip": "Create a single JSON key-value pair",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['json_key_value_pair'] = function (block, generator) {
    const key = generator.valueToCode(block, 'KEY', Order.ATOMIC) || '""';
    const valueCode:string | null = generator.valueToCode(block, 'VALUE', Order.ATOMIC) || null;
    let outputValue:any = '';
    if ((valueCode) && (/^['"].*['"]$/.test(valueCode))) {
      outputValue = `"${valueCode.replace(/^'(.*)'$/,'$1')}"`;
    } else {
      outputValue = valueCode;
    }
    const code = `{"${key.replace(/^'(.*)'$/,'$1')}": ${outputValue}}`;
    return [code, Order.ATOMIC];
  };
};

export const defineJsonToTextBlock = () => {
  Blockly.Blocks['json_to_text'] = {
    init: function () {
      this.appendValueInput("JSON")
        .setCheck('String')
        .appendField("JSON string to text");
      this.setOutput(true, 'String');
      this.setColour(BlockColors.legacy);
      this.setTooltip('Convert a JSON string to a plain text');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['json_to_text'] = function (block, generator) {
    const jsonInput = generator.valueToCode(block, 'JSON', Order.ATOMIC) || '""';
    const code = `JSON.stringify(${jsonInput})`;
    return [code, Order.ATOMIC];
  };
};

export const defineJsonTextToJsonBlock = () => {
  Blockly.Blocks['text_to_json'] = {
      init: function () {
      this.appendValueInput("TEXT")
          .setCheck('String')
          .appendField("text to JSON string");
      this.setOutput(true, 'String');
      this.setColour(BlockColors.legacy);
      this.setTooltip('Convert a plain text to a JSON string');
      this.setHelpUrl('');
      }
  };

  javascriptGenerator.forBlock['text_to_json'] = function (block, generator) {
      const textInput = generator.valueToCode(block, 'TEXT', Order.ATOMIC) || '""';
      const code = `JSON.parse(${textInput})`;
      return [code, Order.ATOMIC];
  };
};
