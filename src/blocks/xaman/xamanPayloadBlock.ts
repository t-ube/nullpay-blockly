import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import xamanPkce from '@/utils/XamanPkce';
import { XummJsonTransaction } from 'xumm-sdk/dist/src/types';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';
import { getBlockSuccess, getBlockError } from '@/blocks/BlockResult';

function stringToHex(str:string) {
  return Buffer.from(str, 'utf8').toString('hex');
}

export const defineXamanPaymentBlock = () => {
  Blockly.Blocks['xaman_payment'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Xaman payment"));
      this.appendValueInput("DESTINATION")
        .setCheck('String')
        .appendField(newArgsLabel("Destination address"));
      this.appendValueInput("AMOUNT")
        .setCheck('Number')
        .appendField(newArgsLabel("Amount (drops)"));
      this.appendValueInput("MEMO")
        .setCheck('String')
        .appendField(newArgsLabel("Memo (optional)"));
      this.appendDummyInput()
        .appendField(newOutputLabel("Payload ID"))
        .appendField(new Blockly.FieldVariable("payloadID"), "VAR");
      this.appendDummyInput()
        .appendField(newOutputLabel("Result"))
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

export const defineXamanWaitForSignatureBlock = () => {
  Blockly.Blocks['xaman_wait_for_signature'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Wait for Xaman signature"));
      this.appendValueInput("PAYLOAD")
        .appendField(newArgsLabel("Payload ID"));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xaman);
      this.setTooltip('Wait for the Xaman transaction to be signed');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xaman_wait_for_signature'] = function (block, generator) {
    const payload = generator.valueToCode(block, 'PAYLOAD', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xamanWaitForSignature(${payload});\n`;
    }
    const code = `xamanWaitForSignature(${payload});\n`;
    return code;
  };
};

export function initInterpreterXamanWaitForSignatureBlock(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xamanWaitForSignature');
  const wrapper = async function (payloadID:any, callback:any) {
    try {
      const state = await xamanPkce.state();
      if (state?.me) {
        const { sdk, me } = state;
        try {
          const subscribe = await sdk.payload.subscribe(payloadID, (event:any) => {
            if(Object.keys(event.data).indexOf('signed') > -1) {
              return event.data;
            }
          })

          subscribe.websocket.onclose = function(event) {
            if (event.code !== 1000) {
              console.error('WebSocket closed with error:', event);
            } else {
              console.log('WebSocket closed successfully.');
            }
            callback();
          };
        
          const resolvedData:any = await subscribe.resolved;
          
          if(resolvedData.signed == false) {
            console.log("Signed request rejected");
          } else {
            console.log("Signed request signed");
          }

          if (subscribe.websocket.readyState === WebSocket.OPEN ||
            subscribe.websocket.readyState === WebSocket.CONNECTING) {
            subscribe.websocket.close(1000, 'Normal closure');
          }
        } catch (error) {
          console.error('Error waiting for Xaman signature:', error);
          callback();
        }
      } else {
        callback();
      }
    } catch (error) {
      console.error('Error retrieving Xaman state:', error);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xamanWaitForSignature', interpreter.createAsyncFunction(wrapper));
}


export const defineXamanPayloadSetBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xaman_payload_set",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Xaman set payload",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Payload",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "PAYLOAD",
          "check": [blockCheckType.xrplTxnPayload, blockCheckType.json]
        }
      ],
      "message2": "%1 %2 %3",
      "args2": [
        {
          "type": "field_label",
          "text": "Result",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "STATUS",
          "variable": "status"
        },
        {
          "type": "field_variable",
          "name": "PAYLOAD_ID",
          "variable": "payloadID"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.xaman,
      "tooltip": "Create a new Xaman transaction payload to be used for an XRPL transaction. Requires a JSON payload object as input.",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xaman_payload_set'] = function(block, generator) {
    const payload = generator.valueToCode(block, 'PAYLOAD', Order.NONE) || '{}';
    if (generator.nameDB_ === undefined) {
      return `xamanPayloadSet(JSON.stringify(${payload}),'','');\n`;
    }
    const status = generator.nameDB_.getName(block.getFieldValue('STATUS'), Blockly.VARIABLE_CATEGORY_NAME);
    const payloadID = generator.nameDB_.getName(block.getFieldValue('PAYLOAD_ID'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xamanPayloadSet(JSON.stringify(${payload}),'${status}','${payloadID}');\n`;
    return code;
  };
};

export function initInterpreterXamanPayloadSet(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xamanPayloadSet');
  const wrapper = async function (payloadText: string, statusVar:any, responseVar:any, callback:any) {
    try {
      const state = await xamanPkce.state();
      if (state?.me) {
        const payload = JSON.parse(payloadText);
        const { sdk, me } = state;
        const request : XummJsonTransaction = payload;
        const xamanPayload = await sdk.payload.create(request);
        interpreter.setProperty(globalObject, statusVar, interpreter.nativeToPseudo(getBlockSuccess()));
        interpreter.setProperty(globalObject, responseVar, interpreter.nativeToPseudo(xamanPayload?.uuid));
      } else {
        throw new Error('Not logged in');
      }
      callback();
    } catch (error) {
      const message = 'Failed to get payload';
      console.error(`${message}: ${payloadText}`, error);
      interpreter.setProperty(globalObject, statusVar, interpreter.nativeToPseudo(getBlockError(message)));
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xamanPayloadSet', interpreter.createAsyncFunction(wrapper));
}
