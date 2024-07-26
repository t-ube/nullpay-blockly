import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";
import { BlockColors } from "@/blocks/BlockColors";
import { FieldDependentDropdown } from "@blockly/field-dependent-dropdown";


Blockly.fieldRegistry.register('field_dependent_dropdown',FieldDependentDropdown);

export const defineXrplNetworkWssSelectionBlock = () => {

  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_network_wss_selection",
      "message0": "%1 %2 / %3",
      "args0": [
        {
          "type": "field_label",
          "text": "Network URI",
          "class": "args-label"
        },
        {
          "type": "field_dropdown",
          "name": "NETWORK_TYPE",
          "options": [
            ["XRPL", "xrpl"],
            ["Xahau", "xahau"]
          ]
        },
        {
          "type": "field_dependent_dropdown",
          "name": "CONNECTION",
          "parentName": "NETWORK_TYPE",
          "optionMapping": {
            "xrpl": [
              ["Testnet (Ripple)", "wss://s.altnet.rippletest.net:51233"],
              ["Testnet (XRPL Labs)", "wss://testnet.xrpl-labs.com"],
              ["Testnet Clio (Ripple)", "wss://clio.altnet.rippletest.net:51233"],
              ["Devnet (Ripple)", "wss://s.devnet.rippletest.net:51233"],
              ["Devnet Clio (Ripple)", "wss://clio.devnet.rippletest.net:51233"],
              ["Mainnet (XRPLF)", "wss://xrplcluster.com"],
              ["Mainnet (Ripple S1)", "wss://s1.ripple.com"],
              ["Mainnet (Ripple S2)", "wss://s2.ripple.com"],
              ["Sidechain-Devnet (Ripple)", "wss://sidechain-net2.devnet.rippletest.net:51233"]
            ],
            "xahau": [
              ["Testnet", "wss://xahau-test.net"],
              ["Mainnet", "wss://xahau.network"]
            ]
          }
        }
      ],
      "output": "String",
      "colour": BlockColors.xrpl,
      "tooltip": "Select the network type and connection URI",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock["xrpl_network_wss_selection"] = function (
    block,
    generator
  ) {
    const connection = block.getFieldValue("CONNECTION");
    return [`"${connection}"`, Order.ATOMIC];
  };
};

export const defineXrplFaucetNetworkSelectionBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "xrpl_faucet_network_selection",
      "message0": "%1 %2 / %3",
      "args0": [
        {
          "type": "field_label",
          "text": "Faucet URI",
          "class": "args-label"
        },
        {
          "type": "field_dropdown",
          "name": "NETWORK_TYPE",
          "options": [
            ["XRPL", "xrpl"],
            ["Xahau", "xahau"]
          ]
        },
        {
          "type": "field_dependent_dropdown",
          "name": "CONNECTION",
          "parentName": "NETWORK_TYPE",
          "optionMapping": {
            "xrpl": [
              ["Testnet", "https://faucet.altnet.rippletest.net/accounts"],
              ["Devnet", "https://faucet.devnet.rippletest.net/accounts"]
            ],
            "xahau": [
              ["Testnet", "https://xahau-test.net/accounts"]
            ]
          }
        }
      ],
      "output": "String",
      "colour": BlockColors.xrpl,
      "tooltip": "Select the network type and connection URI",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock["xrpl_faucet_network_selection"] = function (
    block,
    generator
  ) {
    const connection = block.getFieldValue("CONNECTION");
    return [`"${connection}"`, Order.ATOMIC];
  };
};
