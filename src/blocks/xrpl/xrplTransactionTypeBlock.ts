import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

export const defineXrplTxnTypeSelectBlock = () => {
  Blockly.Blocks['xrpl_txn_type_select'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("transaction type")
        .appendField(new Blockly.FieldDropdown([
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
        ]), "TRANSACTION_TYPE");
      this.setOutput(true, blockCheckType.string);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Select an XRPL transaction type from the dropdown');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xrpl_txn_type_select'] = function (block, generator) {
    const type = block.getFieldValue('TRANSACTION_TYPE');
    const code = `"${type}"`;
    return [code, Order.ATOMIC];
  };
};
