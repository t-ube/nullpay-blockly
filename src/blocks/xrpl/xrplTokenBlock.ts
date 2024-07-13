import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { FieldDependentDropdown } from '@blockly/field-dependent-dropdown';
import { BlockColors } from '@/blocks/BlockColors';
import { xrplTokens } from '@/blocks/xrpl/xrplToken';
import { IXrplToken, IXrplTokenAmount } from '@/interfaces/IXrplToken';
import { newTitleLabel, newArgsLabel, newOutputLabel, blockCheckType } from '@/blocks/BlockField';

const convertToTokenMenu = (tokens: IXrplToken[]): [string, string][] => {
  tokens.sort((a, b) => {
    const aIsAlpha = /^[A-Za-z]/.test(a.currency_code);
    const bIsAlpha = /^[A-Za-z]/.test(b.currency_code);

    if (aIsAlpha && !bIsAlpha) return -1;
    if (!aIsAlpha && bIsAlpha) return 1;
    if (a.currency_code < b.currency_code) return -1;
    if (a.currency_code > b.currency_code) return 1;
    return 0;
  });
  
  return tokens.map(token => {
    const displayName = `${token.currency_code} (${token.issuer.slice(0, 4)}...${token.issuer.slice(-4)})`;
    const tokenData = `${token.issuer}/${token.currency_code}/${token.total_supply}`;
    return [displayName, tokenData];
  });
}

const tokenMenu: Blockly.MenuGenerator = convertToTokenMenu(xrplTokens);

export const defineXrplTokenSelectBlock = () => {
  Blockly.Blocks['xrpl_token_select'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newArgsLabel("Token"))
        .appendField(new Blockly.FieldDropdown([
        ["XRPL", "xrpl"],
        ]), 'NETWORK_TYPE')
        .appendField("/")
        .appendField(new FieldDependentDropdown('NETWORK_TYPE', {
        xrpl: tokenMenu,
        xahau: [],
        }), 'TOKEN');
      this.setOutput(true, blockCheckType.xrplToken);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Select an XRPL token from the dropdown');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_token_select'] = function (block) {
    const token = block.getFieldValue('TOKEN');
    const [issuer, currency_code, total_supply] = token.split('/');
    const code = JSON.stringify({
      issuer: issuer,
      currency_code: currency_code,
      total_supply: total_supply
    });
    return [code, Order.ATOMIC];
  };
};

export const defineXrplCreateNewTokenBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_create_new_token",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "New token",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Issuer address",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "ISSUER",
          "check": "String"
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Currency code",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "CODE",
          "check": "String"
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Total supply",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "SUPPLY",
          "check": "Number"
        }
      ],
      "output": blockCheckType.xrplToken,
      "inputsInline": false,
      "colour": BlockColors.xrpl,
      "tooltip": "Create a new token on the XRP Ledger. Specify the issuer address, currency code, and total supply",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_create_new_token'] = function (block, generator) {
    const issuer = generator.valueToCode(block, 'ISSUER', Order.NONE) || '""';
    const currencyCode = generator.valueToCode(block, 'CODE', Order.NONE) || '""';
    const totalSupply = generator.valueToCode(block, 'SUPPLY', Order.NONE) || 0;
    const code = `xrplCreateNewToken(${issuer},${currencyCode},String(${totalSupply}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplCreateNewToken(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplCreateNewToken');
  const wrapper = function (issuer: string, currencyCode: string, totalSupply: string) {
    const payload : IXrplToken = {
      issuer: issuer,
      currency_code: currencyCode,
      total_supply: totalSupply
    };
    return interpreter.nativeToPseudo(payload);
  };
  interpreter.setProperty(globalObject, 'xrplCreateNewToken', interpreter.createNativeFunction(wrapper));
}

export const defineXrplTokenAmountSetBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_token_amount_set",
      "message0": "Set token amount %1",
      "args0": [
        {
          "type": "input_value",
          "name": "TOKEN",
          "check": [blockCheckType.xrplToken,blockCheckType.json]
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Value",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "VALUE",
          "check": blockCheckType.number
        }
      ],
      "output": blockCheckType.xrplTokenAmount,
      "inputsInline": false,
      "colour": BlockColors.xrpl,
      "tooltip": "Set the amount of a token. Specify the information of the newly created token and its value",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_token_amount_set'] = function (block, generator) {
    const token = generator.valueToCode(block, 'TOKEN', Order.NONE) || '{}';
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 0;
    const code = `xrplTokenAmountSet(JSON.stringify(${token}),String(${value}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplTokenAmountSet(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplTokenAmountSet');
  const wrapper = function (tokenText: string, value: string) {
    const json = JSON.parse(tokenText) as IXrplToken;
    const payload : IXrplTokenAmount = {
      currency: json.currency_code,
      issuer: json.issuer,
      value: value
    };
    return interpreter.nativeToPseudo(payload);
  };
  interpreter.setProperty(globalObject, 'xrplTokenAmountSet', interpreter.createNativeFunction(wrapper));
}


export const defineXrplTokenAmountArithmeticBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_token_amount_arithmetic",
      "message0": "token amount %1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "TOKEN",
          "check": [blockCheckType.xrplTokenAmount, blockCheckType.json, blockCheckType.number, blockCheckType.string]
        },
        {
          "type": "field_dropdown",
          "name": "OPERATOR",
          "options": [
            ["+", "+"],
            ["-", "-"],
            ["×", "*"],
            ["÷", "/"]
          ]
        },
        {
          "type": "input_value",
          "name": "VALUE",
          "check": blockCheckType.number
        }
      ],
      "output": blockCheckType.xrplTokenAmount,
      "inputsInline": true,
      "colour": BlockColors.xrpl,
      "tooltip": "Perform arithmetic operations on XRPL token amounts. Supports addition, subtraction, multiplication, and division.",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['xrpl_token_amount_arithmetic'] = function (block, generator) {
    const token = generator.valueToCode(block, 'TOKEN', Order.NONE) || '"0"';
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 0;
    const operator = block.getFieldValue('OPERATOR');
    const code = `xrplTokenAmountArithmetic(JSON.stringify(${token}),"${operator}",String(${value}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplTokenAmountArithmetic(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplTokenAmountArithmetic');
  const wrapper = function (tokenText: string, operator:string, value: string) {
    const parsed = JSON.parse(tokenText);
    if (typeof parsed === 'object') {
      return interpreter.nativeToPseudo(amountObjectArithmetic(parsed as IXrplTokenAmount, operator, value));
    }
    return interpreter.nativeToPseudo(amountArithmetic(parsed, operator, value));
  };

  function amountArithmetic (amount:string | number, operator:string, value:string) {
    let result : number = typeof amount === 'number' ? amount : Number(amount);
    switch (operator) {
      case '+':
        result += Number(value);
        break;
      case '-':
        result -= Number(value);
        break;
      case '*':
        result *= Number(value);
        break;
      case '/':
        result /= Number(value);
        break;
      default:
        result = 0;
    }
    return String(result);
  }

  function amountObjectArithmetic (amount:IXrplTokenAmount, operator:string, value:string) {
    let result: number;
    switch (operator) {
      case '+':
        result = Number(amount.value) + Number(value);
        break;
      case '-':
        result = Number(amount.value) - Number(value);
        break;
      case '*':
        result = Number(amount.value) * Number(value);
        break;
      case '/':
        result = Number(amount.value) / Number(value);
        break;
      default:
        result = 0;
    }
    const payload : IXrplTokenAmount = {
      currency: amount.currency,
      issuer: amount.issuer,
      value: String(result)
    };
    return payload;
  }

  interpreter.setProperty(globalObject, 'xrplTokenAmountArithmetic', interpreter.createNativeFunction(wrapper));
}
