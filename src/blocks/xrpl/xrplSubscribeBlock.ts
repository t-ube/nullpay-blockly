// xrplSubscribeAccountTxnBlock.ts
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient, setXrplClientEventListner, clearXrplClientEventListner } from '@/blocks/xrpl/xrplClientInitializeBlock';

export const xrpl_subscribe_account_txn : any = {
  "type": "xrpl_subscribe_account_txn",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Subscribe account transactions",
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
      "check": "Client"
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Subscribe ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ID",
      "check": "String"
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "XRPL address list",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ACCOUNTS",
      "check": "Array"
    }
  ],
  "message4": "%1 %2",
  "args4": [
    {
      "type": "field_label",
      "text": "Transaction info",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "transactionInfo"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Subscribe to transactions for a specific account on XRPL",
  "helpUrl": ""
};

export const defineXrplSubscribeAccountTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_subscribe_account_txn
  ]);

  javascriptGenerator.forBlock['xrpl_subscribe_account_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'ID', Order.ATOMIC) || '""';
    const accounts = generator.valueToCode(block, 'ACCOUNTS', Order.ATOMIC) || '[]';
    if (generator.nameDB_ === undefined) {
      return `xrplSubscribeAccountTxn(${client}, ${id}, JSON.stringify(${accounts}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplSubscribeAccountTxn(${client}, ${id}, JSON.stringify(${accounts}), '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplSubscribeAccountTxn(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplSubscribeAccountTxn');
  const wrapper = async function (clientKey:string, id:string, accounts:any, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        id: `${id}`,
        command: "subscribe",
        accounts: JSON.parse(accounts),
      });
      console.log(`Subscribed to accounts transactions: ${JSON.parse(accounts)}, ${JSON.stringify(result)}`);
      const listener = async (data: any) => {
        interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
      };
      setXrplClientEventListner(client, id, 'transaction', listener);
      callback();
    } catch (error) {
      console.error(`Failed to subscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplSubscribeAccountTxn', interpreter.createAsyncFunction(wrapper));
}


export const xrpl_unsubscribe_account_txn : any = {
  "type": "xrpl_unsubscribe_account_txn",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Unsubscribe account transactions",
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
      "check": "Client"
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Subscribe ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ID",
      "check": "String"
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "XRPL address list",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ACCOUNTS",
      "check": "Array"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Unsubscribe to transactions for a specific account on XRPL",
  "helpUrl": ""
};

export const defineXrplUnsubscribeAccountTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_unsubscribe_account_txn
  ]);

  javascriptGenerator.forBlock['xrpl_unsubscribe_account_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'ID', Order.ATOMIC) || '""';
    const accounts = generator.valueToCode(block, 'ACCOUNTS', Order.ATOMIC) || '[]';
    const code = `xrplUnsubscribeAccountTxn(${client}, ${id}, JSON.stringify(${accounts}));\n`;
    return code;
  };
};

export function initInterpreterXrplUnsubscribeAccountTxn(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplUnsubscribeAccountTxn');
  const wrapper = async function (clientKey:string, id:string, accounts:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        id: `${id}`,
        command: "unsubscribe",
        accounts: JSON.parse(accounts),
      });
      console.log(`Unsubscribed to account transactions: ${JSON.parse(accounts)} , ${JSON.stringify(result)}`);
      clearXrplClientEventListner(client, id, 'transaction');
      callback();
    } catch (error) {
      console.error(`Failed to subscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplUnsubscribeAccountTxn', interpreter.createAsyncFunction(wrapper));
}


export const xrpl_subscribe_all_txn : any = {
  "type": "xrpl_subscribe_all_txn",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Subscribe all transactions",
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
      "check": "Client"
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Subscribe ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ID",
      "check": "String"
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Transaction info",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "transactionInfo"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Subscribes to all transactions on the XRPL and stores transaction info in the specified variable.",
  "helpUrl": ""
};

export const defineXrplSubscribeAllTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_subscribe_all_txn
  ]);

  javascriptGenerator.forBlock['xrpl_subscribe_all_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'ID', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplSubscribeAllTxn(${client}, ${id}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplSubscribeAllTxn(${client}, ${id}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplSubscribeAllTxn(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplSubscribeAllTxn');
  const wrapper = async function (clientKey:string, id:string, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        id: `${id}`,
        command: "subscribe",
        streams: ["transactions"],
      });
      console.log(`Subscribed to streams: ${JSON.stringify(result)}`);
      const listener = async (data: any) => {
        interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
      };
      setXrplClientEventListner(client, id, 'transaction', listener);
      callback();
    } catch (error) {
      console.error(`Failed to subscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplSubscribeAllTxn', interpreter.createAsyncFunction(wrapper));
}


export const xrpl_unsubscribe_all_txn : any = {
  "type": "xrpl_unsubscribe_all_txn",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Unsubscribe all transactions",
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
      "check": "Client"
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Subscribe ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ID",
      "check": "String"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Unsubscribes from all transactions on the XRPL for the specified client and subscribe ID.",
  "helpUrl": ""
};

export const defineXrplUnsubscribeAllTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_unsubscribe_all_txn
  ]);

  javascriptGenerator.forBlock['xrpl_unsubscribe_all_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'ID', Order.ATOMIC) || '""';
    const code = `xrplUnsubscribeAllTxn(${client}, ${id});\n`;
    return code;
  };
};

export function initInterpreterXrplUnsubscribeAllTxn(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplUnsubscribeAllTxn');
  const wrapper = async function (clientKey:string, id:string, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        id: `${id}`,
        command: "unsubscribe",
        streams: ["transactions"],
      });
      clearXrplClientEventListner(client, id, 'transaction');
      callback();
    } catch (error) {
      console.error(`Failed to unsubscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplUnsubscribeAllTxn', interpreter.createAsyncFunction(wrapper));
}
