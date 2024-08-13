import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';


export const xrpl_transaction_type : any = {
  "type": "xrpl_transaction_type",
  "message0": "transaction type %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "TRANSACTION_TYPE",
      "options": [
        ["AccountSet", "AccountSet"],
        ["AccountDelete", "AccountDelete"],
        ["AMMBid", "AMMBid"],
        ["AMMCreate", "AMMCreate"],
        ["AMMDelete", "AMMDelete"],
        ["AMMDeposit", "AMMDeposit"],
        ["AMMVote", "AMMVote"],
        ["AMMWithdraw", "AMMWithdraw"],
        ["CheckCancel", "CheckCancel"],
        ["CheckCash", "CheckCash"],
        ["CheckCreate", "CheckCreate"],
        ["Clawback", "Clawback"],
        ["DepositPreauth", "DepositPreauth"],
        ["DIDDelete", "DIDDelete"],
        ["DIDSet", "DIDSet"],
        ["EscrowCancel", "EscrowCancel"],
        ["EscrowCreate", "EscrowCreate"],
        ["EscrowFinish", "EscrowFinish"],
        ["NFTokenAcceptOffer", "NFTokenAcceptOffer"],
        ["NFTokenBurn", "NFTokenBurn"],
        ["NFTokenCancelOffer", "NFTokenCancelOffer"],
        ["NFTokenCreateOffer", "NFTokenCreateOffer"],
        ["NFTokenMint", "NFTokenMint"],
        ["OfferCancel", "OfferCancel"],
        ["OfferCreate", "OfferCreate"],
        ["Payment", "Payment"],
        ["PaymentChannelClaim", "PaymentChannelClaim"],
        ["PaymentChannelCreate", "PaymentChannelCreate"],
        ["PaymentChannelFund", "PaymentChannelFund"],
        ["SetRegularKey", "SetRegularKey"],
        ["SignerListSet", "SignerListSet"],
        ["TicketCreate", "TicketCreate"],
        ["TrustSet", "TrustSet"],
        ["XChainAccountCreateCommit", "XChainAccountCreateCommit"],
        ["XChainAddAccountCreateAttestation", "XChainAddAccountCreateAttestation"],
        ["XChainAddClaimAttestation", "XChainAddClaimAttestation"],
        ["XChainClaim", "XChainClaim"],
        ["XChainCommit", "XChainCommit"],
        ["XChainCreateBridge", "XChainCreateBridge"],
        ["XChainCreateClaimID", "XChainCreateClaimID"],
        ["XChainModifyBridge", "XChainModifyBridge"]
      ]
    }
  ],
  "output": blockCheckType.string,
  "colour": BlockColors.xrpl,
  "tooltip": "Select an XRPL transaction type from the dropdown",
  "helpUrl": ""
};

export const defineXrplTxnTypeSelectBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_transaction_type
  ]);
  
  javascriptGenerator.forBlock['xrpl_transaction_type'] = function (block, generator) {
    const type = block.getFieldValue('TRANSACTION_TYPE');
    const code = `"${type}"`;
    return [code, Order.ATOMIC];
  };
};
