import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";
import { BlockColors } from "@/blocks/BlockColors";
import { FieldDependentDropdown } from "@blockly/field-dependent-dropdown";


Blockly.fieldRegistry.register('field_dependent_dropdown',FieldDependentDropdown);

export const xrpl_select_websocket_endpoint : any = {
  "type": "xrpl_select_websocket_endpoint",
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
      "name": "WEBSOCKET_ENDPOINT",
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
};

export const defineXrplNetworkWssSelectionBlock = () => {

  Blockly.defineBlocksWithJsonArray([
    xrpl_select_websocket_endpoint
  ]);

  javascriptGenerator.forBlock["xrpl_select_websocket_endpoint"] = function (
    block,
    generator
  ) {
    const connection = block.getFieldValue("WEBSOCKET_ENDPOINT");
    return [`"${connection}"`, Order.ATOMIC];
  };
};


export const xrpl_select_faucet_network_uri : any = {
  "type": "xrpl_select_faucet_network_uri",
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
      "name": "FAUCET_NETWORK_URI",
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
  "tooltip": "Select a faucet URI for obtaining test tokens on XRPL or related networks (including Xahau). Provides specific endpoint URIs for various test networks.",
  "helpUrl": ""
};

export const defineXrplFaucetNetworkSelectionBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_select_faucet_network_uri
  ]);

  javascriptGenerator.forBlock["xrpl_select_faucet_network_uri"] = function (
    block,
    generator
  ) {
    const connection = block.getFieldValue("FAUCET_NETWORK_URI");
    return [`"${connection}"`, Order.ATOMIC];
  };
};
