// xrplWalletBlock.ts
import { Wallet as xrplWallet } from 'xrpl';
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { xrplWalletInstances } from '@/blocks/xrpl/xrplWallet';
import { newTitleLabel, newArgsLabel, newOutputLabel, blockCheckType } from '@/blocks/BlockField';

export const defineXrplLoadWalletBlock = () => {
  Blockly.Blocks['xrpl_load_wallet'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Load wallet"));
      this.appendValueInput("SEED")
        .setCheck(blockCheckType.string)
        .appendField(newArgsLabel("Wallet seed"));
      this.appendDummyInput()
        .appendField(newOutputLabel("XRPL wallet"))
        .appendField(new Blockly.FieldVariable("xrplWallet"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Load an XRPL wallet using a seed and store it in a variable');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_load_wallet'] = function (block, generator) {
    const seed = generator.valueToCode(block, 'SEED', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `loadXrplWallet(${seed}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
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
export const defineXrplWalletSignBlock = () => {
  Blockly.Blocks['xrpl_wallet_sign'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Sign wallet"));
      this.appendValueInput("WALLET")
        .setCheck(blockCheckType.string)
        .appendField(newArgsLabel("XRPL wallet"));
      this.appendValueInput("TRANSACTION")
        .setCheck(blockCheckType.json)
        .appendField(newArgsLabel("Transaction"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Signed"))
        .appendField(new Blockly.FieldVariable("signed"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Sign XRPL wallet');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_wallet_sign'] = function (block, generator) {
    const wallet = generator.valueToCode(block, 'WALLET', Order.ATOMIC) || '""';
    const txnJSON = generator.valueToCode(block, 'TRANSACTION', Order.ATOMIC) || '{}';
    if (generator.nameDB_ === undefined) {
      return `signXrplWallet(${wallet}, JSON.stringify(${txnJSON}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
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
export const defineXrplWalletInfoBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
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
          "text": "XRPL wallet",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "WALLET",
          "check": blockCheckType.string
        }
      ],
      "output": blockCheckType.string,
      "inputsInline": false,
      "colour": BlockColors.xrpl,
      "tooltip": "Retrieve information about an XRPL wallet",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_wallet_info'] = function(block, generator) {
    const wallet = generator.valueToCode(block, 'WALLET', Order.NONE) || '""';
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
