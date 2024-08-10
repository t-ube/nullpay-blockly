import { animation_confetti } from '@/blocks/animation/confettiAnimationBlock';
import {
  json_input_block,
  json_get_value,
  json_key_value_pair,
  json_append_key_values,
  json_to_text,
  json_to_text,
  text_to_json,
  text_to_json,
  dynamic_json_key_values
} from '@/blocks/json/jsonValueBlock';
import {
  text_to_lowercase,
  text_to_number,
  text_to_uppercase,
  number_to_text
} from '@/blocks/text/textConvertBlock';
import {
  text_block_comment
} from '@/blocks/text/textCommentBlock';
import {
  datetime_current,
  datetime_create,
  datetime_adjust,
  datetime_compare,
  datetime_text_format,
  datetime_to_text,
  datetime_timezone
} from '@/blocks/time/timeBlock';
import {
  ripple_epoch_to_datetime,
  datetime_to_ripple_epoch
} from '@/blocks/xrpl/datetimeToRippleEpochBlock';
import {
  xrpl_command_account_info,
  xrpl_command_account_lines
} from '@/blocks/xrpl/xrplAccountInfoBlock';
import {
  xrpl_payload_rippling
} from '@/blocks/xrpl/xrplAccountSetTransactionBlock';
import {
  xrpl_address,
  xrpl_exchange_address
} from '@/blocks/xrpl/xrplAddressBlock';
import {
  xrpl_drops_to_xrp,
  xrpl_xrp_to_drops
} from '@/blocks/xrpl/xrplAmountBlock';
import {
  xrpl_extract_offer_create_txn,
  xrpl_read_txn_info
} from '@/blocks/xrpl/xrplAnalyticsTxnBlock';
import {
  xrpl_client_initialize
} from '@/blocks/xrpl/xrplClientInitializeBlock';
import {
  xrpl_clio_command_nft_info
} from '@/blocks/xrpl/xrplClioServerBlock';
import {
  xrpl_faucet_network_selection,
  xrpl_network_wss_selection
} from '@/blocks/xrpl/xrplNetworkSelectionBlock';
import {
  xrpl_payload_nftoken_buy_offer
} from '@/blocks/xrpl/xrplNFTokenBlock';
import {
  xrpl_payload_buy_token_offer,
  xrpl_payload_sale_token_offer
} from '@/blocks/xrpl/xrplOfferTransactionBlock';
import {
  xrpl_command_nft_buy_offers
} from '@/blocks/xrpl/xrplPathAndOrderBookBlock';
import {
  xrpl_payload_payment_token,
  xrpl_payment_transaction
} from '@/blocks/xrpl/xrplPaymentTransactionBlock';
import {
  xrpl_create_account_and_request_faucet,
  xrpl_request_faucet
} from '@/blocks/xrpl/xrplRequestFaucetBlock';
import {
  xrpl_autofill_payload,
  xrpl_command_submit,
  xrpl_easy_submit,
  xrpl_command_tx
} from '@/blocks/xrpl/xrplSubmitBlock';
import {
  xrpl_command_subscribe_account_txn,
  xrpl_command_subscribe_streams_all_txn,
  xrpl_command_unsubscribe_account_txn,
  xrpl_command_unsubscribe_streams_all_txn
} from '@/blocks/xrpl/xrplSubscribeBlock';
import {
  xrpl_create_new_token,
  xrpl_token_amount_arithmetic,
  xrpl_token_amount_set,
  xrpl_token_select
} from '@/blocks/xrpl/xrplTokenBlock';
import {
  xrpl_payload_trust_set
} from '@/blocks/xrpl/xrplTrustSetTransactionBlock';
import {
  xrpl_txn_type_select
} from '@/blocks/xrpl/xrplTransactionTypeBlock';
import {
  xrpl_generate_wallet,
  xrpl_load_wallet,
  xrpl_wallet_info,
  xrpl_wallet_sign
} from '@/blocks/xrpl/xrplWalletBlock';
import {
  xaman_payload_set,
  xaman_payment,
  xaman_wait_for_signature
} from '@/blocks/xaman/xamanPayloadBlock';
import {
  xaman_login,
  xaman_logout
} from '@/blocks/xaman/xamanSimpleLoginBlock';
import {
  xaman_variable_get,
  xaman_variable_name,
  xaman_variable_set
} from '@/blocks/xaman/xamanVariableBlock';
import {
  logic_false,
  logic_null,
  logic_true,
  logic_undefined
} from '@/blocks/logic/logicBlock';
import {
  lists_append,
  array_init,
  lists_sort_json_value
} from '@/blocks/list/arrayInitBlock';

export const BlockStructures = [
  animation_confetti,
  json_input_block,
  json_get_value,
  json_key_value_pair,
  json_append_key_values,
  json_to_text,
  json_to_text,
  text_to_json,
  text_to_json,
  dynamic_json_key_values,
  text_to_lowercase,
  text_to_number,
  text_to_uppercase,
  number_to_text,
  text_block_comment,
  datetime_current,
  datetime_create,
  datetime_adjust,
  datetime_compare,
  datetime_text_format,
  datetime_to_text,
  datetime_timezone,
  ripple_epoch_to_datetime,
  datetime_to_ripple_epoch,
  xrpl_command_account_info,
  xrpl_command_account_lines,
  xrpl_payload_rippling,
  xrpl_address,
  xrpl_exchange_address,
  xrpl_drops_to_xrp,
  xrpl_xrp_to_drops,
  xrpl_extract_offer_create_txn,
  xrpl_read_txn_info,
  xrpl_client_initialize,
  xrpl_clio_command_nft_info,
  xrpl_faucet_network_selection,
  xrpl_network_wss_selection,
  xrpl_payload_nftoken_buy_offer,
  xrpl_payload_buy_token_offer,
  xrpl_payload_sale_token_offer,
  xrpl_command_nft_buy_offers,
  xrpl_payload_payment_token,
  xrpl_payment_transaction,
  xrpl_create_account_and_request_faucet,
  xrpl_request_faucet,
  xrpl_autofill_payload,
  xrpl_command_submit,
  xrpl_easy_submit,
  xrpl_command_tx,
  xrpl_command_subscribe_account_txn,
  xrpl_command_subscribe_streams_all_txn,
  xrpl_command_unsubscribe_account_txn,
  xrpl_command_unsubscribe_streams_all_txn,
  xrpl_create_new_token,
  xrpl_token_amount_arithmetic,
  xrpl_token_amount_set,
  xrpl_token_select,
  xrpl_payload_trust_set,
  xrpl_txn_type_select,
  xrpl_generate_wallet,
  xrpl_load_wallet,
  xrpl_wallet_info,
  xrpl_wallet_sign,
  xaman_payload_set,
  xaman_payment,
  xaman_wait_for_signature,
  xaman_login,
  xaman_logout,
  xaman_variable_get,
  xaman_variable_name,
  xaman_variable_set,
  logic_false,
  logic_null,
  logic_true,
  logic_undefined,
  lists_append,
  array_init,
  lists_sort_json_value
];
