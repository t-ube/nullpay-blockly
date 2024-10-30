import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import {
  AccountInfoRequest,
  AccountLinesRequest, AccountLinesResponse,
  AccountTxRequest, AccountTxResponse
} from 'xrpl';
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

export const xrpl_command_get_account_activators: any = {
  "type": "xrpl_command_get_account_activators",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Get account activators",
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
      "text": "Result",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "IS_ERROR",
      "variable": "isError"
    },
    {
      "type": "field_variable",
      "name": "ACTIVATORS",
      "variable": "activators"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Get the account that activated this wallet (searches from latest transactions)",
  "helpUrl": ""
};

export const defineXrplGetAccountActivatorsBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_get_account_activators
  ]);

  javascriptGenerator.forBlock['xrpl_command_get_account_activators'] = function(block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const account = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplGetAccountActivators(${client}, ${account}, '', '');\n`;
    }
    const isError = generator.nameDB_.getName(block.getFieldValue('IS_ERROR'), Blockly.VARIABLE_CATEGORY_NAME);
    const variable = generator.nameDB_.getName(block.getFieldValue('ACTIVATORS'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplGetAccountActivators(${client}, ${account}, '${isError}', '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplGetAccountActivators(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplGetAccountActivators');
  const wrapper = async function(clientKey: string, accountAddress: string, isErrorVar: any, variable: any, callback: any) {
    try {
      const client = getXrplClient(clientKey);
      if (!client) {
        throw new Error(`Client not found for ID: ${clientKey}`);
      }

      // アカウント情報を取得して検証
      const accountInfo = await client.request({
        command: 'account_info',
        account: accountAddress,
        ledger_index: 'validated'
      });

      const ledgerIndex = accountInfo.result.ledger_index;
      let activator: string | null = null;
      let marker: unknown = undefined;

      do {
        const response = await client.request<AccountTxRequest, AccountTxResponse>({
          command: 'account_tx',
          account: accountAddress,
          forward: true,
          ledger_index_max: ledgerIndex,
          limit: 200,
          marker: marker
        });

        for (const tx of response.result.transactions) {
          const transaction = tx.tx;
          
          // Paymentトランザクションのみを処理
          if (
            transaction != undefined &&
            transaction.TransactionType === 'Payment' &&
            !('DestinationTag' in transaction) &&
            Number(transaction.Amount) >= 10000000
          ) {
            activator = transaction.Account;
            break;
          }
        }

        if (activator) {
          break;
        }

        marker = response.result.marker;
      } while (marker);

      interpreter.setProperty(globalObject, isErrorVar, false);
      // アクティベーターが見つかった場合は配列に入れて返す
      const result = activator ? [activator] : [];
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(result));
    } catch (error) {
      console.error('Failed to get activator:', error);
      interpreter.setProperty(globalObject, isErrorVar, true);
      // エラー時は空配列を返す
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo([]));
    }
    callback();
  };
  interpreter.setProperty(globalObject, 'xrplGetAccountActivators', interpreter.createAsyncFunction(wrapper));
}

export const xrpl_command_get_activated_accounts: any = {
  "type": "xrpl_command_get_activated_accounts",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Get activated accounts",
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
      "text": "Activator address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ACTIVATOR_ADDRESS",
      "check": blockCheckType.string
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Limit (0 for all)",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "LIMIT",
      "check": blockCheckType.number
    }
  ],
  "message4": "%1 %2 %3",
  "args4": [
    {
      "type": "field_label",
      "text": "Result",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "IS_ERROR",
      "variable": "isError"
    },
    {
      "type": "field_variable",
      "name": "ACTIVATED_ACCOUNTS",
      "variable": "activatedAccounts"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Get the list of accounts activated by this address",
  "helpUrl": ""
};

export const defineXrplGetActivatedAccountsBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_command_get_activated_accounts
  ]);

  javascriptGenerator.forBlock['xrpl_command_get_activated_accounts'] = function(block, generator) {
    const client = generator.valueToCode(block, 'XRPL_CLIENT', Order.ATOMIC) || '""';
    const activator = generator.valueToCode(block, 'ACTIVATOR_ADDRESS', Order.ATOMIC) || '""';
    const limit = generator.valueToCode(block, 'LIMIT', Order.ATOMIC) || '0';
    if (generator.nameDB_ === undefined) {
      return `xrplGetActivatedAccounts(${client}, ${activator}, ${limit}, '', '');\n`;
    }
    const isError = generator.nameDB_.getName(block.getFieldValue('IS_ERROR'), Blockly.VARIABLE_CATEGORY_NAME);
    const accounts = generator.nameDB_.getName(block.getFieldValue('ACTIVATED_ACCOUNTS'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplGetActivatedAccounts(${client}, ${activator}, ${limit}, '${isError}', '${accounts}');\n`;
    return code;
  };
};

interface ActivatedAccount {
  address: string;
  date: string;
  amount: string;
  txHash: string;
}

export function initInterpreterXrplGetActivatedAccounts(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplGetActivatedAccounts');
  const wrapper = async function(
    clientKey: string, 
    activatorAddress: string, 
    limit: number, 
    isErrorVar: any, 
    accountsVar: any, 
    callback: any
  ) {
    try {
      const client = getXrplClient(clientKey);
      if (!client) {
        throw new Error(`Client not found for ID: ${clientKey}`);
      }

      const activatedAccounts: ActivatedAccount[] = [];
      let marker: unknown = undefined;
      let shouldContinue = true;

      do {
        const response = await client.request<AccountTxRequest, AccountTxResponse>({
          command: 'account_tx',
          account: activatorAddress,
          forward: false, // 新しい取引から検索（処理中断が容易）
          limit: 200,
          marker: marker
        });

        for (const tx of response.result.transactions) {
          const transaction = tx.tx;
          
          // アクティベーション条件をチェック
          if (
            transaction != undefined &&
            transaction.TransactionType === 'Payment' &&
            !('DestinationTag' in transaction) &&
            Number(transaction.Amount) >= 10000000 && // 10 XRP以上
            transaction.Destination && // 送金先アドレスが存在する
            transaction.Destination != activatorAddress
          ) {
            console.log(transaction);

            const amountInDrops = typeof transaction.Amount === 'string' 
              ? transaction.Amount 
              : transaction.Amount.value;

            activatedAccounts.push({
              address: transaction.Destination,
              date: new Date(transaction.date ? (transaction.date + 946684800) * 1000 : 0).toISOString(),
              amount: amountInDrops,
              txHash: transaction.hash || ''
            });

            // 指定された制限に達した場合、検索を終了
            if (limit > 0 && activatedAccounts.length >= limit) {
              shouldContinue = false;
              break;
            }
          }
        }

        marker = response.result.marker;
      } while (marker && shouldContinue);

      interpreter.setProperty(globalObject, isErrorVar, false);
      interpreter.setProperty(globalObject, accountsVar, interpreter.nativeToPseudo(activatedAccounts));
    } catch (error) {
      console.error('Failed to get activated accounts:', error);
      interpreter.setProperty(globalObject, isErrorVar, true);
      interpreter.setProperty(globalObject, accountsVar, interpreter.nativeToPseudo([]));
    }
    callback();
  };
  interpreter.setProperty(globalObject, 'xrplGetActivatedAccounts', interpreter.createAsyncFunction(wrapper));
}
