// xrplSubscribeAccountTxnBlock.ts
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { getXrplClient, setXrplClientEventListner, clearXrplClientEventListner } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { LedgerResponse, Transaction, TransactionMetadata, TransactionStream } from 'xrpl';

export const xrpl_command_subscribe_account_txn : any = {
  "type": "xrpl_command_subscribe_account_txn",
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
      "name": "XRPL_CLIENT",
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
      "name": "SUBSCRIBE_ID",
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
      "name": "TRANSACTION_INFO",
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
    xrpl_command_subscribe_account_txn
  ]);

  javascriptGenerator.forBlock['xrpl_command_subscribe_account_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'SUBSCRIBE_ID', Order.ATOMIC) || '""';
    const accounts = generator.valueToCode(block, 'ACCOUNTS', Order.ATOMIC) || '[]';
    if (generator.nameDB_ === undefined) {
      return `xrplSubscribeAccountTxn(${client}, ${id}, JSON.stringify(${accounts}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('TRANSACTION_INFO'), Blockly.VARIABLE_CATEGORY_NAME);
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


export const xrpl_command_unsubscribe_account_txn : any = {
  "type": "xrpl_command_unsubscribe_account_txn",
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
      "name": "XRPL_CLIENT",
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
      "name": "SUBSCRIBE_ID",
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
    xrpl_command_unsubscribe_account_txn
  ]);

  javascriptGenerator.forBlock['xrpl_command_unsubscribe_account_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'SUBSCRIBE_ID', Order.ATOMIC) || '""';
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


export const xrpl_command_subscribe_streams_all_txn : any = {
  "type": "xrpl_command_subscribe_streams_all_txn",
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
      "name": "XRPL_CLIENT",
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
      "name": "SUBSCRIBE_ID",
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
      "name": "TRANSACTION_INFO",
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
    xrpl_command_subscribe_streams_all_txn
  ]);

  javascriptGenerator.forBlock['xrpl_command_subscribe_streams_all_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'SUBSCRIBE_ID', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplSubscribeAllTxn(${client}, ${id}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('TRANSACTION_INFO'), Blockly.VARIABLE_CATEGORY_NAME);
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


export const xrpl_command_unsubscribe_streams_all_txn : any = {
  "type": "xrpl_command_unsubscribe_streams_all_txn",
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
      "name": "XRPL_CLIENT",
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
      "name": "SUBSCRIBE_ID",
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
    xrpl_command_unsubscribe_streams_all_txn
  ]);

  javascriptGenerator.forBlock['xrpl_command_unsubscribe_streams_all_txn'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'SUBSCRIBE_ID', Order.ATOMIC) || '""';
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

//
export const xrpl_command_subscribe_filtered_transactions : any = {
  "type": "xrpl_command_subscribe_filtered_transactions",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Subscribe to filtered transactions",
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
      "text": "Subscribe ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "SUBSCRIBE_ID",
      "check": "String"
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Transaction types",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "TRANSACTION_TYPES",
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
      "name": "TRANSACTION_INFO",
      "variable": "transactionInfo"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Subscribes to specified transaction types on the XRPL and stores filtered transaction info in the specified variable.",
  "helpUrl": ""
};

export const defineXrplSubscribeFilteredTransactionsBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_subscribe_filtered_transactions
  ]);

  javascriptGenerator.forBlock['xrpl_command_subscribe_filtered_transactions'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'SUBSCRIBE_ID', Order.ATOMIC) || '""';
    const transactionTypes = generator.valueToCode(block, 'TRANSACTION_TYPES', Order.ATOMIC) || '[]';
    if (generator.nameDB_ === undefined) {
      return `xrplSubscribeFilteredTransactions(${client}, ${id}, JSON.stringify(${transactionTypes}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('TRANSACTION_INFO'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplSubscribeFilteredTransactions(${client}, ${id}, JSON.stringify(${transactionTypes}), '${variable}');\n`;
    return code;
  };
};

/*
export function initInterpreterXrplSubscribeFilteredTransactions(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplSubscribeFilteredTransactions');
  const wrapper = async function (clientKey:string, id:string, types:string, variable:any, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        id: `${id}`,
        command: "subscribe",
        streams: ["transactions"],
      });
      var transactionTypes:string[] = JSON.parse(types);
      const listener = async (data: any) => {
        if (transactionTypes.includes(data.transaction.TransactionType)) {
          interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
        }
      };
      setXrplClientEventListner(client, id, 'transaction', listener);
      callback();
    } catch (error) {
      console.error(`Failed to subscribe to filtered transactions: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplSubscribeFilteredTransactions', interpreter.createAsyncFunction(wrapper));
}
*/

export function initInterpreterXrplSubscribeFilteredTransactions(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplSubscribeFilteredTransactions');
  
  const wrapper = async function (clientKey: string, id: string, types: string, variable: any, callback: any) {
    const client = getXrplClient(clientKey);
    let transactionTypes: string[] = JSON.parse(types);
    let lastProcessedLedger = 0;

    function isTransaction(tx: any): tx is Transaction & { metaData?: TransactionMetadata } {
      return typeof tx === 'object' && tx !== null && 'TransactionType' in tx;
    }

    async function processLedger(ledgerIndex: number) {
      try {
        const ledger: LedgerResponse = await client.request({
          command: "ledger",
          ledger_index: ledgerIndex,
          transactions: true,
          expand: true
        });

        if (ledger.result && ledger.result.ledger && Array.isArray(ledger.result.ledger.transactions)) {
          for (const tx of ledger.result.ledger.transactions) {
            if (isTransaction(tx) && transactionTypes.includes(tx.TransactionType)) {
              interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(tx));
            }
          }
        }

        lastProcessedLedger = ledgerIndex;
      } catch (error) {
        console.error(`Error processing ledger ${ledgerIndex}:`, error);
      }
    }

    async function getLatestLedgerSequence(): Promise<number> {
      try {
        const response = await client.request({
          command: "ledger_current"
        });

        if (response.result && typeof response.result.ledger_current_index === 'number') {
          return response.result.ledger_current_index;
        } else {
          throw new Error('Unable to retrieve latest ledger sequence');
        }
      } catch (error) {
        console.error('Error getting current ledger:', error);
        throw error;
      }
    }

    async function setupSubscription() {
      try {
        // 最新のレジャー情報を取得
        lastProcessedLedger = await getLatestLedgerSequence();
        console.log(`Starting from ledger: ${lastProcessedLedger}`);

        // ledgerストリームをサブスクライブ
        await client.request({
          command: "subscribe",
          streams: ["ledger"]
        });
        console.log("Subscribed to ledger stream");

        // 新しいレジャーが閉じられたときのイベントハンドラー
        client.on("ledgerClosed", async (ledger) => {
          if (typeof ledger === 'object' && ledger !== null && 'ledger_index' in ledger) {
            const currentLedger = ledger.ledger_index;
            if (currentLedger > lastProcessedLedger) {
              await processLedger(currentLedger);
            }
          }
        });

        client.on("disconnected", (code) => {
          console.log("Disconnected with code:", code);
          setTimeout(setupSubscription, 5000); // 5秒後に再接続を試みる
        });

      } catch (error) {
        console.error("Error in setupSubscription:", error);
        setTimeout(setupSubscription, 5000); // エラーが発生した場合も5秒後に再試行
      }
    }

    setupSubscription();
    callback();
  };

  interpreter.setProperty(globalObject, 'xrplSubscribeFilteredTransactions', interpreter.createAsyncFunction(wrapper));
}


export const xrpl_command_unsubscribe_filtered_transactions : any = {
  "type": "xrpl_command_unsubscribe_filtered_transactions",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Unsubscribe from filtered transactions",
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
      "text": "Subscribe ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "SUBSCRIBE_ID",
      "check": "String"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Unsubscribes from filtered transactions on the XRPL for the specified client and subscribe ID.",
  "helpUrl": ""
};

export const defineXrplUnsubscribeFilteredTransactionsBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_unsubscribe_filtered_transactions
  ]);

  javascriptGenerator.forBlock['xrpl_command_unsubscribe_filtered_transactions'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'SUBSCRIBE_ID', Order.ATOMIC) || '""';
    const code = `xrplUnsubscribeFilteredTransactions(${client}, ${id});\n`;
    return code;
  };
};

