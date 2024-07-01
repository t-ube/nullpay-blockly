import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { notionClientInstances, getNotionClient } from '@/blocks/notion/notionClient';
import { getAsyncSuccess, getAsyncError } from '@/blocks/AsyncBlockResult'; 

// Define the block for Notion 
export const defineNotionCreateClientBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "notion_create_client",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Notion client",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "API key",
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
          "text": "Client",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "notionClient"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.notion,
      "tooltip": "",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['notion_create_client'] = function(block, generator) {
    const key = generator.valueToCode(block, 'KEY', Order.NONE) || '""';
    if (generator.nameDB_ === undefined) {
      return `notionCreateClient(${key}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `notionCreateClient(${key},'${variable}');\n`;
    return code;
  };
};

export function initInterpreterNotionCreateClient(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('notionCreateClient');
  const wrapper = async function (key: string, variable:any, callback:any) {
    try {
      notionClientInstances[variable] = key;
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(variable));
      console.log('Notion Client initialized:', variable);
      callback();
    } catch (error) {
      console.error('Failed to initialize notion client:', error);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'notionCreateClient', interpreter.createAsyncFunction(wrapper));
}


// Define the block for creating a Notion database
export const defineNotionCreateDatabaseBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "notion_create_database",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Create Notion Database",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Client",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "CLIENT",
          "check": blockCheckType.string
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Parent Page ID",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "PAGE_ID",
          "check": blockCheckType.string
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Title",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "TITLE",
          "check": blockCheckType.string
        }
      ],
      "message4": "%1 %2",
      "args4": [
        {
          "type": "field_label",
          "text": "Properties (JSON)",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "PROPERTIES",
          "check": blockCheckType.json
        }
      ],
      "message5": "%1 %2",
      "args5": [
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
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.notion,
      "tooltip": "Create a new Notion database",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['notion_create_database'] = function(block,generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.NONE) || '""';
    const pageId = generator.valueToCode(block, 'PAGE_ID', Order.NONE) || '""';
    const title = generator.valueToCode(block, 'TITLE', Order.NONE) || '""';
    const properties = generator.valueToCode(block, 'PROPERTIES', Order.NONE) || {};
    if (generator.nameDB_ === undefined) {
      return `notionCreateDatabase(${client}, ${pageId}, ${title}, JSON.stringify(${properties}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `notionCreateDatabase(${client}, ${pageId}, ${title}, JSON.stringify(${properties}), '${variable}');\n`;
    return code;
  };
};

export function initInterpreterNotionCreateDatabase(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('notionCreateDatabase');
  const wrapper = async function(clientKey:string ,pageId:string, title:string, properties:string, variable:any, callback:any) {
    try {
      const notion = getNotionClient(clientKey);
      const parseData = JSON.parse(properties);
      const response = await fetch('/api/notion/v1/databases/', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${notion}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28"
        },
        body: JSON.stringify({
          "parent": {
            "type": "page_id",
            "page_id": pageId
          },
          "title": [
            {
              "type": "text",
              "text": {
                  "content": title,
                  "link": null
              }
            }
          ],
          "properties": parseData
        }),
      });
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(getAsyncSuccess(response)));
      callback();
    } catch (error) {
      console.error(`${error}`);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(getAsyncError(`${error}`)));
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'notionCreateDatabase', interpreter.createAsyncFunction(wrapper));
}
