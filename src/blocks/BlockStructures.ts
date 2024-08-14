import { animation_confetti } from '@/blocks/animation/confettiAnimationBlock';
import {
  json_create,
  json_get_value,
  json_key_value_pair,
  json_append_key_values,
  json_to_text,
  text_to_json,
  json_add_key_value_pairs
} from '@/blocks/json/jsonValueBlock';
import {
  text_to_lowercase,
  text_to_number,
  text_to_uppercase,
  number_to_text
} from '@/blocks/text/textConvertBlock';
import {
  code_multi_line_comment
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
  xrpl_ripple_epoch_to_datetime,
  xrpl_datetime_to_ripple_epoch
} from '@/blocks/xrpl/datetimeToRippleEpochBlock';
import {
  xrpl_command_account_info,
  xrpl_command_account_lines
} from '@/blocks/xrpl/xrplAccountInfoBlock';
import {
  xrpl_payload_rippling_config
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
  xrpl_extract_offer_create_details,
  xrpl_extract_transaction_details
} from '@/blocks/xrpl/xrplAnalyticsTxnBlock';
import {
  xrpl_client_initialize
} from '@/blocks/xrpl/xrplClientInitializeBlock';
import {
  xrpl_command_get_nft_info
} from '@/blocks/xrpl/xrplClioServerBlock';
import {
  xrpl_select_faucet_network_uri,
  xrpl_select_websocket_endpoint
} from '@/blocks/xrpl/xrplNetworkSelectionBlock';
import {
  xrpl_payload_nft_buy_offer
} from '@/blocks/xrpl/xrplNFTokenBlock';
import {
  xrpl_payload_token_buy_offer,
  xrpl_payload_token_sell_offer
} from '@/blocks/xrpl/xrplOfferTransactionBlock';
import {
  xrpl_command_nft_buy_offers
} from '@/blocks/xrpl/xrplPathAndOrderBookBlock';
import {
  xrpl_payload_token_payment,
} from '@/blocks/xrpl/xrplPaymentTransactionBlock';
import {
  xrpl_create_account_and_request_faucet,
  xrpl_request_faucet
} from '@/blocks/xrpl/xrplRequestFaucetBlock';
import {
  xrpl_autofill_payload,
  xrpl_command_submit_signed_transaction,
  xrpl_submit_transaction,
  xrpl_command_tx
} from '@/blocks/xrpl/xrplSubmitBlock';
import {
  xrpl_command_subscribe_account_txn,
  xrpl_command_subscribe_streams_all_txn,
  xrpl_command_unsubscribe_account_txn,
  xrpl_command_unsubscribe_streams_all_txn
} from '@/blocks/xrpl/xrplSubscribeBlock';
import {
  xrpl_define_token_data,
  xrpl_calculate_token_amount,
  xrpl_set_token_amount,
  xrpl_select_token
} from '@/blocks/xrpl/xrplTokenBlock';
import {
  xrpl_payload_trustline_config
} from '@/blocks/xrpl/xrplTrustSetTransactionBlock';
import {
  xrpl_transaction_type
} from '@/blocks/xrpl/xrplTransactionTypeBlock';
import {
  xrpl_generate_wallet,
  xrpl_load_wallet,
  xrpl_wallet_info,
  xrpl_wallet_sign
} from '@/blocks/xrpl/xrplWalletBlock';
import {
  xaman_request_transaction_signature,
  xaman_request_payment_signature,
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
  logic_true,
  logic_undefined
} from '@/blocks/logic/logicBlock';
import {
  lists_append,
  lists_sort_json_value
} from '@/blocks/list/arrayInitBlock';

export const BlockStructures = [
  animation_confetti,
  json_create,
  json_get_value,
  json_key_value_pair,
  json_append_key_values,
  json_to_text,
  text_to_json,
  json_add_key_value_pairs,
  text_to_lowercase,
  text_to_number,
  text_to_uppercase,
  number_to_text,
  code_multi_line_comment,
  datetime_current,
  datetime_create,
  datetime_adjust,
  datetime_compare,
  datetime_text_format,
  datetime_to_text,
  datetime_timezone,
  xrpl_ripple_epoch_to_datetime,
  xrpl_datetime_to_ripple_epoch,
  xrpl_command_account_info,
  xrpl_command_account_lines,
  xrpl_payload_rippling_config,
  xrpl_address,
  xrpl_exchange_address,
  xrpl_drops_to_xrp,
  xrpl_xrp_to_drops,
  xrpl_extract_offer_create_details,
  xrpl_extract_transaction_details,
  xrpl_client_initialize,
  xrpl_command_get_nft_info,
  xrpl_select_faucet_network_uri,
  xrpl_select_websocket_endpoint,
  xrpl_payload_nft_buy_offer,
  xrpl_payload_token_buy_offer,
  xrpl_payload_token_sell_offer,
  xrpl_command_nft_buy_offers,
  xrpl_payload_token_payment,
  xrpl_create_account_and_request_faucet,
  xrpl_request_faucet,
  xrpl_autofill_payload,
  xrpl_command_submit_signed_transaction,
  xrpl_submit_transaction,
  xrpl_command_tx,
  xrpl_command_subscribe_account_txn,
  xrpl_command_subscribe_streams_all_txn,
  xrpl_command_unsubscribe_account_txn,
  xrpl_command_unsubscribe_streams_all_txn,
  xrpl_define_token_data,
  xrpl_calculate_token_amount,
  xrpl_set_token_amount,
  xrpl_select_token,
  xrpl_payload_trustline_config,
  xrpl_transaction_type,
  xrpl_generate_wallet,
  xrpl_load_wallet,
  xrpl_wallet_info,
  xrpl_wallet_sign,
  xaman_request_transaction_signature,
  xaman_request_payment_signature,
  xaman_wait_for_signature,
  xaman_login,
  xaman_logout,
  xaman_variable_get,
  xaman_variable_name,
  xaman_variable_set,
  logic_false,
  logic_true,
  logic_undefined,
  lists_append,
  lists_sort_json_value
];
