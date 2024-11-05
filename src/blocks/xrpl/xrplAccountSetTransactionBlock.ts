import { AccountSetAsfFlags } from 'xrpl';
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

// Define the block for setting XRPL rippling
export const xrpl_payload_rippling_config : any = {
  "type": "xrpl_payload_rippling_config",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_label",
      "text": "Rippling payload"
    },
    {
      "type": "field_dropdown",
      "name": "RIPPLING",
      "options": [
        ["Enable", "ENABLE"],
        ["Disable", "DISABLE"]
      ]
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Account address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ACCOUNT_ADDRESS",
      "check": "String"
    }
  ],
  "output": blockCheckType.xrplTxnPayload,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Sets the rippling flag for the specified account",
  "helpUrl": ""
};

export const defineXrplRipplingTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_payload_rippling_config
  ]);

  // JavaScript code generator for the XRPL rippling block
  javascriptGenerator.forBlock['xrpl_payload_rippling_config'] = function(block, generator) {
    const rippling = block.getFieldValue('RIPPLING');
    const address = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.NONE) || '""';
    const code = `xrplRipplingTxn(${rippling === 'ENABLE' ? 'true' : 'false'},${address})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplRipplingTxn(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplRipplingTxn');
  const wrapper = function (rippling: boolean, address: string) {
    let transaction = {};
    if (rippling === true) {
      transaction = {
        TransactionType: 'AccountSet',
        Account: address,
        SetFlag: AccountSetAsfFlags.asfDefaultRipple
      };
    } else {
      transaction = {
        TransactionType: 'AccountSet',
        Account: address,
        ClearFlag: AccountSetAsfFlags.asfDefaultRipple
      }; 
    }
    return interpreter.nativeToPseudo(transaction);
  };
  interpreter.setProperty(globalObject, 'xrplRipplingTxn', interpreter.createNativeFunction(wrapper));
}

const FLAG_MAPPINGS = [
  { name: 'accountTxnID', label: 'Account Transaction ID', flag: 5 },
  { name: 'authorizedNFTokenMinter', label: 'Authorized NFT Minter', flag: 10 },
  { name: 'defaultRipple', label: 'Default Ripple', flag: 8 },
  { name: 'depositAuth', label: 'Deposit Authorization', flag: 9 },
  { name: 'disableMaster', label: 'Disable Master Key', flag: 4 },
  { name: 'disallowIncomingCheck', label: 'Disallow Incoming Check', flag: 13 },
  { name: 'disallowIncomingNFTOffer', label: 'Disallow Incoming NFT Offer', flag: 12 },
  { name: 'disallowIncomingPayChan', label: 'Disallow Incoming Payment Channel', flag: 14 },
  { name: 'disallowIncomingTrustline', label: 'Disallow Incoming Trustline', flag: 15 },
  { name: 'disallowXRP', label: 'Disallow XRP', flag: 3 },
  { name: 'globalFreeze', label: 'Global Freeze', flag: 7 },
  { name: 'noFreeze', label: 'No Freeze', flag: 6 },
  { name: 'requireAuth', label: 'Require Authorization', flag: 2 },
  { name: 'requireDest', label: 'Require Destination Tag', flag: 1 }
];

export const xrpl_payload_account_flags_config: any = {
  "type": "xrpl_payload_account_flags_config",
  "message0": "Account flag configuration %1",
  "args0": [
    {
      "type": "field_label",
      "text": ""
    }
  ],
  "message1": "Account address %1",
  "args1": [
    {
      "type": "input_value",
      "name": "ACCOUNT_ADDRESS",
      "check": "String"
    }
  ],
  "message2": "Flag to set %1",
  "args2": [
    {
      "type": "field_dropdown",
      "name": "FLAG_SELECTION",
      "options": FLAG_MAPPINGS.map(flag => [flag.label, flag.name])
    }
  ],
  "message3": "Action %1",
  "args3": [
    {
      "type": "field_dropdown",
      "name": "FLAG_ACTION",
      "options": [
        ["Enable", "ENABLE"],
        ["Disable", "DISABLE"]
      ]
    }
  ],
  "output": blockCheckType.xrplTxnPayload,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Configure a single account flag on the XRPL. Only one flag can be set or cleared per transaction.",
  "helpUrl": ""
};

export const defineXrplAccountFlagsBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_payload_account_flags_config
  ]);

  javascriptGenerator.forBlock['xrpl_payload_account_flags_config'] = function(block, generator) {
    const address = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.NONE) || '""';
    const selectedFlagName = block.getFieldValue('FLAG_SELECTION');
    const action = block.getFieldValue('FLAG_ACTION');
    
    // 選択されたフラグの値を取得
    const flagValue = FLAG_MAPPINGS.find(f => f.name === selectedFlagName)?.flag || 0;
    
    // actionに基づいてsetFlagまたはclearFlagを設定
    const setFlag = action === 'ENABLE' ? flagValue : null;
    const clearFlag = action === 'DISABLE' ? flagValue : null;

    const code = `xrplAccountFlagsTxn(${address}, ${setFlag}, ${clearFlag})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplAccountFlags(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplAccountFlagsTxn');
  
  const wrapper = function(address: string, setFlag: number | null, clearFlag: number | null) {
    const transaction = {
      TransactionType: 'AccountSet',
      Account: address,
      ...(setFlag !== null && { SetFlag: setFlag }),
      ...(clearFlag !== null && { ClearFlag: clearFlag })
    };
    return interpreter.nativeToPseudo(transaction);
  };

  interpreter.setProperty(globalObject, 'xrplAccountFlagsTxn', 
    interpreter.createNativeFunction(wrapper));
}