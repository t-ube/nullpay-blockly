// xrplWalletBlock.ts
import { Wallet as xrplWallet, walletFromSecretNumbers } from 'xrpl';
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { xrplWalletInstances } from '@/blocks/xrpl/xrplWallet';
import { blockCheckType } from '@/blocks/BlockField';
import { Account, Utils } from 'xrpl-secret-numbers';

export const xrpl_load_wallet : any = {
  "type": "xrpl_load_wallet",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Load wallet from seed",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Wallet seed",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "WALLET_SEED",
      "check": blockCheckType.string
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "XRPL wallet ID",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "WALLET_ID",
      "variable": "walletID"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Load an XRPL wallet using a seed and store it in a variable",
  "helpUrl": ""
};

export const defineXrplLoadWalletBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_load_wallet
  ]);

  javascriptGenerator.forBlock['xrpl_load_wallet'] = function (block, generator) {
    const seed = generator.valueToCode(block, 'WALLET_SEED', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `loadXrplWallet(${seed}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('WALLET_ID'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `loadXrplWallet(${seed}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplLoadWallet(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('loadXrplWallet');
  const wrapper = async function (seed:string, variable:any, callback:any) {
    const wallet = xrplWallet.fromSeed(seed);
    try {
      xrplWalletInstances[variable] = wallet;
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(variable));
      console.log('Load XRPL wallet :', wallet.address);
      callback();
    } catch (error) {
      console.error('Failed to load XRPL wallet:', error);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'loadXrplWallet', interpreter.createAsyncFunction(wrapper));
}

export function getXrplWallet(variable:any) : xrplWallet {
  return xrplWalletInstances[variable];
}

// Sign
export const xrpl_wallet_sign : any = {
  "type": "xrpl_wallet_sign",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Sign wallet",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
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
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Filled Payload",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "FILLED_PAYLOAD",
      "check": blockCheckType.json
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Signed Transaction",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "SIGNED_TRANSACTION",
      "variable": "signedTxn"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Sign XRPL wallet",
  "helpUrl": ""
};

export const defineXrplWalletSignBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_wallet_sign
  ]);
 
  javascriptGenerator.forBlock['xrpl_wallet_sign'] = function (block, generator) {
    const wallet = generator.valueToCode(block, 'WALLET_ID', Order.ATOMIC) || '""';
    const txnJSON = generator.valueToCode(block, 'FILLED_PAYLOAD', Order.ATOMIC) || '{}';
    if (generator.nameDB_ === undefined) {
      return `signXrplWallet(${wallet}, JSON.stringify(${txnJSON}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('SIGNED_TRANSACTION'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `signXrplWallet(${wallet}, JSON.stringify(${txnJSON}), '${variable}');\n`;
    return code;
  };
};
  
export function initInterpreterXrplWalletSign(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('signXrplWallet');
  const wrapper = async function (walletID:string, txJSON:string, variable:any, callback:any) {
    const wallet = getXrplWallet(walletID);
    if (!wallet) {
      throw new Error(`Wallet not found for ID: ${walletID}`);
    }
    try {
      console.log('Txn base :', txJSON);
      const signed = wallet.sign(JSON.parse(txJSON));
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(signed));
      console.log('Signed Txn blob :', signed.tx_blob);
      callback();
    } catch (error) {
      console.error('Failed to sign XRPL wallet:', error);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'signXrplWallet', interpreter.createAsyncFunction(wrapper));
}

// Wallet Info
export const xrpl_wallet_info : any = {
  "type": "xrpl_wallet_info",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Wallet info",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
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
  "output": blockCheckType.json,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Retrieve information about an XRPL wallet",
  "helpUrl": ""
};

export const defineXrplWalletInfoBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_wallet_info
  ]);

  javascriptGenerator.forBlock['xrpl_wallet_info'] = function(block, generator) {
    const wallet = generator.valueToCode(block, 'WALLET_ID', Order.NONE) || '""';
    const code = `xrplWalletInfo(${wallet})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplWalletInfo(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplWalletInfo');
  const wrapper = function (walletID: string) {
    try {
      console.log(walletID);
      const wallet = getXrplWallet(walletID);
      if (!wallet) {
        throw new Error(`Wallet not found for ID: ${walletID}`);
      }
      const walletInfo = {
        address : wallet.classicAddress,
        secret : wallet.seed,
      };
      return interpreter.nativeToPseudo(walletInfo);
    } catch (error) {
      console.error('Failed to sign XRPL wallet:', error);
    }
  };
  interpreter.setProperty(globalObject, 'xrplWalletInfo', interpreter.createNativeFunction(wrapper));
}


export const xrpl_generate_wallet : any = {
  "type": "xrpl_generate_wallet",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Generate wallet",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Wallet info",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "WALLET_INFO",
      "variable": "walletInfo"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Create the account",
  "helpUrl": ""
};

export const defineXrplCreateAccountBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_generate_wallet
  ]);

  javascriptGenerator.forBlock['xrpl_generate_wallet'] = function (block, generator) {
    if (generator.nameDB_ === undefined) {
      return `xrplCreateAccount('');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('WALLET_INFO'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplCreateAccount('${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplCreateAccount(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplCreateAccount');
  const wrapper = function (variable:any, callback:any) {
    const wallet = xrplWallet.generate();
    const data = {
      address: wallet.classicAddress,
      secret: wallet.seed
    };
    interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
    callback();
  };
  interpreter.setProperty(globalObject, 'xrplCreateAccount', interpreter.createAsyncFunction(wrapper));
}

export const xrpl_load_wallet_from_secret_numbers : any = {
  "type": "xrpl_load_wallet_from_secret_numbers",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Load wallet from secret numbers",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Secret numbers",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "SECRET_NUMBERS",
      "check": blockCheckType.string
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "XRPL wallet ID",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "WALLET_ID",
      "variable": "walletID"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Load an XRPL wallet using secret numbers and store it in a variable",
  "helpUrl": ""
};

export const defineXrplLoadWalletFromSecretNumbersBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_load_wallet_from_secret_numbers
  ]);

  javascriptGenerator.forBlock['xrpl_load_wallet_from_secret_numbers'] = function(block, generator) {
    const secretNumbers = generator.valueToCode(block, 'SECRET_NUMBERS', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `loadXrplWalletFromSecretNumbers(${secretNumbers}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('WALLET_ID'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `loadXrplWalletFromSecretNumbers(${secretNumbers}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplLoadWalletFromSecretNumbers(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('loadXrplWalletFromSecretNumbers');
  const wrapper = async function (secretNumbersString: string, variable:any, callback:any) {
    const secretNumbers = secretNumbersString.split(/\s+/);
    const wallet = walletFromSecretNumbers(secretNumbers);
    try {
      xrplWalletInstances[variable] = wallet;
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(variable));
      console.log('Load XRPL wallet :', wallet.address);
      callback();
    } catch (error) {
      console.error('Failed to load XRPL wallet:', error);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'loadXrplWalletFromSecretNumbers', interpreter.createAsyncFunction(wrapper));
}
