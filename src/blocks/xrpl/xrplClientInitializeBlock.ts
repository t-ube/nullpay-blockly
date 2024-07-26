// xrplClientInitializeBlock.ts
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { xrplClientInstances, xrplClientEventListeners } from '@/blocks/xrpl/xrplClient';
import { Client } from 'xrpl';
import { EventTypes } from 'xrpl/dist/npm/models/methods/subscribe';

export const defineXrplClientInitializeBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_client_initialize",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Initialize client",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Server URI",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "SERVER",
          "check": "String"
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "XRPL client",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "xrplClient"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.xrpl,
      "tooltip": "Initialize XRPL client",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_client_initialize'] = function (block, generator) {
    const server = generator.valueToCode(block, 'SERVER', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `initializeXrplClient(${server}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `initializeXrplClient(${server}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplClientInitialize(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('initializeXrplClient');
  const wrapper = async function (server:string, variable:any, callback:any) {
    const client = new Client(server);
    try {
      await client.connect();
      xrplClientInstances[variable] = client;
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(variable));
      console.log('XRPL Client initialized and connected to server:', server);
      callback();
    } catch (error) {
      console.error('Failed to initialize XRPL client:', error);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'initializeXrplClient', interpreter.createAsyncFunction(wrapper));
}

export function getXrplClient(variable:any) : Client {
  return xrplClientInstances[variable];
}

export function setXrplClientEventListner(client: Client, id:string, type: EventTypes, listener:any) {
  client.on(type, listener);
  if (!xrplClientEventListeners[id]) {
    xrplClientEventListeners[id] = [];
  }
  xrplClientEventListeners[id].push({ type: type, listener });
}

export function clearXrplClientEventListner(client: Client, id:string, type: EventTypes) {
  if (xrplClientEventListeners[id]) {
    xrplClientEventListeners[id] = xrplClientEventListeners[id].filter(eventListener => {
      if (type === eventListener.type) {
        client.off(eventListener.type, eventListener.listener);
        return false;
      }
      return true;
    });

    if (xrplClientEventListeners[id].length === 0) {
      delete xrplClientEventListeners[id];
    }
  }
}
