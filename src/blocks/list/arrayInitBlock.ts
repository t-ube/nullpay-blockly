import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { blockCheckType } from '@/blocks/BlockField';
import { BlockColors } from '@/blocks/BlockColors';


export const array_init : any = {
  "type": "array_init",
  "message0": "initialize array %1",
  "args0": [
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "item"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": blockCheckType.list,
  "tooltip": "Initializes an empty array",
  "helpUrl": ""
};

export const defineArrayInitBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    array_init
  ]);

  javascriptGenerator.forBlock['array_init'] = function (block, generator) {
    if (generator.nameDB_ === undefined) {
        return `defArray = [];\n`
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `${variable} = [];\n`;
    return code;
  };
};


export const lists_append : any = {
  "type": "lists_append",
  "message0": "append to list %1 item %2",
  "args0": [
    {
      "type": "input_value",
      "name": "LIST",
      "check": "Array"
    },
    {
      "type": "input_value",
      "name": "ITEM",
      "check": null
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.list,
  "tooltip": "Append an item to a list",
  "helpUrl": ""
};

export const defineArrayAppendBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    lists_append
  ]);

  javascriptGenerator.forBlock['lists_append'] = function (block, generator) {
    const array = generator.valueToCode(block, 'LIST', Order.ATOMIC);
    const item = generator.valueToCode(block, 'ITEM', Order.ATOMIC);
    const code = `${array}.push(${item});\n`;
    return code;
  };
};


export const lists_sort_json_value : any = {
  "type": "lists_sort_json_value",
  "message0": "sort JSON list %1",
  "args0": [
    {
      "type": "input_value",
      "name": "LIST",
      "check": [blockCheckType.array]
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Key",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "KEY",
      "check": blockCheckType.string
    }
  ],
  "message2": "%1",
  "args2": [
    {
      "type": "field_dropdown",
      "name": "TYPE",
      "options": [
        ["numeric", "numeric"],
        ["alphabetic", "alphabetic"],
        ["alphabetic, ignore case", "alphabetic_ignore_case"],
      ]
    }
  ],
  "message3": "%1",
  "args3": [
    {
      "type": "field_dropdown",
      "name": "ORDER",
      "options": [
        ["asdending", "asc"],
        ["descending", "desc"],
      ]
    }
  ],
  "inputsInline": false,
  "output": [blockCheckType.array, blockCheckType.json],
  "colour": BlockColors.list,
  "tooltip": "Sort a list of JSON objects by a specified key",
  "helpUrl": ""
};

export const defineListSortJsonValueBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    lists_sort_json_value
  ]);

  javascriptGenerator.forBlock['lists_sort_json_value'] = function (block, generator) {
    const key = generator.valueToCode(block, 'KEY', Order.ATOMIC) || '""';
    const type = block.getFieldValue('TYPE');
    const bodyFormat = block.getFieldValue('ORDER');
    const array = generator.valueToCode(block, 'LIST', Order.ATOMIC) || '[]';
    const code = `listSortJsonValue(JSON.stringify(${array}), ${key},
      "${type}",
      ${bodyFormat === 'asc' ? true : false }
    )`;
    return [code, Order.NONE];
  };
};

type SortType = 'numeric' | 'alphabetic' | 'alphabetic_ignore_case';

export function initInterpreterListSortJsonValue(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('listSortJsonValue');
  const wrapper = function (jsonText:string, key:string, type:SortType, asc:boolean) {
    try {
      const json = JSON.parse(jsonText);
      return interpreter.nativeToPseudo(sortByKey(json,key,type,asc));
    } catch (error) {
      console.error(`Failed to parse json: ${jsonText}`, error);
      return interpreter.nativeToPseudo([]);
    }
  };

  function sortByKey<T extends object>(arr: T[], key: keyof T, sortType: SortType, asc: boolean): T[] {
    return arr.sort((a, b) => {
      let valueA = a[key] as any;
      let valueB = b[key] as any;
  
      if (sortType === 'numeric') {
        const numA = typeof valueA === 'string' ? parseFloat(valueA) : valueA as number;
        const numB = typeof valueB === 'string' ? parseFloat(valueB) : valueB as number;
        return asc ? numA - numB : numB - numA;
      } else if (sortType === 'alphabetic_ignore_case') {
        valueA = typeof valueA === 'string' ? valueA.toLowerCase() : valueA;
        valueB = typeof valueB === 'string' ? valueB.toLowerCase() : valueB;
        return asc ? valueA.toString().localeCompare(valueB.toString()) : valueB.toString().localeCompare(valueA.toString());
      } else {
        return asc ? valueA.toString().localeCompare(valueB.toString()) : valueB.toString().localeCompare(valueA.toString());
      }
    });
  }
  interpreter.setProperty(globalObject, 'listSortJsonValue', interpreter.createNativeFunction(wrapper));
}
