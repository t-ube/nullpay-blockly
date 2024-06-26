import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { Wallet } from 'xrpl';
import { newTitleLabel, newOutputLabel } from '@/blocks/BlockField';

export const defineXrplCreateAccountBlock = () => {
  Blockly.Blocks['xrpl_create_account'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Generate wallet"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Wallet info"))
        .appendField(new Blockly.FieldVariable("walletInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Create the account');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_create_account'] = function (block, generator) {
    if (generator.nameDB_ === undefined) {
      return `xrplCreateAccount('');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplCreateAccount('${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplCreateAccount(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplCreateAccount');
  const wrapper = function (variable:any, callback:any) {
    const wallet = Wallet.generate();
    const data = {
      address: wallet.classicAddress,
      secret: wallet.seed
    };
    interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
    callback();
  };
  interpreter.setProperty(globalObject, 'xrplCreateAccount', interpreter.createAsyncFunction(wrapper));
}
