import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { blockCheckType } from '@/blocks/BlockField';
import { BlockColors } from '@/blocks/BlockColors';


export const defineArrayInitBlock = () => {
  Blockly.Blocks['array_init'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("initialize array")
        .appendField(new Blockly.FieldVariable("item"), "VAR");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(blockCheckType.list);
      this.setTooltip('Initializes an empty array');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['array_init'] = function (block, generator) {
    if (generator.nameDB_ === undefined) {
        return `defArray = [];\n`
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `${variable} = [];\n`;
    return code;
  };
};

export const defineArrayAppendBlock = () => {
  Blockly.Blocks['array_append'] = {
    init: function () {
      this.appendValueInput("ARRAY")
        .setCheck("Array")
        .appendField("append to array");
      this.appendValueInput("ITEM")
        .setCheck(null)
        .appendField("item");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.list);
      this.setTooltip('Append an item to an array');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['array_append'] = function (block, generator) {
    const array = generator.valueToCode(block, 'ARRAY', Order.ATOMIC);
    const item = generator.valueToCode(block, 'ITEM', Order.ATOMIC);
    const code = `${array}.push(${item});\n`;
    return code;
  };
};

export const defineListSortJsonValueBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "lists_sort_json_value",
      "message0": "sort JSON list %1",
      "args0": [
        {
          "type": "input_value",
          "name": "ARRAY",
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
    }
  ]);

  javascriptGenerator.forBlock['lists_sort_json_value'] = function (block, generator) {
    const key = generator.valueToCode(block, 'KEY', Order.ATOMIC) || '""';
    const type = block.getFieldValue('TYPE');
    const bodyFormat = block.getFieldValue('ORDER');
    const array = generator.valueToCode(block, 'ARRAY', Order.ATOMIC) || '[]';
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
