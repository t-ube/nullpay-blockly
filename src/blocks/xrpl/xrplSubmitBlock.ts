// xrplSubmitBlock.ts
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { newTitleLabel, newArgsLabel, newOutputLabel, blockCheckType } from '@/blocks/BlockField';
import { getXrplWallet } from '@/blocks/xrpl/xrplWalletBlock';
import { SubmittableTransaction } from 'xrpl';


export const xrpl_command_submit : any = {
  "type": "xrpl_command_submit",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Submit",
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
      "text": "Signed Transaction",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "SIGNED_TRANSACTION",
      "check": "String"
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Result",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "RESULT",
      "variable": "result"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Submit to transaction",
  "helpUrl": ""
};

export const defineXrplClientSubmitBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_submit
  ]);

  javascriptGenerator.forBlock['xrpl_command_submit'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const blobJson = generator.valueToCode(block, 'SIGNED_TRANSACTION', Order.ATOMIC) || '{}';
    if (generator.nameDB_ === undefined) {
      return `xrplClientSubmit(${client}, JSON.stringify(${blobJson}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplClientSubmit(${client}, JSON.stringify(${blobJson}), '${variable}');\n`;
    return code;
  };
};

function isValidBlobJson(input: string): boolean {
  try {
    const obj = JSON.parse(input);
    if (typeof obj !== 'object' || obj === null) return false;
    if (!('tx_blob' in obj)) return false;
    if (typeof obj.tx_blob !== 'string') return false;
    return true;
  } catch (e) {
    return false;
  }
}

export function initInterpreterXrplClientSubmit(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplClientSubmit');
  const wrapper = async function (clientKey:string, blobJsonText:string, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      if (!isValidBlobJson(blobJsonText)) {
        throw new Error('Invalid JSON input');
      }

      const blobJson = JSON.parse(blobJsonText);
      const result = await client.request({
        command: "submit",
        tx_blob: blobJson.tx_blob,
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
export const xrpl_autofill_payload : any = {
  "type": "xrpl_autofill_payload",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Payload auto fill",
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
      "text": "Payload",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "PAYLOAD",
      "check": blockCheckType.xrplTxnPayload
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Filled Payload",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "FILLED_PAYLOAD",
      "variable": "filledPayload"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Auto fill to transaction payload",
  "helpUrl": ""
};

export const defineXrplClientAutoFillBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_autofill_payload
  ]);

  javascriptGenerator.forBlock['xrpl_autofill_payload'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const payload = generator.valueToCode(block, 'PAYLOAD', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplClientAutofill(${client}, JSON.stringify(${payload}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('FILLED_PAYLOAD'), Blockly.VARIABLE_CATEGORY_NAME);
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
export const xrpl_easy_submit : any = {
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
      "name": "XRPL_CLIENT",
      "check": blockCheckType.xrplClient
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "XRPL wallet ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "WALLET_ID",
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
      "name": "RESULT",
      "variable": "result"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Submit a transaction to the XRPL with ease",
  "helpUrl": ""
};

export const defineXrplEasySubmitBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_easy_submit
  ]);

  javascriptGenerator.forBlock['xrpl_easy_submit'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const wallet = generator.valueToCode(block, 'WALLET_ID', Order.ATOMIC) || '""';
    const payloadJSON = generator.valueToCode(block, 'PAYLOAD', Order.ATOMIC) || '{}';
    if (generator.nameDB_ === undefined) {
      return `xrplEasySubmit(${client}, ${wallet}, JSON.stringify(${payloadJSON}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('RESULT'), Blockly.VARIABLE_CATEGORY_NAME);
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
export const xrpl_command_tx : any = {
  "type": "xrpl_command_tx",
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
      "name": "XRPL_CLIENT",
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
      "name": "TRANSACTION",
      "variable": "transaction"
    }
  ],
  "output": blockCheckType.boolean,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Retrieve a transaction from the XRPL using the specified client and transaction hash",
  "helpUrl": ""
};

export const defineXrplTxCommandBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_tx
  ]);

  javascriptGenerator.forBlock['xrpl_command_tx'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const hash = generator.valueToCode(block, 'HASH', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplTxCommand(${client}, ${hash}, '')`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('TRANSACTION'), Blockly.VARIABLE_CATEGORY_NAME);
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
