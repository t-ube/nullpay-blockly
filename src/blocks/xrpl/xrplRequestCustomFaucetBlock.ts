import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { Client, Wallet } from 'xrpl';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';


export const defineXrplRequestCustomFaucetBlock = () => {
  Blockly.Blocks['xrpl_request_custom_faucet'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Create account"));
      this.appendValueInput("CONNECTION")
        .setCheck('String')
        .appendField(newArgsLabel("Network URI"))
      this.appendValueInput("AMOUNT")
        .setCheck('Number')
        .appendField(newArgsLabel("Faucet amount (XRP)"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Faucet info"))
        .appendField(new Blockly.FieldVariable("faucetInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Request custom faucet for the specified XRPL address and amount');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_request_custom_faucet'] = function (block, generator) {
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '""';
    const connection = generator.valueToCode(block, 'CONNECTION', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplRequestCustomFaucet(${amount}, ${connection}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplRequestCustomFaucet(${amount}, ${connection}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterXrplRequestCustomFaucet(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplRequestCustomFaucet');
  const wrapper = async function (amount:any, connection:any, variable:any, callback:any) {
    const client = new Client(connection);
    try {
      await client.connect();
      const newWallet = Wallet.generate();
      const { balance, wallet } = await client.fundWallet(newWallet, {
        amount: amount.toString()
      });
      const data = {
        address: newWallet.classicAddress,
        secret: newWallet.seed,
        balance: balance
      };
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
      console.log(`Sent ${amount} XRP to wallet: ${data.address} from the given faucet. Resulting balance: ${data.balance} XRP`);
      callback();
    } catch (error) {
      console.error(`Failed to fund wallet: ${error}`);
      callback();
    } finally {
      await client.disconnect();
    }
  };
  interpreter.setProperty(globalObject, 'xrplRequestCustomFaucet', interpreter.createAsyncFunction(wrapper));
}
