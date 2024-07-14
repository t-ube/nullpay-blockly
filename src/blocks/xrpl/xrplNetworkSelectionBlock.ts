import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";
import { BlockColors } from "@/blocks/BlockColors";
import { FieldDependentDropdown } from "@blockly/field-dependent-dropdown";
import {
  newTitleLabel,
  newArgsLabel,
  newOutputLabel,
} from "@/blocks/BlockField";


export const defineXrplNetworkWssSelectionBlock = () => {
  Blockly.Blocks["xrpl_network_wss_selection"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newArgsLabel("Network URI"))
        .appendField(
          new Blockly.FieldDropdown([
            ["XRPL", "xrpl"],
            ["Xahau", "xahau"],
          ]),
          "NETWORK_TYPE"
        )
        .appendField("/")
        .appendField(
          new FieldDependentDropdown("NETWORK_TYPE", {
            xrpl: [
              ["Testnet (Ripple)", "wss://s.altnet.rippletest.net:51233"],
              ["Testnet (XRPL Labs)", "wss://testnet.xrpl-labs.com"],
              ["Testnet Clio (Ripple)", "wss://clio.altnet.rippletest.net:51233"],
              ["Devnet (Ripple)", "wss://s.devnet.rippletest.net:51233"],
              ["Devnet Clio (Ripple)", "wss://clio.devnet.rippletest.net:51233"],
              ["Mainnet (XRPLF)", "wss://xrplcluster.com"],
              //["Mainnet (XRPLF)", "wss://xrpl.ws"],
              ["Mainnet (Ripple S1)", "wss://s1.ripple.com"],
              ["Mainnet (Ripple S2)", "wss://s2.ripple.com"],
              ["Sidechain-Devnet (Ripple)", "wss://sidechain-net2.devnet.rippletest.net:51233"],
            ],
            xahau: [
              ["Testnet", "wss://xahau-test.net"], // wss://hooks-testnet-v3.xrpl-labs.com
              ["Mainnet", "wss://xahau.network"],
            ],
          }),
          "CONNECTION"
        );
      this.setOutput(true, "String");
      this.setColour(BlockColors.xrpl);
      this.setTooltip("Select the network type and connection URI");
      this.setHelpUrl("");
    },
  };

  javascriptGenerator.forBlock["xrpl_network_wss_selection"] = function (
    block,
    generator
  ) {
    const connection = block.getFieldValue("CONNECTION");
    return [`"${connection}"`, Order.ATOMIC];
  };
};

export const defineXrplFaucetNetworkSelectionBlock = () => {
  Blockly.Blocks["xrpl_faucet_network_selection"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newArgsLabel("Faucet URI"))
        .appendField(
          new Blockly.FieldDropdown([
            ["XRPL", "xrpl"],
            ["Xahau", "xahau"],
          ]),
          "NETWORK_TYPE"
        )
        .appendField("/")
        .appendField(
          new FieldDependentDropdown("NETWORK_TYPE", {
            xrpl: [
              ["Testnet", "https://faucet.altnet.rippletest.net/accounts"],
              ["Devnet", "https://faucet.devnet.rippletest.net/accounts"],
            ],
            xahau: [["Testnet", "https://xahau-test.net/accounts"]],
          }),
          "CONNECTION"
        );
      this.setOutput(true, "String");
      this.setColour(BlockColors.xrpl);
      this.setTooltip("Select the network type and connection URI");
      this.setHelpUrl("");
    },
  };

  javascriptGenerator.forBlock["xrpl_faucet_network_selection"] = function (
    block,
    generator
  ) {
    const connection = block.getFieldValue("CONNECTION");
    return [`"${connection}"`, Order.ATOMIC];
  };
};
