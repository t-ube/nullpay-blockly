import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { AccountInfoRequest, AccountLinesRequest, AccountLinesResponse } from 'xrpl';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { newTitleLabel, newArgsLabel, newOutputLabel, blockCheckType } from '@/blocks/BlockField';


export const defineXrplAccountInfoBlock = () => {
  Blockly.Blocks['xrpl_account_info'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Get account info"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField(newArgsLabel("XRPL client"));
      this.appendValueInput("ADDRESS")
        .setCheck('String')
        .appendField(newArgsLabel("Account address"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Account info"))
        .appendField(new Blockly.FieldVariable("accountInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Get the account info of the specified address and save to a variable');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_account_info'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const address = generator.valueToCode(block, 'ADDRESS', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplAccountInfo(${client}, ${address}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
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
export const defineXrplAccountLinesCommandBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_account_lines_command",
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
          "name": "CLIENT",
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
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Account lines",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "accountLines"
        }
      ],
      "output": blockCheckType.boolean,
      "inputsInline": false,
      "colour": BlockColors.xrpl,
      "tooltip": "Retrieve information about the trust lines associated with an XRPL account.",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_account_lines_command'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const account = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplAccountLinesCommand(${client}, ${account}, '')`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplAccountLinesCommand(${client}, ${account}, '${variable}')`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplAccountLinesCommand(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplAccountLinesCommand');
  const wrapper = async function (clientKey:string, account:string, variable:any, callback:any) {
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
        interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(transaction.result));
        callback(interpreter.nativeToPseudo(true));
        return;
      }
    } catch (error) {
      console.error('Failed to get transaction:', error);
    }
    callback(interpreter.nativeToPseudo(false));
  };
  interpreter.setProperty(globalObject, 'xrplAccountLinesCommand', interpreter.createAsyncFunction(wrapper));
}