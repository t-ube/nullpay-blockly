// xrplSubmitBlock.ts
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { newTitleLabel, newArgsLabel, newOutputLabel, blockCheckType } from '@/blocks/BlockField';
import { getXrplWallet } from '@/blocks/xrpl/xrplWalletBlock';
import { SubmittableTransaction } from 'xrpl';

export const defineXrplClientSubmitBlock = () => {
  Blockly.Blocks['xrpl_client_submit'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Submit"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField(newArgsLabel("XRPL client"));
      this.appendValueInput("BLOB")
        .setCheck('String')
        .appendField(newArgsLabel("Transaction BLOB"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Result"))
        .appendField(new Blockly.FieldVariable("result"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Submit to transaction');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_client_submit'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const blob = generator.valueToCode(block, 'BLOB', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplClientSubmit(${client}, ${blob}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplClientSubmit(${client}, ${blob}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplClientSubmit(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplClientSubmit');
  const wrapper = async function (clientKey:string, blob:string, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        command: "submit",
        tx_blob: blob,
      });
      console.log(`Submit transactions: ${JSON.stringify(result)}`);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(result));
      callback();
    } catch (error) {
      console.error(`Failed to subscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplClientSubmit', interpreter.createAsyncFunction(wrapper));
}

// AutoFill
export const defineXrplClientAutoFillBlock = () => {
  Blockly.Blocks['xrpl_client_autofill'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Payload auto fill"));
      this.appendValueInput("CLIENT")
        .setCheck('Client')
        .appendField(newArgsLabel("XRPL client"));
      this.appendValueInput("PAYLOAD")
        .setCheck(blockCheckType.xrplTxnPayload)
        .appendField(newArgsLabel("Payload"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Filled Payload"))
        .appendField(new Blockly.FieldVariable("filledPayload"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Auto fill to transaction payload');
      this.setHelpUrl('');
    }
  };
  
  javascriptGenerator.forBlock['xrpl_client_autofill'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const payload = generator.valueToCode(block, 'PAYLOAD', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplClientAutofill(${client}, JSON.stringify(${payload}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplClientAutofill(${client}, JSON.stringify(${payload}), '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplClientAutofill(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplClientAutofill');
  const wrapper = async function (clientKey:string, payloadText:string, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const payload = JSON.parse(payloadText) as SubmittableTransaction;
      const filledPayload = await client.autofill(payload);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(filledPayload));
      callback();
    } catch (error) {
      console.error(`Failed to auto fill: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplClientAutofill', interpreter.createAsyncFunction(wrapper));
}

// Auto fill and Sign and Submit
export const defineXrplEasySubmitBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_easy_submit",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Easy submit",
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
          "text": "XRPL wallet",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "WALLET",
          "check": blockCheckType.string
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Payload",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "PAYLOAD",
          "check": blockCheckType.xrplTxnPayload
        }
      ],
      "message4": "%1 %2",
      "args4": [
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
      "colour": BlockColors.xrpl,
      "tooltip": "Submit a transaction to the XRPL with ease",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_easy_submit'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const wallet = generator.valueToCode(block, 'WALLET', Order.ATOMIC) || '""';
    const payloadJSON = generator.valueToCode(block, 'PAYLOAD', Order.ATOMIC) || '{}';
    if (generator.nameDB_ === undefined) {
      return `xrplEasySubmit(${client}, ${wallet}, JSON.stringify(${payloadJSON}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplEasySubmit(${client}, ${wallet}, JSON.stringify(${payloadJSON}), '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplEasySubmit(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplEasySubmit');
  const wrapper = async function (clientKey:string, walletID:string, payloadJSON:string, variable:any, callback:any) {
    try {
      const client = getXrplClient(clientKey);
      if (!client) {
        throw new Error(`Client not found for ID: ${clientKey}`);
      }
      const wallet = getXrplWallet(walletID);
      if (!wallet) {
        throw new Error(`Wallet not found for ID: ${walletID}`);
      }
      const filledPayload = await client.autofill(JSON.parse(payloadJSON));
      const result = await client.submitAndWait(filledPayload,{ wallet: wallet });
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(result));
      callback();
    } catch (error) {
      console.error('Failed to sign XRPL wallet:', error);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplEasySubmit', interpreter.createAsyncFunction(wrapper));
}

// XRPL tx command
export const defineXrplTxCommandBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_tx_command",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Get validated transaction",
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
          "text": "Hash",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "HASH",
          "check": blockCheckType.string
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Transaction (validated)",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "transaction"
        }
      ],
      "output": blockCheckType.boolean,
      "inputsInline": false,
      "colour": BlockColors.xrpl,
      "tooltip": "Retrieve a transaction from the XRPL using the specified client and transaction hash",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_tx_command'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const hash = generator.valueToCode(block, 'HASH', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplTxCommand(${client}, ${hash}, '')`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplTxCommand(${client}, ${hash}, '${variable}')`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplTxCommand(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplTxCommand');
  const wrapper = async function (clientKey:string, hash:string, variable:any, callback:any) {
    try {
      const client = getXrplClient(clientKey);
      if (!client) {
        throw new Error(`Client not found for ID: ${clientKey}`);
      }
      const transaction = await client.request({
        command: 'tx',
        transaction: hash
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
  interpreter.setProperty(globalObject, 'xrplTxCommand', interpreter.createAsyncFunction(wrapper));
}
