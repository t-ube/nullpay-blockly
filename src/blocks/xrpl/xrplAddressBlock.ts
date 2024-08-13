import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { IExchangeAddress, exchangeAddresses } from '@/blocks/xrpl/xrplAddress';


export const xrpl_address : any = {
  "type": "xrpl_address",
  "message0": "XRPL address %1",
  "args0": [
    {
      "type": "field_input",
      "name": "ADDRESS",
      "text": ""
    }
  ],
  "output": "String",
  "colour": BlockColors.xrpl,
  "tooltip": "Enter and validate an XRPL address. Ensures the input conforms to the XRPL address format.",
  "helpUrl": ""
};

export const defineXrplAddressBlock = () => {
  const xrplAddressValidator = (newValue: string) => {
    const xrplAddressRegex = /^r[1-9A-HJ-NP-Za-km-z]{25,34}$/;
    if (xrplAddressRegex.test(newValue)) {
      return newValue;
    } else {
      return null;
    }
  };

  Blockly.defineBlocksWithJsonArray([
    xrpl_address
  ]);

  Blockly.Blocks['xrpl_address'].init = function () {
    this.jsonInit(xrpl_address);
    const addressField = this.getField('ADDRESS');
    addressField.setValidator(xrplAddressValidator);
  };

  javascriptGenerator.forBlock['xrpl_address'] = function (block, generator) {
    const address = block.getFieldValue('ADDRESS');
    const code = `'${address}'`;
    return [code, Order.ATOMIC];
  };
};

const convertToAddressMenu = (addresses: IExchangeAddress[]): [string, string][] => {
  return addresses.map(address => {
    const displayName = address.desc ? `${address.name}(${address.desc})` : address.name;
    return [displayName, address.account];
  });
}

const exchangeAddressMenu: Blockly.MenuGenerator = convertToAddressMenu(exchangeAddresses);


export const xrpl_exchange_address : any = {
  "type": "xrpl_exchange_address",
  "message0": "XRPL exchange address %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ADDRESS",
      "options": exchangeAddressMenu
    }
  ],
  "output": "String",
  "colour": BlockColors.xrpl,
  "tooltip": "Select an exchange address from the dropdown",
  "helpUrl": ""
};

export const defineXrplExchangeAddressBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_exchange_address
  ]);

  javascriptGenerator.forBlock['xrpl_exchange_address'] = function (block) {
    const address = block.getFieldValue('ADDRESS');
    const code = `"${address}"`;
    return [code, Order.ATOMIC];
  };
};
