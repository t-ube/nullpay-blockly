import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';

export const defineXrplAccountInfoApiBlock = () => {
  Blockly.Blocks['xrpl_account_info_api'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("Get account info", "bold-label"));
      this.appendValueInput("NETWORK_WSS")
        .setCheck('String')
        .appendField("Network URI");
      this.appendValueInput("ADDRESS")
        .setCheck('String')
        .appendField("Address");
      this.appendDummyInput()
        .appendField("Account info")
        .appendField(new Blockly.FieldVariable("accountInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Get the account info of the specified address from API and save to a variable');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_account_info_api'] = function (block, generator) {
    const address = generator.valueToCode(block, 'ADDRESS', Order.ATOMIC) || '""';
    const networkWss = generator.valueToCode(block, 'NETWORK_WSS', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `accountInfoApi(${address}, ${networkWss}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `accountInfoApi(${address}, ${networkWss}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterAccountInfoApi(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('accountInfoApi');
  const wrapper = function (address:any, networkWss:any, variable:any, callback:any) {
    fetch(`/api/account/info?network=${networkWss}&account=${address}`)
      .then(response => response.json())
      .then(data => {
        interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
        callback();
      })
      .catch(error => {
        console.error('Error fetching account info:', error);
        callback();
      });
  };
  interpreter.setProperty(globalObject, 'accountInfoApi', interpreter.createAsyncFunction(wrapper));
}
