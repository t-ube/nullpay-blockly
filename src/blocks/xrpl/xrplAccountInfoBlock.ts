import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { AccountInfoRequest, AccountLinesRequest, AccountLinesResponse } from 'xrpl';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { blockCheckType } from '@/blocks/BlockField';


export const xrpl_command_account_info : any = {
  "type": "xrpl_command_account_info",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Get account info",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "XRPL client",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "XRPL_CLIENT",
      "check": "Client"
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Account address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ADDRESS",
      "check": "String"
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Account info",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "ACCOUNT_INFO",
      "variable": "accountInfo"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Get the account info of the specified address and save to a variable",
  "helpUrl": ""
};

export const defineXrplAccountInfoBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_account_info
  ]);

  javascriptGenerator.forBlock['xrpl_command_account_info'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const address = generator.valueToCode(block, 'ADDRESS', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplAccountInfo(${client}, ${address}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('ACCOUNT_INFO'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplAccountInfo(${client}, ${address}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplAccountInfo(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplAccountInfo');
  const wrapper = async function (clientKey:string, address:string, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    if (!client) {
      throw new Error(`Client not found for ID: ${clientKey}`);
    }
    const response: AccountInfoRequest = await client.request({
      command: 'account_info',
      account: `${address}`,
      ledger_index: "current",
      queue: true,
    });
    interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(response));
    callback();
  };
  interpreter.setProperty(globalObject, 'xrplAccountInfo', interpreter.createAsyncFunction(wrapper));
}


// XRPL account_lines command
export const xrpl_command_account_lines : any = {
  "type": "xrpl_command_account_lines",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Get account lines",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "XRPL client",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "XRPL_CLIENT",
      "check": blockCheckType.xrplClient
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Account address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ACCOUNT_ADDRESS",
      "check": blockCheckType.string
    }
  ],
  "message3": "%1 %2 %3",
  "args3": [
    {
      "type": "field_label",
      "text": "Account lines",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "IS_ERROR",
      "variable": "isError"
    },
    {
      "type": "field_variable",
      "name": "ACCOUNT_LINES",
      "variable": "accountLines"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Retrieve information about the trust lines associated with an XRPL account.",
  "helpUrl": ""
};

export const defineXrplAccountLinesCommandBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_account_lines
  ]);

  javascriptGenerator.forBlock['xrpl_command_account_lines'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const account = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplAccountLinesCommand(${client}, ${account}, '');\n`;
    }
    const isError = generator.nameDB_.getName(block.getFieldValue('IS_ERROR'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable = generator.nameDB_.getName(block.getFieldValue('ACCOUNT_LINES'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplAccountLinesCommand(${client}, ${account}, '${isError}', '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplAccountLinesCommand(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplAccountLinesCommand');
  const wrapper = async function (clientKey:string, account:string, isErrorVar:any, variable:any, callback:any) {
    try {
      const client = getXrplClient(clientKey);
      if (!client) {
        throw new Error(`Client not found for ID: ${clientKey}`);
      }
      const transaction = await client.request<AccountLinesRequest, AccountLinesResponse>({
        command: 'account_lines',
        account: account
      });
      if (transaction.result) {
        interpreter.setProperty(globalObject, isErrorVar, false);
        interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(transaction.result));
        callback();
        return;
      }
    } catch (error) {
      console.error('Failed to get transaction:', error);
      interpreter.setProperty(globalObject, isErrorVar, true);
    }
    callback();
  };
  interpreter.setProperty(globalObject, 'xrplAccountLinesCommand', interpreter.createAsyncFunction(wrapper));
}
