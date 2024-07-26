import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { IExchangeAddress, exchangeAddresses } from '@/blocks/xrpl/xrplAddress';


export const defineXrplAddressBlock = () => {
  const xrplAddressValidator = (newValue: string) => {
    const xrplAddressRegex = /^r[1-9A-HJ-NP-Za-km-z]{25,34}$/;
    if (xrplAddressRegex.test(newValue)) {
      return newValue;
    } else {
      return null;
    }
  };

  Blockly.Blocks['xrpl_address'] = {
    init: function () {
      const addressField = new Blockly.FieldTextInput("", xrplAddressValidator);
      this.appendDummyInput()
        .appendField("XRPL address")
        .appendField(addressField, "ADDRESS");
      this.setOutput(true, 'String');
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Enter the XRPL address');
      this.setHelpUrl('');
    }
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

export const defineXrplExchangeAddressBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
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
    }
  ]);

  javascriptGenerator.forBlock['xrpl_exchange_address'] = function (block) {
    const address = block.getFieldValue('ADDRESS');
    const code = `"${address}"`;
    return [code, Order.ATOMIC];
  };
};
