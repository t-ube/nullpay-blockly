import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import xamanPkce from '@/utils/XamanPkce';
import { newTitleLabel, newArgsLabel } from '@/blocks/BlockField';

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
            subscribe.websocket.close(1000);
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
