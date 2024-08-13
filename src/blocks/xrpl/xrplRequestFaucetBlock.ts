import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';
import { Client, Wallet } from 'xrpl';


export const xrpl_request_faucet : any = {
  "type": "xrpl_request_faucet",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Request faucet",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Faucet URI",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "FAUCET_NETWORK_URI",
      "check": "String"
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Destination address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "DESTINATION_ADDRESS",
      "check": "String",
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Faucet info",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "FAUCET_INFO",
      "variable": "faucetInfo"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Request Faucet for the specified XRPL address and amount",
  "helpUrl": ""
};

export const defineXrplRequestFaucetBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_request_faucet
  ]);

  javascriptGenerator.forBlock['xrpl_request_faucet'] = function (block, generator) {
    const address = generator.valueToCode(block, 'DESTINATION_ADDRESS', Order.ATOMIC) || '""';
    const connection = generator.valueToCode(block, 'FAUCET_NETWORK_URI', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplRequestFaucet(${address}, ${connection}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('FAUCET_INFO'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplRequestFaucet(${address}, ${connection}, '${variable}');\n`;
    return code;
  };
};
  
export function initInterpreterXrplRequestFaucet(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplRequestFaucet');
  const wrapper = async function (address:any, connection:any, variable:any, callback:any) {
    try {
      const response = await fetch(connection, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ destination: address })
      });
      const data = await response.json();
      console.log('Faucet request successful:', data);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
      callback();
    } catch (error) {
      console.error('Error requesting Faucet:', error);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'xrplRequestFaucet', interpreter.createAsyncFunction(wrapper));
}


export const xrpl_create_account_and_request_faucet : any = {
  "type": "xrpl_create_account_and_request_faucet",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Create account & Request faucet",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Network URI",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "WEBSOCKET_ENDPOINT",
      "check": "String"
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Faucet amount (XRP)",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "XRP_AMOUNT",
      "check": "Number"
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Faucet info",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "FAUCET_INFO",
      "variable": "faucetInfo"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xrpl,
  "tooltip": "Request custom faucet for the specified XRPL address and amount",
  "helpUrl": ""
};

export const defineXrplRequestCustomFaucetBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_create_account_and_request_faucet
  ]);

  javascriptGenerator.forBlock['xrpl_create_account_and_request_faucet'] = function (block, generator) {
    const amount = generator.valueToCode(block, 'XRP_AMOUNT', Order.ATOMIC) || '""';
    const connection = generator.valueToCode(block, 'WEBSOCKET_ENDPOINT', Order.ATOMIC) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplRequestCustomFaucet(${amount}, ${connection}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('FAUCET_INFO'), Blockly.VARIABLE_CATEGORY_NAME);
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
