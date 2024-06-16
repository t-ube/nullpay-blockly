import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { AccountInfoRequest } from 'xrpl';
import { getXrplClient } from '@/blocks/xrpl/xrplClientInitializeBlock';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';

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
        .appendField(newArgsLabel("Address"));
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
