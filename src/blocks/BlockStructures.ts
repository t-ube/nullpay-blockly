import { confetti_animation } from '@/blocks/animation/confettiAnimationBlock';
import {
  json_input_block,
  json_get_value,
  json_key_value_pair,
  json_set_key_values,
  json_to_text,
  json_to_text_v2,
  text_to_json,
  text_to_json_v2,
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
  current_datetime,
  create_datetime,
  adjust_datetime,
  compare_datetime,
  datetime_text_format,
  datetime_to_text,
  timezone_block
} from '@/blocks/time/timeBlock';
import {
  ripple_epoch_to_datetime,
  datetime_to_ripple_epoch
} from '@/blocks/xrpl/datetimeToRippleEpochBlock';
import {
  xrpl_account_info,
  xrpl_account_lines_command
} from '@/blocks/xrpl/xrplAccountInfoBlock';
import {
  xrpl_rippling_txn
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
  xrpl_clio_nft_info
} from '@/blocks/xrpl/xrplClioServerBlock';
import {
  xrpl_faucet_network_selection,
  xrpl_network_wss_selection
} from '@/blocks/xrpl/xrplNetworkSelectionBlock';
import {
  xrpl_nftoken_buy_offer
} from '@/blocks/xrpl/xrplNFTokenBlock';
import {
  xrpl_buy_token_offer_txn,
  xrpl_sale_token_offer_txn
} from '@/blocks/xrpl/xrplOfferTransactionBlock';
import {
  xrpl_nft_buy_offers
} from '@/blocks/xrpl/xrplPathAndOrderBookBlock';
import {
  xrpl_payment_token_txn,
  xrpl_payment_transaction
} from '@/blocks/xrpl/xrplPaymentTransactionBlock';
import {
  xrpl_request_custom_faucet,
  xrpl_request_faucet
} from '@/blocks/xrpl/xrplRequestFaucetBlock';
import {
  xrpl_client_autofill,
  xrpl_client_submit,
  xrpl_easy_submit,
  xrpl_tx_command
} from '@/blocks/xrpl/xrplSubmitBlock';
import {
  xrpl_subscribe_account_txn,
  xrpl_subscribe_all_txn,
  xrpl_unsubscribe_account_txn,
  xrpl_unsubscribe_all_txn
} from '@/blocks/xrpl/xrplSubscribeBlock';
import {
  xrpl_create_new_token,
  xrpl_token_amount_arithmetic,
  xrpl_token_amount_set,
  xrpl_token_select
} from '@/blocks/xrpl/xrplTokenBlock';
import {
  xrpl_trust_set_txn
} from '@/blocks/xrpl/xrplTrustSetTransactionBlock';
import {
  xrpl_txn_type_select
} from '@/blocks/xrpl/xrplTransactionTypeBlock';
import {
  xrpl_create_account,
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
  xaman_simple_login,
  xaman_simple_logout
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
  array_append,
  array_init,
  lists_sort_json_value
} from '@/blocks/list/arrayInitBlock';

export const BlockStructures = [
  confetti_animation,
  json_input_block,
  json_get_value,
  json_key_value_pair,
  json_set_key_values,
  json_to_text,
  json_to_text_v2,
  text_to_json,
  text_to_json_v2,
  dynamic_json_key_values,
  text_to_lowercase,
  text_to_number,
  text_to_uppercase,
  number_to_text,
  text_block_comment,
  current_datetime,
  create_datetime,
  adjust_datetime,
  compare_datetime,
  datetime_text_format,
  datetime_to_text,
  timezone_block,
  ripple_epoch_to_datetime,
  datetime_to_ripple_epoch,
  xrpl_account_info,
  xrpl_account_lines_command,
  xrpl_rippling_txn,
  xrpl_address,
  xrpl_exchange_address,
  xrpl_drops_to_xrp,
  xrpl_xrp_to_drops,
  xrpl_extract_offer_create_txn,
  xrpl_read_txn_info,
  xrpl_client_initialize,
  xrpl_clio_nft_info,
  xrpl_faucet_network_selection,
  xrpl_network_wss_selection,
  xrpl_nftoken_buy_offer,
  xrpl_buy_token_offer_txn,
  xrpl_sale_token_offer_txn,
  xrpl_nft_buy_offers,
  xrpl_payment_token_txn,
  xrpl_payment_transaction,
  xrpl_request_custom_faucet,
  xrpl_request_faucet,
  xrpl_client_autofill,
  xrpl_client_submit,
  xrpl_easy_submit,
  xrpl_tx_command,
  xrpl_subscribe_account_txn,
  xrpl_subscribe_all_txn,
  xrpl_unsubscribe_account_txn,
  xrpl_unsubscribe_all_txn,
  xrpl_create_new_token,
  xrpl_token_amount_arithmetic,
  xrpl_token_amount_set,
  xrpl_token_select,
  xrpl_trust_set_txn,
  xrpl_txn_type_select,
  xrpl_create_account,
  xrpl_load_wallet,
  xrpl_wallet_info,
  xrpl_wallet_sign,
  xaman_payload_set,
  xaman_payment,
  xaman_wait_for_signature,
  xaman_simple_login,
  xaman_simple_logout,
  xaman_variable_get,
  xaman_variable_name,
  xaman_variable_set,
  logic_false,
  logic_null,
  logic_true,
  logic_undefined,
  array_append,
  array_init,
  lists_sort_json_value
];
