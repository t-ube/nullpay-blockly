import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/blockColors';
import xamanPkce from '@/utils/XamanPkce';
import { XummJsonTransaction } from 'xumm-sdk/dist/src/types';

function stringToHex(str:string) {
  return Buffer.from(str, 'utf8').toString('hex');
}

export const defineXamanPaymentBlock = () => {
  Blockly.Blocks['xaman_payment'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("Xaman payment", "bold-label"));
      this.appendValueInput("DESTINATION")
        .setCheck('String')
        .appendField(new Blockly.FieldLabel("Destination address", "args-label"));
      this.appendValueInput("AMOUNT")
        .setCheck('Number')
        .appendField(new Blockly.FieldLabel("Amount (drops)", "args-label"));
      this.appendValueInput("MEMO")
        .setCheck('String')
        .appendField(new Blockly.FieldLabel("Memo (optional)", "args-label"));
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("Payload ID", "args-label"))
        .appendField(new Blockly.FieldVariable("payloadID"), "VAR");
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("Result", "args-label"))
        .appendField(new Blockly.FieldVariable("error"), "ERROR_VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xaman);
      this.setTooltip('Create a payment transaction with Xaman');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xaman_payment'] = function (block, generator) {
    const destination = generator.valueToCode(block, 'DESTINATION', Order.ATOMIC) || '""';
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '0';
    const memo = generator.valueToCode(block, 'MEMO', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xamanCreatePaymentTransaction(${destination}, ${amount}, ${memo}, '', '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const errorVariable = generator.nameDB_.getName(block.getFieldValue('ERROR_VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xamanCreatePaymentTransaction(${destination}, ${amount}, ${memo}, '${variable}', '${errorVariable}');\n`;
    return code;
  };
};

export function initInterpreterXamanPayment(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xamanCreatePaymentTransaction');
  const wrapper = async function (destination:any, amount:any, memo:any, variable:any, errorVariable:any, callback:any) {
    try {
      const state = await xamanPkce.state();
      if (state?.me) {
        const { sdk, me } = state;
        console.log("state", me);
        const request : XummJsonTransaction = {
          TransactionType: "Payment",
          Destination: destination,
          Amount: String(amount)
        };
        if (memo) {
          request.Memos = [{
            Memo: {
              MemoData: stringToHex(memo)
            }
          }];
        }
        const payload = await sdk.payload.create(request);
        interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(payload?.uuid));
        interpreter.setProperty(globalObject, errorVariable, interpreter.nativeToPseudo(0));
      } else {
        throw new Error('Not logged in');
      }
      callback();
    } catch (error) {
      console.error('Error creating Xaman payment transaction:', error);
      interpreter.setProperty(globalObject, errorVariable, interpreter.nativeToPseudo(1));
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xamanCreatePaymentTransaction', interpreter.createAsyncFunction(wrapper));
}
