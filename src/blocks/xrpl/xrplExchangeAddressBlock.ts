import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { exchangeAddress, exchangeAddresses } from '@/blocks/xrpl/xrplAddress';

const convertToAddressMenu = (addresses: exchangeAddress[]): [string, string][] => {
  return addresses.map(address => {
    const displayName = address.desc ? `${address.name}(${address.desc})` : address.name;
    return [displayName, address.account];
  });
}

const addressMenu: Blockly.MenuGenerator = convertToAddressMenu(exchangeAddresses);

export const defineXrplExchangeAddressBlock = () => {
  Blockly.Blocks['xrpl_exchange_address'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("XRPL exchange address")
        .appendField(new Blockly.FieldDropdown(addressMenu), "ADDRESS");
      this.setOutput(true, 'String');
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Select an exchange address from the dropdown');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_exchange_address'] = function (block) {
    const address = block.getFieldValue('ADDRESS');
    const code = `"${address}"`;
    return [code, Order.ATOMIC];
  };
};