export function initInterpreterXrplUnsubscribeFilteredTransactions(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplUnsubscribeFilteredTransactions');
  const wrapper = async function (clientKey:string, id:string, callback:any) {
    const client = getXrplClient(clientKey);
    try {
      const result = await client.request({
        id: `${id}`,
        command: "unsubscribe",
        streams: ["ledger"]
      });
      clearXrplClientEventListner(client, id, 'transaction');
      console.log(`Unsubscribed from transactions stream: ${JSON.stringify(result)}`);
      callback();
    } catch (error) {
      console.error(`Failed to unsubscribe from filtered transactions: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplUnsubscribeFilteredTransactions', interpreter.createAsyncFunction(wrapper));
}


export const xrpl_command_subscribe_first_ledger_amm_transactions : any = {
  "type": "xrpl_command_subscribe_first_ledger_amm_transactions",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Subscribe all transactions from First Ledger",
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
      "text": "Subscribe ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "SUBSCRIBE_ID",
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
      "name": "TRANSACTION_INFO",
      "variable": "transactionInfo"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Subscribes to specified transaction types on the XRPL and stores filtered transaction info in the specified variable.",
  "helpUrl": ""
};

export const defineXrplSubscribeFirstLedgerAmmTransactionsBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_subscribe_first_ledger_amm_transactions
  ]);

  javascriptGenerator.forBlock['xrpl_command_subscribe_first_ledger_amm_transactions'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'SUBSCRIBE_ID', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplSubscribeFirstLedgerAmmTransactions(${client}, ${id}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('TRANSACTION_INFO'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplSubscribeFirstLedgerAmmTransactions(${client}, ${id}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplFirstLedgerAmmSubscribeTransactions(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplSubscribeFirstLedgerAmmTransactions');
  
  const wrapper = async function (clientKey: string, id: string, variable: any, callback: any) {
    const client = getXrplClient(clientKey);
    let potentialIssuer: string | null = null;
    let AmmIssuer: string | null = null;

    function hexToAscii(hex: string) {
      let ascii = '';
      for (let i = 0; i < hex.length; i += 2) {
        ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      return ascii;
    }

    async function processTransaction(data: any ) {
      var tx : Transaction = data.transaction;
      if (tx.TransactionType === 'AccountSet') {
        if (tx.SetFlag === 8 && tx.Domain) {
          const domain = hexToAscii(tx.Domain);
          if (domain.toLowerCase().includes('firstledger')) {
            potentialIssuer = tx.Account;
            console.log(`Potential issuer found: ${potentialIssuer}`);
          }
        }
      } else if (tx.TransactionType === 'TrustSet' && potentialIssuer) {
        if (tx.LimitAmount && typeof tx.LimitAmount === 'object' && 'issuer' in tx.LimitAmount) {
          if (tx.LimitAmount.issuer === potentialIssuer) {
            console.log(`Matching TrustSet found for issuer: ${potentialIssuer}`);
            interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
            AmmIssuer = potentialIssuer
            potentialIssuer = null
          }
        }
      } else if (tx.TransactionType === 'AMMCreate' && AmmIssuer) {
        if (tx.Amount && typeof tx.Amount === 'object' && 'issuer' in tx.Amount) {
          if (tx.Amount.issuer === AmmIssuer) {
            console.log(`Matching TrustSet found for issuer: ${potentialIssuer}`);
            //interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
            AmmIssuer = null
          }
        }
      }
    }

    async function setupSubscription() {
      try {
        const result = await client.request({
          id: `${id}`,
          command: "subscribe",
          streams: ["transactions"],
        });

        console.log(`Subscribed to transactions: ${JSON.stringify(result)}`);

        const listener = async (data: any) => {
          if (data.transaction && data.transaction.TransactionType) {
            processTransaction(data);
          }
        };

        setXrplClientEventListner(client, id, 'transaction', listener);

        client.on("disconnected", (code) => {
          console.log("Disconnected with code:", code);
          setTimeout(setupSubscription, 5000);
        });

      } catch (error) {
        console.error("Error in setupSubscription:", error);
        setTimeout(setupSubscription, 5000);
      }
    }

    setupSubscription();
    callback();
  };
  
  interpreter.setProperty(globalObject, 'xrplSubscribeFirstLedgerAmmTransactions', interpreter.createAsyncFunction(wrapper));
}

// XPM
export const xrpl_command_subscribe_xpm_amm_transactions : any = {
  "type": "xrpl_command_subscribe_xpm_amm_transactions",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Subscribe all transactions from XPM",
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
      "text": "Subscribe ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "SUBSCRIBE_ID",
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
      "name": "TRANSACTION_INFO",
      "variable": "transactionInfo"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Subscribes to specified transaction types on the XRPL and stores filtered transaction info in the specified variable.",
  "helpUrl": ""
};

export const defineXrplSubscribeXpmAmmTransactionsBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_subscribe_xpm_amm_transactions
  ]);

  javascriptGenerator.forBlock['xrpl_command_subscribe_xpm_amm_transactions'] = function (block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const id = generator.valueToCode(block, 'SUBSCRIBE_ID', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplSubscribeXpmAmmTransactions(${client}, ${id}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('TRANSACTION_INFO'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplSubscribeXpmAmmTransactions(${client}, ${id}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplXpmAmmSubscribeTransactions(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplSubscribeXpmAmmTransactions');
  
  const wrapper = async function (clientKey: string, id: string, variable: any, callback: any) {
    const client = getXrplClient(clientKey);

    async function processTransaction(data: any ) {
      var tx : Transaction = data.transaction;
      if (tx.TransactionType === 'AMMCreate') {
        if (tx.Account === "rXPMxDRxMM6JLk8AMVh569iap3TtnjaF3") {
          console.log("----------------------");
          console.log(tx);
          console.log("----------------------");
          if (tx.Amount2 && typeof tx.Amount2 === 'object' && 'issuer' in tx.Amount2) {
            interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
          }
        }
      }
    }

    async function setupSubscription() {
      try {
        const result = await client.request({
          id: `${id}`,
          command: "subscribe",
          streams: ["transactions"],
        });

        console.log(`Subscribed to transactions: ${JSON.stringify(result)}`);

        const listener = async (data: any) => {
          if (data.transaction && data.transaction.TransactionType) {
            processTransaction(data);
          }
        };

        setXrplClientEventListner(client, id, 'transaction', listener);

        client.on("disconnected", (code) => {
          console.log("Disconnected with code:", code);
          setTimeout(setupSubscription, 5000);
        });

      } catch (error) {
        console.error("Error in setupSubscription:", error);
        setTimeout(setupSubscription, 5000);
      }
    }

    setupSubscription();
    callback();
  };
  
  interpreter.setProperty(globalObject, 'xrplSubscribeXpmAmmTransactions', interpreter.createAsyncFunction(wrapper));
}
