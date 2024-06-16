import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { FieldDependentDropdown } from '@blockly/field-dependent-dropdown';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';

export const defineXrplFaucetNetworkSelectionBlock = () => {
    Blockly.Blocks['xrpl_faucet_network_selection'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(newArgsLabel("Faucet URI"))
                .appendField(new Blockly.FieldDropdown([
                    ["XRPL", "xrpl"],
                    ["Xahau", "xahau"],
                    ]), 'NETWORK_TYPE')
                    .appendField("/")
                    .appendField(new FieldDependentDropdown('NETWORK_TYPE', {
                    xrpl: [
                        ["Testnet", "https://faucet.altnet.rippletest.net/accounts"],
                        ["Devnet", "https://faucet.devnet.rippletest.net/accounts"],
                    ],
                    xahau: [
                        ["Testnet", "https://xahau-test.net/accounts"],
                    ],
                }), 'CONNECTION');
            this.setOutput(true, 'String');
            this.setColour(BlockColors.xrpl);
            this.setTooltip('Select the network type and connection URI');
            this.setHelpUrl('');
        }
    };

    javascriptGenerator.forBlock['xrpl_faucet_network_selection'] = function (block, generator) {
        const connection = block.getFieldValue('CONNECTION');
        return [`"${connection}"`, Order.ATOMIC];
    };
};
