// xrplWalletBlock.ts
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { Wallet as xrplWallet } from 'xrpl';
import { xrplWalletInstances } from '@/blocks/xrpl/xrplWallet';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';

export const defineXrplLoadWalletBlock = () => {
  Blockly.Blocks['xrpl_load_wallet'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Load wallet"));
      this.appendValueInput("SEED")
        .setCheck('String')
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
        .setCheck('String')
        .appendField(newArgsLabel("XRPL wallet"));
      this.appendValueInput("TRANSACTION")
        .setCheck('JSON')
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
