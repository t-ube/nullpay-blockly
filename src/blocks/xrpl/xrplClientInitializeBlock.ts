import * as util from 'util';
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { XrplClient } from 'xrpl-client';

interface XRPLClientMap {
  [key: string]: XrplClient;
}

const xrplClientInstances : XRPLClientMap = {};

export const defineXrplClientInitializeBlock = () => {
  Blockly.Blocks['xrpl_client_initialize'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("Initialize client", "bold-label"));
      this.appendValueInput("SERVER")
        .setCheck('String')
        .appendField("Server URI");
      this.appendDummyInput()
        .appendField("XRPL client")
        .appendField(new Blockly.FieldVariable("xrplClient"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Initialize XRPL client');
      this.setHelpUrl('');
    }
  };

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
    const client = new XrplClient(server);
    try {
      xrplClientInstances[variable] = client;
      console.log(`client: ${util.inspect(client, { showHidden: false, depth: null, colors: true })}`);
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

export function getXrplClient(variable:any) {
  return xrplClientInstances[variable];
}
