import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import xamanPkce from '@/utils/XamanPkce';
import { XummJsonTransaction } from 'xumm-sdk/dist/src/types';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { getBlockSuccess, getBlockError } from '@/blocks/BlockResult';

function stringToHex(str:string) {
  return Buffer.from(str, 'utf8').toString('hex');
}

export const xaman_payment : any = {
  "type": "xaman_payment",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Xaman simple payment",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Destination address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "DESTINATION",
      "check": "String"
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Amount (drops)",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Memo (optional)",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "MEMO",
      "check": "String"
    }
  ],
  "message4": "%1 %2",
  "args4": [
    {
      "type": "field_label",
      "text": "Payload ID",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "PAYLOAD_ID",
      "variable": "payloadID"
    }
  ],
  "message5": "%1 %2",
  "args5": [
    {
      "type": "field_label",
      "text": "Result",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "IS_ERROR",
      "variable": "isError"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xaman,
  "tooltip": "Create a payment transaction with Xaman",
  "helpUrl": ""
};

export const defineXamanPaymentBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xaman_payment
  ]);

  javascriptGenerator.forBlock['xaman_payment'] = function (block, generator) {
    const destination = generator.valueToCode(block, 'DESTINATION', Order.ATOMIC) || '""';
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '0';
    const memo = generator.valueToCode(block, 'MEMO', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xamanCreatePaymentTransaction(${destination}, ${amount}, ${memo}, '', '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('PAYLOAD_ID'), Blockly.VARIABLE_CATEGORY_NAME);
    const errorVariable = generator.nameDB_.getName(block.getFieldValue('IS_ERROR'), Blockly.VARIABLE_CATEGORY_NAME);
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
        interpreter.setProperty(globalObject, errorVariable, false);
      } else {
        throw new Error('Not logged in');
      }
      callback();
    } catch (error) {
      console.error('Error creating Xaman payment transaction:', error);
      interpreter.setProperty(globalObject, errorVariable, true);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xamanCreatePaymentTransaction', interpreter.createAsyncFunction(wrapper));
}


export const xaman_wait_for_signature : any = {
  "type": "xaman_wait_for_signature",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Wait for Xaman signature",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Payload ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "PAYLOAD_ID"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xaman,
  "tooltip": "Wait for the Xaman transaction to be signed",
  "helpUrl": ""
};

export const defineXamanWaitForSignatureBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xaman_wait_for_signature
  ]);

  javascriptGenerator.forBlock['xaman_wait_for_signature'] = function (block, generator) {
    const payload = generator.valueToCode(block, 'PAYLOAD_ID', Order.ATOMIC) || '""';
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


export const xaman_payload_set : any = {
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
      "name": "IS_ERROR",
      "variable": "isError"
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
};

export const defineXamanPayloadSetBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xaman_payload_set
  ]);

  javascriptGenerator.forBlock['xaman_payload_set'] = function(block, generator) {
    const payload = generator.valueToCode(block, 'PAYLOAD', Order.NONE) || '{}';
    if (generator.nameDB_ === undefined) {
      return `xamanPayloadSet(JSON.stringify(${payload}),'','');\n`;
    }
    const isError = generator.nameDB_.getName(block.getFieldValue('IS_ERROR'), Blockly.VARIABLE_CATEGORY_NAME);
    const payloadID = generator.nameDB_.getName(block.getFieldValue('PAYLOAD_ID'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xamanPayloadSet(JSON.stringify(${payload}),'${isError}','${payloadID}');\n`;
    return code;
  };
};

export function initInterpreterXamanPayloadSet(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xamanPayloadSet');
  const wrapper = async function (payloadText: string, isErrorVar:any, responseVar:any, callback:any) {
    try {
      const state = await xamanPkce.state();
      if (state?.me) {
        const payload = JSON.parse(payloadText);
        const { sdk, me } = state;
        const request : XummJsonTransaction = payload;
        const xamanPayload = await sdk.payload.create(request);
        interpreter.setProperty(globalObject, isErrorVar, false);
        interpreter.setProperty(globalObject, responseVar, interpreter.nativeToPseudo(xamanPayload?.uuid));
      } else {
        throw new Error('Not logged in');
      }
      callback();
    } catch (error) {
      const message = 'Failed to get payload';
      console.error(`${message}: ${payloadText}`, error);
      interpreter.setProperty(globalObject, isErrorVar, true);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xamanPayloadSet', interpreter.createAsyncFunction(wrapper));
}
