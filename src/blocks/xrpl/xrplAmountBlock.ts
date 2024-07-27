import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';


export const xrpl_xrp_to_drops : any = {
  "type": "xrpl_xrp_to_drops",
  "message0": "%1 XRP to drops",
  "args0": [
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "output": "Number",
  "colour": BlockColors.xrpl,
  "tooltip": "Enter the amount in XRP to convert to drops",
  "helpUrl": ""
};

export const defineXrplXrp2DropBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_xrp_to_drops
  ]);

  javascriptGenerator.forBlock['xrpl_xrp_to_drops'] = function (block, generator) {
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '0';
    const drops = `${amount} * 1000000`;
    return [drops, Order.MULTIPLICATION];
  };
};


export const xrpl_drops_to_xrp : any = {
  "type": "xrpl_drops_to_xrp",
  "message0": "%1 drops to XRP",
  "args0": [
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "output": "Number",
  "colour": BlockColors.xrpl,
  "tooltip": "Enter the amount in drops to convert to XRP",
  "helpUrl": ""
};

export const defineXrplDrop2XrpBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_drops_to_xrp
  ]);

  javascriptGenerator.forBlock['xrpl_drops_to_xrp'] = function (block, generator) {
    const amount = generator.valueToCode(block, 'AMOUNT', Order.ATOMIC) || '0';
    const xrp = `${amount} / 1000000`;
    return [xrp, Order.MULTIPLICATION];
  };
};
