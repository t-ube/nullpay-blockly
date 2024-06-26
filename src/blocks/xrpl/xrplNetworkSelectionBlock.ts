import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { FieldDependentDropdown } from '@blockly/field-dependent-dropdown';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';

export const defineXrplNetworkWssSelectionBlock = () => {
    Blockly.Blocks['xrpl_network_wss_selection'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(newArgsLabel("Network URI"))
                .appendField(new Blockly.FieldDropdown([
                ["XRPL", "xrpl"],
                ["Xahau", "xahau"],
                ]), 'NETWORK_TYPE')
                .appendField("/")
                .appendField(new FieldDependentDropdown('NETWORK_TYPE', {
                xrpl: [
                    ["Testnet", "wss://s.altnet.rippletest.net:51233"],
                    ["Devnet", "wss://s.devnet.rippletest.net:51233"],
                    ["Mainnet", "wss://xrpl.ws"],
                ],
                xahau: [
                    ["Testnet", "wss://xahau-test.net"], // wss://hooks-testnet-v3.xrpl-labs.com
                    ["Mainnet", "wss://xahau.network"],
                ],
                }), 'CONNECTION');
            this.setOutput(true, 'String');
            this.setColour(BlockColors.xrpl);
            this.setTooltip('Select the network type and connection URI');
            this.setHelpUrl('');
        }
    };

    javascriptGenerator.forBlock['xrpl_network_wss_selection'] = function (block, generator) {
        const connection = block.getFieldValue('CONNECTION');
        return [`"${connection}"`, Order.ATOMIC];
    };
};
