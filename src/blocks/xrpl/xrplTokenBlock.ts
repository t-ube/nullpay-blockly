import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { FieldDependentDropdown } from '@blockly/field-dependent-dropdown';
import { BlockColors } from '@/blocks/BlockColors';
import { xrplToken, xrplTokens } from '@/blocks/xrpl/xrplToken';
import { newTitleLabel, newArgsLabel, newOutputLabel, blockCheckType } from '@/blocks/BlockField';

const convertToTokenMenu = (tokens: xrplToken[]): [string, string][] => {
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
          "text": "New Token",
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
      "tooltip": "Create new token",
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
    const transaction : xrplToken = {
      issuer: issuer,
      currency_code: currencyCode,
      total_supply: totalSupply
    };
    return interpreter.nativeToPseudo(transaction);
  };
  interpreter.setProperty(globalObject, 'xrplCreateNewToken', interpreter.createNativeFunction(wrapper));
}
