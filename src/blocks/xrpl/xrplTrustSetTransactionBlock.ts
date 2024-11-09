import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { IXrplToken } from '@/interfaces/IXrplToken';
import { findTokenTotalSupply } from '@/blocks/xrpl/xrplToken';

// Define the block for setting XRPL Trust set
export const xrpl_payload_trustline_config : any = {
  "type": "xrpl_payload_trustline_config",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Trust set payload",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Token",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "CURRECY_CODE_AND_ISSUER_AND_SUPPLY",
      "check": blockCheckType.xrplToken
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Account address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ACCOUNT_ADDRESS",
      "check": "String"
    }
  ],
  "output": blockCheckType.xrplTxnPayload,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Create a trust line setting transaction for the XRPL",
  "helpUrl": ""
};

export const defineXrplTrustSetTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_payload_trustline_config
  ]);

  // JavaScript code generator for the XRPL trust set block
  javascriptGenerator.forBlock['xrpl_payload_trustline_config'] = function(block, generator) {
    const token = generator.valueToCode(block, 'CURRECY_CODE_AND_ISSUER_AND_SUPPLY', Order.NONE) || {} as IXrplToken;
    const address = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.NONE) || '""';
    const code = `xrplTrustSetTxn(JSON.stringify(${token}),${address})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplTrustSetTxn(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplTrustSetTxn');
  function currencyToHex(currency: string): string {
    if (typeof currency !== 'string') {
      return "";
    }
    if (currency.length <= 3) {
      return currency;
    } else {
      return Buffer.from(currency.padEnd(20, '\0')).toString('hex').toUpperCase();
    }
  }
  const wrapper = function (tokenText: string, address: string) {
    let token = JSON.parse(tokenText) as IXrplToken;
    const totalSupply = findTokenTotalSupply(token.currency_code, token.issuer);
    const transaction = {
      TransactionType: 'TrustSet',
      Account: address,
      LimitAmount: {
        issuer: token.issuer,
        currency: currencyToHex(token.currency_code),
        value: totalSupply ? totalSupply : token.total_supply
      }
    };
    console.log(transaction);
    return interpreter.nativeToPseudo(transaction);
  };
  interpreter.setProperty(globalObject, 'xrplTrustSetTxn', interpreter.createNativeFunction(wrapper));
}

export const xrpl_payload_trustline_remove_config: any = {
  "type": "xrpl_payload_trustline_remove_config",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Remove Trust Line",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Token",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "CURRECY_CODE_AND_ISSUER",
      "check": blockCheckType.xrplToken
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Account address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ACCOUNT_ADDRESS",
      "check": "String"
    }
  ],
  "output": blockCheckType.xrplTxnPayload,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Remove a trust line on the XRPL",
  "helpUrl": ""
};

export const defineXrplTrustSetRemoveTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_payload_trustline_remove_config
  ]);

  // JavaScript code generator for the XRPL trust set removal block
  javascriptGenerator.forBlock['xrpl_payload_trustline_remove_config'] = function(block, generator) {
    const token = generator.valueToCode(block, 'CURRECY_CODE_AND_ISSUER', Order.NONE) || {} as IXrplToken;
    const address = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.NONE) || '""';
    const code = `xrplTrustSetRemoveTxn(JSON.stringify(${token}),${address})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplTrustSetRemoveTxn(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplTrustSetRemoveTxn');
  
  function currencyToHex(currency: string): string {
    if (typeof currency !== 'string') {
      return "";
    }
    if (currency.length <= 3) {
      return currency;
    } else {
      return Buffer.from(currency.padEnd(20, '\0')).toString('hex').toUpperCase();
    }
  }

  const wrapper = function (tokenText: string, address: string) {
    let token = JSON.parse(tokenText) as IXrplToken;
    const transaction = {
      TransactionType: 'TrustSet',
      Account: address,
      LimitAmount: {
        issuer: token.issuer,
        currency: currencyToHex(token.currency_code),
        value: "0" // Set limit to 0 to remove the trust line
      },
      Flags: 131072 // tfSetNoRipple flag
    };
    console.log("Removing trust line:", transaction);
    return interpreter.nativeToPseudo(transaction);
  };
  
  interpreter.setProperty(globalObject, 'xrplTrustSetRemoveTxn', interpreter.createNativeFunction(wrapper));
}

export const xrpl_decode_currency: any = {
  "type": "xrpl_decode_currency",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Decode XRPL currency code",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Hex currency code",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "HEX_CURRENCY",
      "check": blockCheckType.string
    }
  ],
  "output": blockCheckType.string,
  "colour": BlockColors.xrpl,
  "tooltip": "Decode an XRPL hex currency code to a readable string",
  "helpUrl": ""
};

export const defineXrplDecodeCurrencyBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_decode_currency
  ]);

  javascriptGenerator.forBlock['xrpl_decode_currency'] = function(block, generator) {
    const hexCurrency = generator.valueToCode(block, 'HEX_CURRENCY', Order.ATOMIC) || '""';
    const code = `decodeCurrency(${hexCurrency})`;
    return [code, Order.FUNCTION_CALL];
  };
};

export function initInterpreterXrplDecodeCurrency(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('decodeCurrency');
  const wrapper = function(currency: string) {
    try {
      // Remove any whitespace and ensure the string is uppercase
      let upperCurrency = currency.replace(/\s/g, '').toUpperCase();

      console.log(currency)
      // Check if it's a standard 3-character currency code
      if (/^[A-Z]{3}$/.test(upperCurrency)) {
        return currency;
      }

      // Check if only the first 3 characters are non-zero
      if (/^[0-9A-Z]{3}0{37}$/.test(upperCurrency)) {
        return currency.slice(0, 3);
      }

      // Check if it's a valid 40-character hex string
      if (!/^[0-9A-F]{40}$/.test(upperCurrency)) {
        throw new Error('Invalid currency code format');
      }

      // XRP is represented by 40 zeros
      if (upperCurrency === '0000000000000000000000000000000000000000') {
        return 'XRP';
      }

      // Decode up to 20 bytes (40 characters) of the hex string to ASCII
      let decoded = decodeHexToUTF8(upperCurrency);

      // If we have a valid decoded string, return it; otherwise, return the original hex
      return decoded || upperCurrency;
    } catch (error) {
      console.error('Failed to decode currency:', error);
      console.log(currency)
      return currency;
    }
  };

  function decodeHex(hex: string): string {
    let decoded = '';
    for (let i = 0; i < hex.length; i += 2) {
      const charCode = parseInt(hex.substr(i, 2), 16);
      if (charCode === 0) break; // Stop at the first null byte
      if (charCode < 32 || charCode > 126) {
        // If we encounter a non-printable ASCII character, return an empty string
        return '';
      }
      decoded += String.fromCharCode(charCode);
    }
    return decoded.trim();
  }

  function decodeHexToUTF8(hex: string): string {
    const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    try {
      return new TextDecoder('utf-8').decode(bytes).replace(/\0/g, '').trim();
    } catch (error) {
      console.error('Failed to decode hex to UTF-8:', error);
      return '';
    }
  }

  interpreter.setProperty(globalObject, 'decodeCurrency', interpreter.createNativeFunction(wrapper));
}