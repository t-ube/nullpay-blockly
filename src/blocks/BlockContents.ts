// @/blocks/BlockContents.tsx
import { IBaseBlock, IBlockTypesMap, XRPLSubCategories } from "@/interfaces/IBaseBlock";

export const initialBlockTypesMap: IBlockTypesMap<IBaseBlock> = {
  xrpl: [
    {
      height: 54,
      block: `
        <block type="xrpl_generate_wallet" x="0" y="0"></block>
      `,
      title: "XRPL Generate Wallet",
      description: "This block generates a new wallet on the XRPL (XRP Ledger). The generated wallet includes a unique address and a corresponding secret key, which can be used for transactions on the XRPL network. Note that the wallet needs to be activated by funding it with the minimum reserve amount before it can be used for transactions. Ensure to store the generated keys securely.",
      categories: ["xrpl"],
      blockType: "xrpl_generate_wallet",
      subCategories: [XRPLSubCategories.BASIC_OPERATIONS]
    },
    {
      height: 150,
      block: `
        <block type="xrpl_create_account_and_request_faucet" x="0" y="0"></block>
      `,
      title: "XRPL Create Account and Custom Faucet Request",
      description: "Request funds from a custom XRPL faucet.",
      categories: ["xrpl"],
      blockType: "xrpl_create_account_and_request_faucet",
      subCategories: [XRPLSubCategories.FUNDING_OPERATIONS]
    },
    {
      height: 50,
      block: `
        <block type="xrpl_select_websocket_endpoint" x="0" y="0"></block>
      `,
      title: "XRPL Network Selection",
      description: "Select the WebSocket URL for the XRPL network.",
      categories: ["xrpl"],
      blockType: "xrpl_select_websocket_endpoint",
      subCategories: [XRPLSubCategories.BASIC_OPERATIONS]
    },
    {
      height: 50,
      block: `
        <block type="xrpl_select_faucet_network_uri" x="0" y="0"></block>
      `,
      title: "XRPL Faucet Network Selection",
      description: "Select the faucet network for creating test accounts.",
      categories: ["xrpl"],
      blockType: "xrpl_select_faucet_network_uri",
      subCategories: [XRPLSubCategories.FUNDING_OPERATIONS]
    },
    {
      height: 150,
      block: `
        <block type="xrpl_request_faucet" x="0" y="0"></block>
      `,
      title: "XRPL Faucet Request",
      description: "Request funds from the default XRPL faucet.",
      categories: ["xrpl"],
      blockType: "xrpl_request_faucet",
      subCategories: [XRPLSubCategories.FUNDING_OPERATIONS]
    },
    {
      height: 50,
      block: `
        <block type="xrpl_address" x="0" y="0"></block>
      `,
      title: "XRPL Address",
      description: "Define an XRPL address.",
      categories: ["xrpl"],
      blockType: "xrpl_address",
      subCategories: [XRPLSubCategories.BASIC_OPERATIONS]
    },
    {
      height: 50,
      block: `
        <block type="xrpl_exchange_address" x="0" y="0"></block>
      `,
      title: "XRPL Exchange Address",
      description: "Define an XRPL exchange address.",
      categories: ["xrpl"],
      blockType: "xrpl_exchange_address",
      subCategories: [XRPLSubCategories.BASIC_OPERATIONS]
    },
    {
      height: 50,
      block: `
        <block type="xrpl_xrp_to_drops" x="0" y="0"></block>
      `,
      title: "XRP to Drops",
      description: "Convert XRP to drops.",
      categories: ["xrpl"],
      blockType: "xrpl_xrp_to_drops",
      subCategories: [XRPLSubCategories.FUNDING_OPERATIONS]
    },
    {
      height: 50,
      block: `
        <block type="xrpl_drops_to_xrp" x="0" y="0"></block>
      `,
      title: "Drops to XRP",
      description: "Convert drops to XRP.",
      categories: ["xrpl"],
      blockType: "xrpl_drops_to_xrp",
      subCategories: [XRPLSubCategories.FUNDING_OPERATIONS]
    },
    {
      height: 80,
      block: `
        <block type="xrpl_client_initialize" x="0" y="0"></block>
      `,
      title: "Initialize XRPL Client",
      description: "Initialize a new XRPL client to connect to the XRPL network.",
      categories: ["xrpl"],
      blockType: "xrpl_client_initialize",
      subCategories: [XRPLSubCategories.BASIC_OPERATIONS]
    },
    {
      height: 150,
      block: `
        <block type="xrpl_command_account_info" x="0" y="0"></block>
      `,
      title: "XRPL Account Info",
      description: "Retrieve information about a specific XRPL account.",
      categories: ["xrpl"],
      blockType: "xrpl_command_account_info",
      subCategories: [XRPLSubCategories.ACCOUNT_INFORMATION]
    },
    {
      height: 93.5,
      block: `
        <block type="xrpl_command_get_account_activators" x="0" y="0"></block>
      `,
      title: "XRPL Get Account Activators",
      description: "Retrieve information about which account activated this XRPL account by finding the first payment transaction.",
      categories: ["xrpl"],
      blockType: "xrpl_command_get_account_activators",
      subCategories: [XRPLSubCategories.ACCOUNT_INFORMATION]
    },
    {
      height: 93.5,
      block: `
        <block type="xrpl_command_get_activated_accounts" x="0" y="0"></block>
      `,
      title: "XRPL Get Activated Accounts",
      description: "Retrieve a list of accounts that were activated by the specified address. Returns activation transaction details including date, amount, and transaction hash.",
      categories: ["xrpl"],
      blockType: "xrpl_command_get_activated_accounts",
      subCategories: [XRPLSubCategories.ACCOUNT_INFORMATION]
    },
    {
      height: 131,
      block: `
        <block type="xrpl_command_subscribe_account_txn" x="0" y="0"></block>
      `,
      title: "Subscribe Account Transactions",
      description: "Subscribe to transactions for a specific XRPL account to receive real-time updates.",
      categories: ["xrpl"],
      blockType: "xrpl_command_subscribe_account_txn",
      subCategories: [XRPLSubCategories.MONITORING]
    },
    {
      height: 100,
      block: `
        <block type="xrpl_command_unsubscribe_account_txn" x="0" y="0"></block>
      `,
      title: "Unsubscribe Account Transactions",
      description: "Unsubscribe from transactions for a specific XRPL account to stop receiving updates.",
      categories: ["xrpl"],
      blockType: "xrpl_command_unsubscribe_account_txn",
      subCategories: [XRPLSubCategories.MONITORING]
    },
    {
      height: 131,
      block: `
        <block type="xrpl_command_subscribe_streams_all_txn" x="0" y="0"></block>
      `,
      title: "Subscribe All Transactions",
      description: "Subscribe to all transactions on the XRPL to receive real-time updates for every transaction.",
      categories: ["xrpl"],
      blockType: "xrpl_command_subscribe_streams_all_txn",
      subCategories: [XRPLSubCategories.MONITORING]
    },
    {
      height: 100,
      block: `
        <block type="xrpl_command_unsubscribe_streams_all_txn" x="0" y="0"></block>
      `,
      title: "Unsubscribe All Transactions",
      description: "Unsubscribe from all transactions on the XRPL to stop receiving updates for every transaction.",
      categories: ["xrpl"],
      blockType: "xrpl_command_unsubscribe_streams_all_txn",
      subCategories: [XRPLSubCategories.MONITORING]
    },
    {
      height: 131,
      block: `
        <block type="xrpl_command_subscribe_filtered_transactions" x="0" y="0"></block>
      `,
      title: "Subscribe Filtered Transactions",
      description: "Subscribe to specified transaction types on the XRPL to receive real-time updates for filtered transactions.",
      categories: ["xrpl"],
      blockType: "xrpl_command_subscribe_filtered_transactions",
      subCategories: [XRPLSubCategories.MONITORING]
    },
    {
      height: 100,
      block: `
        <block type="xrpl_command_unsubscribe_filtered_transactions" x="0" y="0"></block>
      `,
      title: "Unsubscribe Filtered Transactions",
      description: "Unsubscribe from filtered transactions on the XRPL to stop receiving updates for specified transaction types.",
      categories: ["xrpl"],
      blockType: "xrpl_command_unsubscribe_filtered_transactions",
      subCategories: [XRPLSubCategories.MONITORING]
    },
    {
      height: 131,
      block: `
        <block type="xrpl_command_subscribe_first_ledger_amm_transactions" x="0" y="0"></block>
      `,
      title: "Subscribe FirstLedger AMM Transactions",
      description: "Subscribe to AccountSet and TrustSet transactions on the XRPL. Detects potential FirstLedger token issuers and their corresponding trust lines.",
      categories: ["xrpl"],
      blockType: "xrpl_command_subscribe_first_ledger_amm_transactions",
      subCategories: [XRPLSubCategories.MONITORING]
    },
    {
      height: 80,
      block: `
        <block type="xrpl_load_wallet" x="0" y="0"></block>
      `,
      title: "Load Wallet from Seed",
      description: "Load an existing wallet using a seed to manage XRPL accounts and transactions.",
      categories: ["xrpl"],
      blockType: "xrpl_load_wallet",
      subCategories: [XRPLSubCategories.BASIC_OPERATIONS]
    },
    {
      height: 80,
      block: `
        <block type="xrpl_load_wallet_from_secret_numbers" x="0" y="0"></block>
      `,
      title: "Load Wallet from Secret Numbers",
      description: "Load an existing wallet using secret numbers.",
      categories: ["xrpl"],
      blockType: "xrpl_load_wallet_from_secret_numbers",
      subCategories: [XRPLSubCategories.BASIC_OPERATIONS]
    },
    {
      height: 80,
      block: `
        <block type="xrpl_wallet_info" x="0" y="0"></block>
      `,
      title: "Wallet Info",
      description: "Retrieve information about an XRPL wallet. Provide the wallet ID to get the address and secret.",
      categories: ["xrpl"],
      blockType: "xrpl_wallet_info",
      subCategories: [XRPLSubCategories.BASIC_OPERATIONS]
    },
    {
      height: 112,
      block: `
        <block type="xrpl_wallet_balance" x="0" y="0"></block>
      `,
      title: "Get Wallet Balance",
      description: "Retrieve the balance of an XRPL wallet. Provide the wallet ID to get the current XRP balance.",
      categories: ["xrpl"],
      blockType: "xrpl_wallet_balance",
      subCategories: [XRPLSubCategories.BASIC_OPERATIONS]
    },
    {
      height: 175,
      block: `
        <block type="xrpl_submit_transaction" x="0" y="0"></block>
      `,
      title: "XRPL Easy Submit",
      description: "Submit a transaction to the XRPL with autofill capability. Specify the XRPL client, wallet, and transaction. The transaction will be automatically filled with necessary details and the result will be stored in the specified variable.",
      categories: ["xrpl"],
      blockType: "xrpl_submit_transaction",
      subCategories: [XRPLSubCategories.TRANSACTIONS]
    },
    {
      height: 99,
      block: `
        <block type="xrpl_autofill_payload" x="0" y="0"></block>
      `,
      title: "XRPL Payload Autofill",
      description: "Automatically fill in a transaction using the specified XRPL client. Define the XRPL client and the payload to autofill.",
      categories: ["xrpl"],
      blockType: "xrpl_autofill_payload",
      subCategories: [XRPLSubCategories.TRANSACTIONS]
    },
    {
      height: 105,
      block: `
        <block type="xrpl_wallet_sign" x="0" y="0"></block>
      `,
      title: "Sign Wallet",
      description: "Sign a transaction with the wallet's private key to authorize it.",
      categories: ["xrpl"],
      blockType: "xrpl_wallet_sign",
      subCategories: [XRPLSubCategories.TRANSACTIONS]
    },
    {
      height: 146,
      block: `
        <block type="xrpl_command_submit_signed_transaction" x="0" y="0"></block>
      `,
      title: "Submit",
      description: "Submit a signed transaction to the XRPL network for processing.",
      categories: ["xrpl"],
      blockType: "xrpl_command_submit_signed_transaction",
      subCategories: [XRPLSubCategories.TRANSACTIONS]
    },
    {
      height: 50,
      block: `
        <block type="xrpl_datetime_to_ripple_epoch" x="0" y="0"></block>
      `,
      title: "DateTime to Ripple Epoch",
      description: "Convert a date and time to Ripple epoch time.",
      categories: ["xrpl"],
      blockType: "xrpl_datetime_to_ripple_epoch",
      subCategories: [XRPLSubCategories.TIME_OPERATIONS]
    },
    {
      height: 50,
      block: `
        <block type="xrpl_ripple_epoch_to_datetime" x="0" y="0"></block>
      `,
      title: "Ripple Epoch to DateTime",
      description: "Convert Ripple epoch time to date and time.",
      categories: ["xrpl"],
      blockType: "xrpl_ripple_epoch_to_datetime",
      subCategories: [XRPLSubCategories.TIME_OPERATIONS]
    },
    {
      height: 50,
      block: `
        <block type="xrpl_select_token" x="0" y="0"></block>
      `,
      title: "XRPL Token Select",
      description: "Select an issued token on the XRPL from the dropdown.",
      categories: ["xrpl"],
      blockType: "xrpl_select_token",
      subCategories: [XRPLSubCategories.TOKEN_OPERATIONS]
    },
    {
      height: 96,
      block: `
        <block type="xrpl_define_token_data" x="0" y="0"></block>
      `,
      title: "XRPL Define Token Data",
      description: "Define token data for use in XRP Ledger operations. Specify the issuer address, currency code, and total supply. Note: This does not create a token on the ledger, but prepares the data for future use.",
      categories: ["xrpl"],
      blockType: "xrpl_define_token_data",
      subCategories: [XRPLSubCategories.TOKEN_OPERATIONS]
    },
    {
      height: 86,
      block: `
        <block type="xrpl_set_token_amount" x="0" y="0"></block>
      `,
      title: "XRPL Token Amount",
      description: "Set the amount of a token. Specify the information of the newly created token and its value.",
      categories: ["xrpl"],
      blockType: "xrpl_set_token_amount",
      subCategories: [XRPLSubCategories.TOKEN_OPERATIONS]
    },
    {
      height: 50,
      block: `
        <block type="xrpl_calculate_token_amount" x="0" y="0"></block>
      `,
      title: "XRPL Token Amount Arithmetic",
      description: "Perform arithmetic operations on XRPL token amounts.This block allows you to add, subtract, multiply, or divide an XRPL token amount by a given value. The 'TOKEN' input can be an XRPL token amount object, a number, or a string representation of a number. The 'OPERATOR' dropdown selects the arithmetic operation to perform, and the 'VALUE' input specifies the number to apply the operation to.The output of this block is a new XRPL token amount object with the result of the arithmetic operation.",
      categories: ["xrpl"],
      blockType: "xrpl_calculate_token_amount",
      subCategories: [XRPLSubCategories.TOKEN_OPERATIONS]
    },
    {
      height: 98.5,
      block: `
        <block type="xrpl_command_get_nft_info" x="0" y="0"></block>
      `,
      title: "XRPL Get NFT Info",
      description: "Get information about an NFT (Non-Fungible Token) on the XRPL using the Clio API service.This block allows you to fetch details about a specific NFT, including its owner, metadata, and other properties. The 'XRPL client' input specifies the client connection to the XRPL, which is required to interact with the Clio API. The 'NFT ID' input is the unique identifier of the NFT you want to retrieve information for.The block outputs the status of the operation ('success' or 'error') and the response data from the Clio API, which can be used for further processing in your program. Note: Using this block requires an active connection to the Clio API service, which provides access to the XRPL data.",
      categories: ["xrpl"],
      blockType: "xrpl_command_get_nft_info",
      subCategories: [XRPLSubCategories.NFT_OPERATIONS]
    },
    {
      height: 258.5,
      block: `
        <block type="xrpl_payload_nftoken_mint" x="0" y="0"></block>
      `,
      title: "XRPL NFT Mint Payload",
      description: "",
      categories: ["xrpl"],
      blockType: "xrpl_payload_nftoken_mint",
      subCategories: [XRPLSubCategories.NFT_OPERATIONS]
    },
    {
      height: 143.5,
      block: `
        <block type="xrpl_payload_nft_buy_offer" x="0" y="0"></block>
      `,
      title: "XRPL NFT Buy offer Payload",
      description: "This block creates an NFT buy offer payload that includes the specified information about the token and its value. The generated payload can be used to submit an NFT buy offer transaction on the XRPL network.",
      categories: ["xrpl"],
      blockType: "xrpl_payload_nft_buy_offer",
      subCategories: [XRPLSubCategories.NFT_OPERATIONS]
    },
    {
      height: 50,
      block: `
        <block type="xrpl_payload_rippling_config" x="0" y="0"></block>
      `,
      title: "XRPL Rippling",
      description: "Create a rippling transaction for the XRPL. Specify whether to enable or disable rippling and the address to set this for.",
      categories: ["xrpl"],
      blockType: "xrpl_payload_rippling_config",
      subCategories: [XRPLSubCategories.TRUST_LINE_OPERATIONS]
    },
    {
      height: 80,
      block: `
        <block type="xrpl_payload_account_flags_config" x="0" y="0"></block>
      `,
      title: "XRPL Account Flags",
      description: "Configure multiple account settings on the XRPL. Control flags for default rippling, destination tags, authorization requirements, and XRP transactions. Each flag can be enabled, disabled, or left unchanged.",
      categories: ["xrpl"],
      blockType: "xrpl_payload_account_flags_config",
      subCategories: [XRPLSubCategories.ACCOUNT_INFORMATION]
    },
    {
      height: 99,
      block: `
        <block type="xrpl_payload_trustline_config" x="0" y="0"></block>
      `,
      title: "XRPL Trust Set",
      description: "Create a trust line setting transaction for the XRPL. Specify the token and the address to set the trust line for.",
      categories: ["xrpl"],
      blockType: "xrpl_payload_trustline_config",
      subCategories: [XRPLSubCategories.TRUST_LINE_OPERATIONS]
    },
    {
      height: 99,
      block: `
        <block type="xrpl_payload_trustline_remove_config" x="0" y="0"></block>
      `,
      title: "XRPL Remove Trust Line",
      description: "Remove a trust line setting transaction for the XRPL. Specify the token and the address to set the trust line for.",
      categories: ["xrpl"],
      blockType: "xrpl_payload_trustline_remove_config",
      subCategories: [XRPLSubCategories.TRUST_LINE_OPERATIONS]
    },
    {
      height: 54,
      block: `
        <block type="xrpl_decode_currency" x="0" y="0"></block>
      `,
      title: "XRPL Decode Currency",
      description: "Decode a hexadecimal currency code used in XRPL transactions to a human-readable format. This block takes a 40-character hex string and converts it to the corresponding currency code or token name.",
      categories: ["xrpl"],
      blockType: "xrpl_decode_currency",
      subCategories: [XRPLSubCategories.TRUST_LINE_OPERATIONS]
    },
    {
      height: 120,
      block: `
        <block type="xrpl_payload_payment" x="0" y="0"></block>
      `,
      title: "XRPL Payment",
      description: "Create a payment transaction on the XRPL. Specify account address, destination address, and amount for the transaction.",
      categories: ["xrpl"],
      blockType: "xrpl_payload_payment",
      subCategories: [XRPLSubCategories.TOKEN_OPERATIONS]
    },
    {
      height: 120,
      block: `
        <block type="xrpl_payload_token_payment" x="0" y="0"></block>
      `,
      title: "XRPL Payment Token",
      description: "Create a payment transaction on the XRPL. Specify the token, account address, destination address, and amount for the transaction.",
      categories: ["xrpl"],
      blockType: "xrpl_payload_token_payment",
      subCategories: [XRPLSubCategories.TOKEN_OPERATIONS]
    },
    {
      height: 120,
      block: `
        <block type="xrpl_payload_token_buy_offer" x="0" y="0"></block>
      `,
      title: "XRPL Buy Offer",
      description: "Create a buy offer for tokens on the XRPL DEX.",
      categories: ["xrpl"],
      blockType: "xrpl_payload_token_buy_offer",
      subCategories: [XRPLSubCategories.DEX_OPERATIONS]
    },
    {
      height: 120,
      block: `
        <block type="xrpl_payload_token_sell_offer" x="0" y="0"></block>
      `,
      title: "XRPL Sell Offer",
      description: "Create a sale offer for tokens on the XRPL DEX.",
      categories: ["xrpl"],
      blockType: "xrpl_payload_token_sell_offer",
      subCategories: [XRPLSubCategories.DEX_OPERATIONS]
    },
    {
      height: 23.5,
      block: `
        <block type="xrpl_transaction_type" x="0" y="0"></block>
      `,
      title: "XRPL Transaction Type Select",
      description: "Select an XRPL transaction type from the dropdown.",
      categories: ["xrpl"],
      blockType: "xrpl_transaction_type",
      subCategories: [XRPLSubCategories.TRANSACTIONS]
    },
    {
      height: 118,
      block: `
        <block type="xrpl_command_tx" x="0" y="0"></block>
      `,
      title: "XRPL Get Transaction",
      description: "Retrieve a transaction from the XRPL using the specified client and transaction hash.",
      categories: ["xrpl"],
      blockType: "xrpl_command_tx",
      subCategories: [XRPLSubCategories.TRANSACTIONS]
    },
    {
      height: 93.5,
      block: `
        <block type="xrpl_command_account_lines" x="0" y="0"></block>
      `,
      title: "XRPL Get Account Lines",
      description: "Retrieve information about the trust lines associated with an XRPL account.",
      categories: ["xrpl"],
      blockType: "xrpl_command_account_lines",
      subCategories: [XRPLSubCategories.TRUST_LINE_OPERATIONS]
    },
    {
      height: 167.5,
      block: `
        <block type="xrpl_extract_transaction_details" x="0" y="0"></block>
      `,
      title: "XRPL Read Transaction info",
      description: "Retrieve transaction information and store it in separate variables.",
      categories: ["xrpl"],
      blockType: "xrpl_extract_transaction_details",
      subCategories: [XRPLSubCategories.TRANSACTIONS]
    },
    {
      height: 98.5,
      block: `
        <block type="xrpl_command_nft_buy_offers" x="0" y="0"></block>
      `,
      title: "XRPL Get NFT Buy Offers",
      description: "Get the current buy offers for a specific NFT (Non-Fungible Token) on the XRPL.This block allows you to retrieve the list of active buy offers for a given NFT. The 'XRPL client' input specifies the connection to the XRPL, which is required to make the API request. The 'NFT ID' input is the unique identifier of the NFT you want to fetch the buy offers for.The block outputs the status of the operation ('success' or 'error') and the response data from the API, which contains the list of buy offers for the specified NFT. This information can be used for further processing or decision-making in your program. Note: Using this block requires an active connection to the XRPL and the ability to make the necessary API requests to fetch the buy offer data.",
      categories: ["xrpl"],
      blockType: "xrpl_command_nft_buy_offers",
      subCategories: [XRPLSubCategories.NFT_OPERATIONS]
    },
    {
      height: 143.5,
      block: `
        <block type="xrpl_extract_offer_create_details" x="0" y="0"></block>
      `,
      title: "XRPL Extract Offer Create Transaction",
      description: "Extract and process an OfferCreate transaction from the XRPL into separate variables.",
      categories: ["xrpl"],
      blockType: "xrpl_extract_offer_create_details",
      subCategories: [XRPLSubCategories.DEX_OPERATIONS]
    },
    {
      height: 1815,
      block: `
  <block type="xaman_login" x="0" y="0">
    <field name="USER_INFO">userInfo</field>
    <next>
      <block type="variables_set">
        <field name="VAR">userAccount</field>
        <value name="VALUE">
          <block type="json_get_value">
            <value name="JSON">
              <block type="variables_get">
                <field name="VAR">userInfo</field>
              </block>
            </value>
            <value name="KEY">
              <block type="text">
                <field name="TEXT">account</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="form_modal_block">
            <field name="INPUT">{"editable":false,"title":{"default":"Semi-Automatic Bid on xrp.cafe"},"items":{"label_0":{"key":"label_0","value":"000800003B47E48122DE8B064405969E0426B39DA2BF658811007754040393BA","type":"string","name":{"default":"NFT ID"},"description":{"default":"New Description"}},"label_2":{"key":"label_2","value":0.2,"type":"number","name":{"default":"Starting Bid (XRP)"},"description":{"default":"New Description"}},"label_4":{"key":"label_4","value":0.1,"type":"number","name":{"default":"Bid Step (XRP)"},"description":{"default":"New Description"}}}}</field>
            <field name="FORM_RESULT">result</field>
            <next>
              <block type="dynamic_if">
                <value name="IF0">
                  <block type="form_submitted">
                    <value name="FORM_RESULT">
                      <block type="variables_get">
                        <field name="VAR">result</field>
                      </block>
                    </value>
                  </block>
                </value>
                <statement name="DO0">
                  <block type="xrpl_client_initialize">
                    <field name="XRPL_CLIENT">xrplClient</field>
                    <value name="WEBSOCKET_ENDPOINT">
                      <block type="xrpl_select_websocket_endpoint">
                        <field name="NETWORK_TYPE">xrpl</field>
                        <field name="WEBSOCKET_ENDPOINT">wss://s1.ripple.com</field>
                      </block>
                    </value>
                    <next>
                      <block type="variables_set">
                        <field name="VAR">nftID</field>
                        <value name="VALUE">
                          <block type="form_variable_get">
                            <value name="FORM_RESULT">
                              <block type="variables_get">
                                <field name="VAR">result</field>
                              </block>
                            </value>
                            <value name="VARIABLE_NAME">
                              <block type="text">
                                <field name="TEXT">NFT ID</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <next>
                          <block type="variables_set">
                            <field name="VAR">brokerAddress</field>
                            <value name="VALUE">
                              <block type="xrpl_address">
                                <field name="ADDRESS">rpx9JThQ2y37FaGeeJP7PXDUVEXY3PHZSC</field>
                              </block>
                            </value>
                            <next>
                              <block type="variables_set">
                                <field name="VAR">bidStep</field>
                                <value name="VALUE">
                                  <block type="xrpl_xrp_to_drops">
                                    <value name="AMOUNT">
                                      <block type="form_variable_get">
                                        <value name="FORM_RESULT">
                                          <block type="variables_get">
                                            <field name="VAR">result</field>
                                          </block>
                                        </value>
                                        <value name="VARIABLE_NAME">
                                          <block type="text">
                                            <field name="TEXT">Bid Step (XRP)</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                                <next>
                                  <block type="variables_set">
                                    <field name="VAR">startBid</field>
                                    <value name="VALUE">
                                      <block type="xrpl_xrp_to_drops">
                                        <value name="AMOUNT">
                                          <block type="form_variable_get">
                                            <value name="FORM_RESULT">
                                              <block type="variables_get">
                                                <field name="VAR">result</field>
                                              </block>
                                            </value>
                                            <value name="VARIABLE_NAME">
                                              <block type="text">
                                                <field name="TEXT">Starting Bid (XRP)</field>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="xrpl_command_get_nft_info">
                                        <field name="IS_ERROR">isError</field>
                                        <field name="NFT_INFO">response</field>
                                        <value name="XRPL_CLIENT">
                                          <block type="variables_get">
                                            <field name="VAR">xrplClient</field>
                                          </block>
                                        </value>
                                        <value name="NFT_ID">
                                          <block type="variables_get">
                                            <field name="VAR">nftID</field>
                                          </block>
                                        </value>
                                        <next>
                                          <block type="variables_set">
                                            <field name="VAR">ownerAddress</field>
                                            <value name="VALUE">
                                              <block type="json_get_value">
                                                <value name="JSON">
                                                  <block type="variables_get">
                                                    <field name="VAR">response</field>
                                                  </block>
                                                </value>
                                                <value name="KEY">
                                                  <block type="text">
                                                    <field name="TEXT">owner</field>
                                                  </block>
                                                </value>
                                              </block>
                                            </value>
                                            <next>
                                              <block type="controls_whileUntil">
                                                <field name="MODE">WHILE</field>
                                                <value name="BOOL">
                                                  <block type="logic_compare">
                                                    <field name="OP">NEQ</field>
                                                    <value name="A">
                                                      <block type="variables_get">
                                                        <field name="VAR">ownerAddress</field>
                                                      </block>
                                                    </value>
                                                    <value name="B">
                                                      <block type="variables_get">
                                                        <field name="VAR">userAccount</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <statement name="DO">
                                                  <block type="xrpl_command_nft_buy_offers">
                                                    <field name="IS_ERROR">isError</field>
                                                    <field name="NFT_BUY_OFFERS">response</field>
                                                    <value name="XRPL_CLIENT">
                                                      <block type="variables_get">
                                                        <field name="VAR">xrplClient</field>
                                                      </block>
                                                    </value>
                                                    <value name="NFT_ID">
                                                      <block type="variables_get">
                                                        <field name="VAR">nftID</field>
                                                      </block>
                                                    </value>
                                                    <next>
                                                      <block type="dynamic_if">
                                                        <mutation else="1"></mutation>
                                                        <value name="IF0">
                                                          <block type="logic_compare">
                                                            <field name="OP">EQ</field>
                                                            <value name="A">
                                                              <block type="variables_get">
                                                                <field name="VAR">isError</field>
                                                              </block>
                                                            </value>
                                                            <value name="B">
                                                              <block type="logic_false"></block>
                                                            </value>
                                                          </block>
                                                        </value>
                                                        <statement name="DO0">
                                                          <block type="variables_set">
                                                            <field name="VAR">sortedOffers</field>
                                                            <value name="VALUE">
                                                              <block type="lists_sort_json_value">
                                                                <field name="COMPARISON_TYPE">numeric</field>
                                                                <field name="ORDER">desc</field>
                                                                <value name="LIST">
                                                                  <block type="json_get_value">
                                                                    <value name="JSON">
                                                                      <block type="variables_get">
                                                                        <field name="VAR">response</field>
                                                                      </block>
                                                                    </value>
                                                                    <value name="KEY">
                                                                      <block type="text">
                                                                        <field name="TEXT">offers</field>
                                                                      </block>
                                                                    </value>
                                                                  </block>
                                                                </value>
                                                                <value name="KEY">
                                                                  <block type="text">
                                                                    <field name="TEXT">amount</field>
                                                                  </block>
                                                                </value>
                                                              </block>
                                                            </value>
                                                            <next>
                                                              <block type="variables_set">
                                                                <field name="VAR">topOffer</field>
                                                                <value name="VALUE">
                                                                  <block type="lists_getIndex">
                                                                    <mutation statement="false" at="true"></mutation>
                                                                    <field name="MODE">GET</field>
                                                                    <field name="WHERE">FROM_START</field>
                                                                    <value name="VALUE">
                                                                      <block type="variables_get">
                                                                        <field name="VAR">sortedOffers</field>
                                                                      </block>
                                                                    </value>
                                                                    <value name="AT">
                                                                      <block type="math_number">
                                                                        <field name="NUM">1</field>
                                                                      </block>
                                                                    </value>
                                                                  </block>
                                                                </value>
                                                                <next>
                                                                  <block type="variables_set">
                                                                    <field name="VAR">highestBidAccount</field>
                                                                    <value name="VALUE">
                                                                      <block type="json_get_value">
                                                                        <value name="JSON">
                                                                          <block type="variables_get">
                                                                            <field name="VAR">topOffer</field>
                                                                          </block>
                                                                        </value>
                                                                        <value name="KEY">
                                                                          <block type="text">
                                                                            <field name="TEXT">owner</field>
                                                                          </block>
                                                                        </value>
                                                                      </block>
                                                                    </value>
                                                                    <next>
                                                                      <block type="variables_set">
                                                                        <field name="VAR">highestAmount</field>
                                                                        <value name="VALUE">
                                                                          <block type="json_get_value">
                                                                            <value name="JSON">
                                                                              <block type="variables_get">
                                                                                <field name="VAR">topOffer</field>
                                                                              </block>
                                                                            </value>
                                                                            <value name="KEY">
                                                                              <block type="text">
                                                                                <field name="TEXT">amount</field>
                                                                              </block>
                                                                            </value>
                                                                          </block>
                                                                        </value>
                                                                        <next>
                                                                          <block type="dynamic_if">
                                                                            <value name="IF0">
                                                                              <block type="logic_compare">
                                                                                <field name="OP">NEQ</field>
                                                                                <value name="A">
                                                                                  <block type="variables_get">
                                                                                    <field name="VAR">highestBidAccount</field>
                                                                                  </block>
                                                                                </value>
                                                                                <value name="B">
                                                                                  <block type="variables_get">
                                                                                    <field name="VAR">userAccount</field>
                                                                                  </block>
                                                                                </value>
                                                                              </block>
                                                                            </value>
                                                                            <statement name="DO0">
                                                                              <block type="text_print">
                                                                                <value name="TEXT">
                                                                                  <block type="dynamic_text_join">
                                                                                    <mutation items="2"></mutation>
                                                                                    <value name="ADD0">
                                                                                      <block type="xrpl_drops_to_xrp">
                                                                                        <value name="AMOUNT">
                                                                                          <block type="variables_get">
                                                                                            <field name="VAR">highestAmount</field>
                                                                                          </block>
                                                                                        </value>
                                                                                      </block>
                                                                                    </value>
                                                                                    <value name="ADD1">
                                                                                      <block type="text">
                                                                                        <field name="TEXT">XRP</field>
                                                                                      </block>
                                                                                    </value>
                                                                                  </block>
                                                                                </value>
                                                                                <next>
                                                                                  <block type="variables_set">
                                                                                    <field name="VAR">newAmount</field>
                                                                                    <value name="VALUE">
                                                                                      <block type="xrpl_calculate_token_amount">
                                                                                        <field name="OPERATOR">+</field>
                                                                                        <value name="TOKEN">
                                                                                          <block type="variables_get">
                                                                                            <field name="VAR">highestAmount</field>
                                                                                          </block>
                                                                                        </value>
                                                                                        <value name="VALUE">
                                                                                          <block type="variables_get">
                                                                                            <field name="VAR">bidStep</field>
                                                                                          </block>
                                                                                        </value>
                                                                                      </block>
                                                                                    </value>
                                                                                    <next>
                                                                                      <block type="variables_set">
                                                                                        <field name="VAR">buyPayload</field>
                                                                                        <value name="VALUE">
                                                                                          <block type="xrpl_payload_nft_buy_offer">
                                                                                            <value name="OWNER_ID">
                                                                                              <block type="variables_get">
                                                                                                <field name="VAR">ownerAddress</field>
                                                                                              </block>
                                                                                            </value>
                                                                                            <value name="NFT_ID">
                                                                                              <block type="variables_get">
                                                                                                <field name="VAR">nftID</field>
                                                                                              </block>
                                                                                            </value>
                                                                                            <value name="AMOUNT">
                                                                                              <block type="variables_get">
                                                                                                <field name="VAR">newAmount</field>
                                                                                              </block>
                                                                                            </value>
                                                                                            <value name="DESTINATION_ADDRESS">
                                                                                              <block type="variables_get">
                                                                                                <field name="VAR">brokerAddress</field>
                                                                                              </block>
                                                                                            </value>
                                                                                          </block>
                                                                                        </value>
                                                                                        <next>
                                                                                          <block type="xaman_request_transaction_signature">
                                                                                            <field name="IS_ERROR">isError</field>
                                                                                            <field name="PAYLOAD_ID">payloadID</field>
                                                                                            <value name="TRANSACTION_PAYLOAD">
                                                                                              <block type="variables_get">
                                                                                                <field name="VAR">buyPayload</field>
                                                                                              </block>
                                                                                            </value>
                                                                                            <next>
                                                                                              <block type="xaman_wait_for_signature">
                                                                                                <value name="PAYLOAD_ID">
                                                                                                  <block type="variables_get">
                                                                                                    <field name="VAR">payloadID</field>
                                                                                                  </block>
                                                                                                </value>
                                                                                              </block>
                                                                                            </next>
                                                                                          </block>
                                                                                        </next>
                                                                                      </block>
                                                                                    </next>
                                                                                  </block>
                                                                                </next>
                                                                              </block>
                                                                            </statement>
                                                                          </block>
                                                                        </next>
                                                                      </block>
                                                                    </next>
                                                                  </block>
                                                                </next>
                                                              </block>
                                                            </next>
                                                          </block>
                                                        </statement>
                                                        <statement name="ELSE">
                                                          <block type="variables_set">
                                                            <field name="VAR">buyPayload</field>
                                                            <value name="VALUE">
                                                              <block type="xrpl_payload_nft_buy_offer">
                                                                <value name="OWNER_ID">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">ownerAddress</field>
                                                                  </block>
                                                                </value>
                                                                <value name="NFT_ID">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">nftID</field>
                                                                  </block>
                                                                </value>
                                                                <value name="AMOUNT">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">startBid</field>
                                                                  </block>
                                                                </value>
                                                                <value name="DESTINATION_ADDRESS">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">brokerAddress</field>
                                                                  </block>
                                                                </value>
                                                              </block>
                                                            </value>
                                                            <next>
                                                              <block type="xaman_request_transaction_signature">
                                                                <field name="IS_ERROR">isError</field>
                                                                <field name="PAYLOAD_ID">payloadID</field>
                                                                <value name="TRANSACTION_PAYLOAD">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">buyPayload</field>
                                                                  </block>
                                                                </value>
                                                                <next>
                                                                  <block type="xaman_wait_for_signature">
                                                                    <value name="PAYLOAD_ID">
                                                                      <block type="variables_get">
                                                                        <field name="VAR">payloadID</field>
                                                                      </block>
                                                                    </value>
                                                                  </block>
                                                                </next>
                                                              </block>
                                                            </next>
                                                          </block>
                                                        </statement>
                                                        <next>
                                                          <block type="controls_wait_seconds">
                                                            <value name="SECONDS">
                                                              <block type="math_number">
                                                                <field name="NUM">5</field>
                                                              </block>
                                                            </value>
                                                            <next>
                                                              <block type="xrpl_command_get_nft_info">
                                                                <field name="IS_ERROR">isError</field>
                                                                <field name="NFT_INFO">response</field>
                                                                <value name="XRPL_CLIENT">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">xrplClient</field>
                                                                  </block>
                                                                </value>
                                                                <value name="NFT_ID">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">nftID</field>
                                                                  </block>
                                                                </value>
                                                                <next>
                                                                  <block type="variables_set">
                                                                    <field name="VAR">ownerAddress</field>
                                                                    <value name="VALUE">
                                                                      <block type="json_get_value">
                                                                        <value name="JSON">
                                                                          <block type="variables_get">
                                                                            <field name="VAR">response</field>
                                                                          </block>
                                                                        </value>
                                                                        <value name="KEY">
                                                                          <block type="text">
                                                                            <field name="TEXT">owner</field>
                                                                          </block>
                                                                        </value>
                                                                      </block>
                                                                    </value>
                                                                  </block>
                                                                </next>
                                                              </block>
                                                            </next>
                                                          </block>
                                                        </next>
                                                      </block>
                                                    </next>
                                                  </block>
                                                </statement>
                                              </block>
                                            </next>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
      `,
      title: "Semi-Automatic Bid on xrp.cafe",
      description: "This template ensures a thorough understanding of how to interact with the XRPL for creating and managing a semi-automatic bidding system for NFTs, providing a hands-on approach to handling NFT transactions on the XRPL.",
      categories: ["template","xrpl","xaman","form"]
    },
    {
      height: 1626,
      block: `
  <block type="variables_set" x="0" y="0">
    <field name="VAR">currencyCode</field>
    <value name="VALUE">
      <block type="text">
        <field name="TEXT">TST</field>
      </block>
    </value>
    <next>
      <block type="variables_set">
        <field name="VAR">totalSupply</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">100000</field>
          </block>
        </value>
        <next>
          <block type="xrpl_create_account_and_request_faucet">
            <field name="FAUCET_INFO">issuerInfo</field>
            <value name="WEBSOCKET_ENDPOINT">
              <block type="xrpl_select_websocket_endpoint">
                <field name="NETWORK_TYPE">xrpl</field>
                <field name="WEBSOCKET_ENDPOINT">wss://s.altnet.rippletest.net:51233</field>
              </block>
            </value>
            <value name="XRP_AMOUNT">
              <block type="math_number">
                <field name="NUM">1000</field>
              </block>
            </value>
            <next>
              <block type="variables_set">
                <field name="VAR">issuerAddress</field>
                <value name="VALUE">
                  <block type="json_get_value">
                    <value name="JSON">
                      <block type="variables_get">
                        <field name="VAR">issuerInfo</field>
                      </block>
                    </value>
                    <value name="KEY">
                      <block type="text">
                        <field name="TEXT">address</field>
                      </block>
                    </value>
                  </block>
                </value>
                <next>
                  <block type="variables_set">
                    <field name="VAR">token</field>
                    <value name="VALUE">
                      <block type="xrpl_define_token_data">
                        <value name="ISSUER_ADDRESS">
                          <block type="variables_get">
                            <field name="VAR">issuerAddress</field>
                          </block>
                        </value>
                        <value name="CURRECY_CODE">
                          <block type="variables_get">
                            <field name="VAR">currencyCode</field>
                          </block>
                        </value>
                        <value name="TOTAL_SUPPLY">
                          <block type="variables_get">
                            <field name="VAR">totalSupply</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <next>
                      <block type="text_print">
                        <value name="TEXT">
                          <block type="json_to_text">
                            <value name="JSON">
                              <block type="variables_get">
                                <field name="VAR">token</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <next>
                          <block type="xrpl_client_initialize">
                            <field name="XRPL_CLIENT">xrplClient</field>
                            <value name="WEBSOCKET_ENDPOINT">
                              <block type="xrpl_select_websocket_endpoint">
                                <field name="NETWORK_TYPE">xrpl</field>
                                <field name="WEBSOCKET_ENDPOINT">wss://s.altnet.rippletest.net:51233</field>
                              </block>
                            </value>
                            <next>
                              <block type="xrpl_load_wallet">
                                <field name="WALLET_ID">issuerWallet</field>
                                <value name="WALLET_SEED">
                                  <block type="json_get_value">
                                    <value name="JSON">
                                      <block type="variables_get">
                                        <field name="VAR">issuerInfo</field>
                                      </block>
                                    </value>
                                    <value name="KEY">
                                      <block type="text">
                                        <field name="TEXT">secret</field>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                                <next>
                                  <block type="xrpl_submit_transaction">
                                    <field name="SUBMIT_RESULT">submitResult</field>
                                    <value name="XRPL_CLIENT">
                                      <block type="variables_get">
                                        <field name="VAR">xrplClient</field>
                                      </block>
                                    </value>
                                    <value name="WALLET_ID">
                                      <block type="variables_get">
                                        <field name="VAR">issuerWallet</field>
                                      </block>
                                    </value>
                                    <value name="TRANSACTION_PAYLOAD">
                                      <block type="xrpl_payload_rippling_config">
                                        <field name="RIPPLING">ENABLE</field>
                                        <value name="ACCOUNT_ADDRESS">
                                          <block type="variables_get">
                                            <field name="VAR">issuerAddress</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="xrpl_create_account_and_request_faucet">
                                        <field name="FAUCET_INFO">faucetInfo</field>
                                        <value name="WEBSOCKET_ENDPOINT">
                                          <block type="xrpl_select_websocket_endpoint">
                                            <field name="NETWORK_TYPE">xrpl</field>
                                            <field name="WEBSOCKET_ENDPOINT">wss://s.altnet.rippletest.net:51233</field>
                                          </block>
                                        </value>
                                        <value name="XRP_AMOUNT">
                                          <block type="math_number">
                                            <field name="NUM">100</field>
                                          </block>
                                        </value>
                                        <next>
                                          <block type="variables_set">
                                            <field name="VAR">userAddress</field>
                                            <value name="VALUE">
                                              <block type="json_get_value">
                                                <value name="JSON">
                                                  <block type="variables_get">
                                                    <field name="VAR">faucetInfo</field>
                                                  </block>
                                                </value>
                                                <value name="KEY">
                                                  <block type="text">
                                                    <field name="TEXT">address</field>
                                                  </block>
                                                </value>
                                              </block>
                                            </value>
                                            <next>
                                              <block type="xrpl_load_wallet">
                                                <field name="WALLET_ID">userWallet</field>
                                                <value name="WALLET_SEED">
                                                  <block type="json_get_value">
                                                    <value name="JSON">
                                                      <block type="variables_get">
                                                        <field name="VAR">faucetInfo</field>
                                                      </block>
                                                    </value>
                                                    <value name="KEY">
                                                      <block type="text">
                                                        <field name="TEXT">secret</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <next>
                                                  <block type="xrpl_submit_transaction">
                                                    <field name="SUBMIT_RESULT">submitResult</field>
                                                    <value name="XRPL_CLIENT">
                                                      <block type="variables_get">
                                                        <field name="VAR">xrplClient</field>
                                                      </block>
                                                    </value>
                                                    <value name="WALLET_ID">
                                                      <block type="variables_get">
                                                        <field name="VAR">userWallet</field>
                                                      </block>
                                                    </value>
                                                    <value name="TRANSACTION_PAYLOAD">
                                                      <block type="xrpl_payload_trustline_config">
                                                        <value name="CURRECY_CODE_AND_ISSUER_AND_SUPPLY">
                                                          <block type="variables_get">
                                                            <field name="VAR">token</field>
                                                          </block>
                                                        </value>
                                                        <value name="ACCOUNT_ADDRESS">
                                                          <block type="variables_get">
                                                            <field name="VAR">userAddress</field>
                                                          </block>
                                                        </value>
                                                      </block>
                                                    </value>
                                                    <next>
                                                      <block type="xrpl_submit_transaction">
                                                        <field name="SUBMIT_RESULT">submitResult</field>
                                                        <value name="XRPL_CLIENT">
                                                          <block type="variables_get">
                                                            <field name="VAR">xrplClient</field>
                                                          </block>
                                                        </value>
                                                        <value name="WALLET_ID">
                                                          <block type="variables_get">
                                                            <field name="VAR">userWallet</field>
                                                          </block>
                                                        </value>
                                                        <value name="TRANSACTION_PAYLOAD">
                                                          <block type="xrpl_payload_token_buy_offer">
                                                            <value name="ACCOUNT_ADDRESS">
                                                              <block type="variables_get">
                                                                <field name="VAR">userAddress</field>
                                                              </block>
                                                            </value>
                                                            <value name="TOKEN">
                                                              <block type="variables_get">
                                                                <field name="VAR">token</field>
                                                              </block>
                                                            </value>
                                                            <value name="TOKEN_AMOUNT">
                                                              <block type="math_number">
                                                                <field name="NUM">1</field>
                                                              </block>
                                                            </value>
                                                            <value name="XRP_DROPS_AMOUNT">
                                                              <block type="math_number">
                                                                <field name="NUM">10</field>
                                                              </block>
                                                            </value>
                                                          </block>
                                                        </value>
                                                        <next>
                                                          <block type="xrpl_submit_transaction">
                                                            <field name="SUBMIT_RESULT">submitResult</field>
                                                            <value name="XRPL_CLIENT">
                                                              <block type="variables_get">
                                                                <field name="VAR">xrplClient</field>
                                                              </block>
                                                            </value>
                                                            <value name="WALLET_ID">
                                                              <block type="variables_get">
                                                                <field name="VAR">issuerWallet</field>
                                                              </block>
                                                            </value>
                                                            <value name="TRANSACTION_PAYLOAD">
                                                              <block type="xrpl_payload_token_sell_offer">
                                                                <value name="ACCOUNT_ADDRESS">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">issuerAddress</field>
                                                                  </block>
                                                                </value>
                                                                <value name="TOKEN">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">token</field>
                                                                  </block>
                                                                </value>
                                                                <value name="TOKEN_AMOUNT">
                                                                  <block type="math_number">
                                                                    <field name="NUM">1</field>
                                                                  </block>
                                                                </value>
                                                                <value name="XRP_DROPS_AMOUNT">
                                                                  <block type="math_number">
                                                                    <field name="NUM">10</field>
                                                                  </block>
                                                                </value>
                                                              </block>
                                                            </value>
                                                            <next>
                                                              <block type="xrpl_command_account_lines">
                                                                <field name="IS_ERROR">isError</field>
                                                                <field name="ACCOUNT_LINES">accountLines</field>
                                                                <value name="XRPL_CLIENT">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">xrplClient</field>
                                                                  </block>
                                                                </value>
                                                                <value name="ACCOUNT_ADDRESS">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">userAddress</field>
                                                                  </block>
                                                                </value>
                                                                <next>
                                                                  <block type="dynamic_if">
                                                                    <mutation else="1"></mutation>
                                                                    <value name="IF0">
                                                                      <block type="logic_compare">
                                                                        <field name="OP">EQ</field>
                                                                        <value name="A">
                                                                          <block type="variables_get">
                                                                            <field name="VAR">isError</field>
                                                                          </block>
                                                                        </value>
                                                                        <value name="B">
                                                                          <block type="logic_false"></block>
                                                                        </value>
                                                                      </block>
                                                                    </value>
                                                                    <statement name="DO0">
                                                                      <block type="text_print">
                                                                        <value name="TEXT">
                                                                          <block type="json_to_text">
                                                                            <value name="JSON">
                                                                              <block type="variables_get">
                                                                                <field name="VAR">accountLines</field>
                                                                              </block>
                                                                            </value>
                                                                          </block>
                                                                        </value>
                                                                        <next>
                                                                          <block type="text_print">
                                                                            <value name="TEXT">
                                                                              <block type="text">
                                                                                <field name="TEXT">Complete!</field>
                                                                              </block>
                                                                            </value>
                                                                          </block>
                                                                        </next>
                                                                      </block>
                                                                    </statement>
                                                                    <statement name="ELSE">
                                                                      <block type="text_print">
                                                                        <value name="TEXT">
                                                                          <block type="text">
                                                                            <field name="TEXT">Failed to get account lines.</field>
                                                                          </block>
                                                                        </value>
                                                                      </block>
                                                                    </statement>
                                                                  </block>
                                                                </next>
                                                              </block>
                                                            </next>
                                                          </block>
                                                        </next>
                                                      </block>
                                                    </next>
                                                  </block>
                                                </next>
                                              </block>
                                            </next>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
      `,
      title: "XRPL Token Generation and Transaction Flow",
      description: "This template guides you through the entire process of creating and managing a token on the XRPL (XRP Ledger). It includes steps to create a token, initialize the XRPL client, request testnet funds, set up wallets, and execute transactions such as trust set and token offers. This comprehensive flow ensures you understand how to interact with the XRPL for token management and transactions.",
      categories: ["template","xrpl"]
    },
    {
      height: 736,
      block: `
  <block type="xrpl_client_initialize" x="0" y="0">
    <field name="XRPL_CLIENT">xrplClient</field>
    <value name="WEBSOCKET_ENDPOINT">
      <block type="xrpl_select_websocket_endpoint">
        <field name="NETWORK_TYPE">xrpl</field>
        <field name="WEBSOCKET_ENDPOINT">wss://xrplcluster.com</field>
      </block>
    </value>
    <next>
      <block type="variables_set">
        <field name="VAR">targetTxnHash</field>
        <value name="VALUE">
          <block type="text">
            <field name="TEXT">5CB55A3927BEF28E714A59F7CDC2C33D211B78DB015B819E8DADD02C032EA7EE</field>
          </block>
        </value>
        <next>
          <block type="xrpl_command_tx">
            <field name="IS_ERROR">isError</field>
            <field name="TRANSACTION">transaction</field>
            <value name="XRPL_CLIENT">
              <block type="variables_get">
                <field name="VAR">xrplClient</field>
              </block>
            </value>
            <value name="TRANSACTION_HASH">
              <block type="variables_get">
                <field name="VAR">targetTxnHash</field>
              </block>
            </value>
            <next>
              <block type="dynamic_if">
                <value name="IF0">
                  <block type="logic_compare">
                    <field name="OP">EQ</field>
                    <value name="A">
                      <block type="variables_get">
                        <field name="VAR">isError</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="logic_false"></block>
                    </value>
                  </block>
                </value>
                <statement name="DO0">
                  <block type="xrpl_extract_transaction_details">
                    <field name="TRANSACTION_TYPE">transactionType</field>
                    <field name="ACCOUNT_ADDRESS">account</field>
                    <field name="LEDGER_INDEX">ledgerIndex</field>
                    <field name="TRANSACTION_HASH">transactionHash</field>
                    <field name="TRANSACTION_DATE">date</field>
                    <value name="TRANSACTION_JSON">
                      <block type="variables_get">
                        <field name="VAR">transaction</field>
                      </block>
                    </value>
                    <next>
                      <block type="dynamic_if">
                        <value name="IF0">
                          <block type="logic_compare">
                            <field name="OP">EQ</field>
                            <value name="A">
                              <block type="variables_get">
                                <field name="VAR">transactionType</field>
                              </block>
                            </value>
                            <value name="B">
                              <block type="xrpl_transaction_type">
                                <field name="TRANSACTION_TYPE">OfferCreate</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <statement name="DO0">
                          <block type="xrpl_extract_offer_create_details">
                            <field name="EXTRACTED_DATA">extractedData</field>
                            <value name="TRANSACTION_JSON">
                              <block type="variables_get">
                                <field name="VAR">transaction</field>
                              </block>
                            </value>
                            <value name="ACCOUNT_ADDRESS">
                              <block type="variables_get">
                                <field name="VAR">account</field>
                              </block>
                            </value>
                            <next>
                              <block type="text_print">
                                <value name="TEXT">
                                  <block type="json_to_text">
                                    <value name="JSON">
                                      <block type="variables_get">
                                        <field name="VAR">extractedData</field>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                                <next>
                                  <block type="text_print">
                                    <value name="TEXT">
                                      <block type="text">
                                        <field name="TEXT">-----------------------------------</field>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="text_print">
                                        <value name="TEXT">
                                          <block type="dynamic_text_join">
                                            <mutation items="2"></mutation>
                                            <value name="ADD0">
                                              <block type="text">
                                                <field name="TEXT">Pay offer : </field>
                                              </block>
                                            </value>
                                            <value name="ADD1">
                                              <block type="json_get_value">
                                                <value name="JSON">
                                                  <block type="json_get_value">
                                                    <value name="JSON">
                                                      <block type="variables_get">
                                                        <field name="VAR">extractedData</field>
                                                      </block>
                                                    </value>
                                                    <value name="KEY">
                                                      <block type="text">
                                                        <field name="TEXT">AmountPayOffer</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <value name="KEY">
                                                  <block type="text">
                                                    <field name="TEXT">value</field>
                                                  </block>
                                                </value>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                        <next>
                                          <block type="text_print">
                                            <value name="TEXT">
                                              <block type="dynamic_text_join">
                                                <mutation items="2"></mutation>
                                                <value name="ADD0">
                                                  <block type="text">
                                                    <field name="TEXT">Payed : </field>
                                                  </block>
                                                </value>
                                                <value name="ADD1">
                                                  <block type="json_get_value">
                                                    <value name="JSON">
                                                      <block type="json_get_value">
                                                        <value name="JSON">
                                                          <block type="variables_get">
                                                            <field name="VAR">extractedData</field>
                                                          </block>
                                                        </value>
                                                        <value name="KEY">
                                                          <block type="text">
                                                            <field name="TEXT">AmountPaid</field>
                                                          </block>
                                                        </value>
                                                      </block>
                                                    </value>
                                                    <value name="KEY">
                                                      <block type="text">
                                                        <field name="TEXT">value</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                              </block>
                                            </value>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </statement>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
      `,
      title: "Analyze Offer Create Transaction",
      description: "A template for initializing an XRPL client, retrieving a transaction by hash, extracting transaction details, and analyzing offer create transactions. This block sequence demonstrates connecting to the XRPL network, fetching transaction data, and parsing specific transaction types for detailed analysis or further actions.",
      categories: ["template","xrpl"]
    },
    {
      height: 750,
      block:`
  <block type="variables_set" x="0" y="0">
    <field name="VAR">exchanges</field>
    <value name="VALUE">
      <block type="dynamic_list_create">
        <mutation items="9"></mutation>
        <value name="ADD0">
          <block type="xrpl_exchange_address">
            <field name="ADDRESS">rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh</field>
          </block>
        </value>
        <value name="ADD1">
          <block type="xrpl_exchange_address">
            <field name="ADDRESS">rLbKbPyuvs4wc1h13BEPHgbFGsRXMeFGL6</field>
          </block>
        </value>
        <value name="ADD2">
          <block type="xrpl_exchange_address">
            <field name="ADDRESS">raLPjTYeGezfdb6crXZzcC8RkLBEwbBHJ5</field>
          </block>
        </value>
        <value name="ADD3">
          <block type="xrpl_exchange_address">
            <field name="ADDRESS">rhUYLd2aUiUVYkBZYwTc5RYgCAbNHAwkeZ</field>
          </block>
        </value>
        <value name="ADD4">
          <block type="xrpl_exchange_address">
            <field name="ADDRESS">rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w</field>
          </block>
        </value>
        <value name="ADD5">
          <block type="xrpl_exchange_address">
            <field name="ADDRESS">rNQEMJA4PsoSrZRn9J6RajAYhcDzzhf8ok</field>
          </block>
        </value>
        <value name="ADD6">
          <block type="xrpl_exchange_address">
            <field name="ADDRESS">rGDreBvnHrX1get7na3J4oowN19ny4GzFn</field>
          </block>
        </value>
        <value name="ADD7">
          <block type="xrpl_exchange_address">
            <field name="ADDRESS">rUzWJkXyEtT8ekSSxkBYPqCvHpngcy6Fks</field>
          </block>
        </value>
        <value name="ADD8">
          <block type="xrpl_exchange_address">
            <field name="ADDRESS">rBg33rYWkR9G2jDKZKmCsGd1wZrGoL83Lb</field>
          </block>
        </value>
      </block>
    </value>
    <next>
      <block type="xrpl_client_initialize">
        <field name="XRPL_CLIENT">xrplClient</field>
        <value name="WEBSOCKET_ENDPOINT">
          <block type="xrpl_select_websocket_endpoint">
            <field name="NETWORK_TYPE">xrpl</field>
            <field name="WEBSOCKET_ENDPOINT">wss://xrplcluster.com</field>
          </block>
        </value>
        <next>
          <block type="xrpl_command_subscribe_account_txn">
            <field name="TRANSACTION_INFO">transactionInfo</field>
            <value name="XRPL_CLIENT">
              <block type="variables_get">
                <field name="VAR">xrplClient</field>
              </block>
            </value>
            <value name="SUBSCRIBE_ID">
              <block type="text">
                <field name="TEXT">subscribe1</field>
              </block>
            </value>
            <value name="ACCOUNTS">
              <block type="variables_get">
                <field name="VAR">exchanges</field>
              </block>
            </value>
            <next>
              <block type="controls_whileUntil">
                <field name="MODE">WHILE</field>
                <value name="BOOL">
                  <block type="logic_compare">
                    <field name="OP">EQ</field>
                    <value name="A">
                      <block type="variables_get">
                        <field name="VAR">transactionInfo</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="logic_undefined"></block>
                    </value>
                  </block>
                </value>
                <statement name="DO">
                  <block type="text_print">
                    <value name="TEXT">
                      <block type="text">
                        <field name="TEXT">polling...</field>
                      </block>
                    </value>
                    <next>
                      <block type="controls_wait_seconds">
                        <value name="SECONDS">
                          <block type="math_number">
                            <field name="NUM">5</field>
                          </block>
                        </value>
                      </block>
                    </next>
                  </block>
                </statement>
                <next>
                  <block type="text_print">
                    <value name="TEXT">
                      <block type="text">
                        <field name="TEXT">---------------------------</field>
                      </block>
                    </value>
                    <next>
                      <block type="text_print">
                        <value name="TEXT">
                          <block type="json_to_text">
                            <value name="JSON">
                              <block type="variables_get">
                                <field name="VAR">transactionInfo</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <next>
                          <block type="text_print">
                            <value name="TEXT">
                              <block type="text">
                                <field name="TEXT">---------------------------</field>
                              </block>
                            </value>
                            <next>
                              <block type="xrpl_command_unsubscribe_account_txn">
                                <value name="XRPL_CLIENT">
                                  <block type="variables_get">
                                    <field name="VAR">xrplClient</field>
                                  </block>
                                </value>
                                <value name="SUBSCRIBE_ID">
                                  <block type="text">
                                    <field name="TEXT">subscribe1</field>
                                  </block>
                                </value>
                                <value name="ACCOUNTS">
                                  <block type="variables_get">
                                    <field name="VAR">exchanges</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="text_print">
                                    <value name="TEXT">
                                      <block type="text">
                                        <field name="TEXT">Complete!</field>
                                      </block>
                                    </value>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
      `,
      title: "Monitor and Process XRPL Transactions for Multiple Exchange Addresses",
      description: "This block sequence initializes a connection to the XRPL (XRP Ledger) and monitors transactions for a list of exchange addresses. It sets up a list of predefined exchange addresses and establishes a client connection to the XRPL. The program subscribes to account transactions for the specified addresses and continuously checks for incoming transactions. While waiting, it prints \"polling...\" every 5 seconds. Once a transaction is detected, it prints the transaction details and unsubscribes from the transaction stream, indicating completion. This process helps in tracking and processing transactions related to multiple exchange addresses in real-time.",
      categories: ["template","xrpl"]
    },
  ],
  xaman: [
    {
      height: 80,
      block: `
        <block type="xaman_login" x="0" y="0"></block>
      `,
      title: "Xaman Simple Login",
      description: "Perform a simple login to the Xaman system.",
      blockType: "xaman_login",
      categories: ["xaman"]
    },
    {
      height: 50,
      block: `
        <block type="xaman_logout" x="0" y="0"></block>
      `,
      title: "Xaman Simple Logout",
      description: "Perform a simple logout from the Xaman system.",
      blockType: "xaman_logout",
      categories: ["xaman"]
    },
    {
      height: 200,
      block: `
        <block type="xaman_request_payment_signature" x="0" y="0"></block>
      `,
      title: "Xaman Payment",
      description: "Process a payment using the Xaman system.",
      blockType: "xaman_request_payment_signature",
      categories: ["xaman"]
    },
    {
      height: 74.5,
      block: `
        <block type="xaman_request_transaction_signature" x="0" y="0"></block>
      `,
      title: "Xaman Payload",
      description: "Set a new payload for the Xaman XRPL wallet integration.This block allows you to create a new Xaman transaction payload, which can then be used to initiate a transaction on the XRP Ledger. The 'Payload' input should be a JSON object representing the transaction details, such as the recipient, amount, and other metadata.When the block is executed, it will attempt to create the new payload using the Xaman SDK. If successful, the block will output the status ('success') and the unique identifier (UUID) of the created payload. This payload ID can be used to further interact with the Xaman wallet integration, such as signing and submitting the transaction. Note: This block requires the user to be logged in to the Xaman wallet in order to create a new payload. If the user is not logged in, the block will output an error status.",
      categories: ["xaman"],
      blockType: "xaman_request_transaction_signature",
    },
    {
        height: 80,
        block: `
          <block type="xaman_wait_for_signature" x="0" y="0"></block>
        `,
        title: "Xaman Wait for Signature",
        description: "Wait for a signature in the Xaman system.",
        categories: ["xaman"],
        blockType: "xaman_wait_for_signature",
    },
    {
      height: 23.5,
      block: `
        <block type="xaman_variable_name" x="0" y="0"></block>
      `,
      title: "Xaman Store Key",
      description: "Input a name for Xaman Variable (at least 3 characters, a-z0-9). This name is used for storing and retrieving data.",
      categories: ["xaman"],
      blockType: "xaman_variable_name",
    },
    {
      height: 98.5,
      block: `
        <block type="xaman_variable_set" x="0" y="0"></block>
      `,
      title: "Xaman Set Variable",
      description: "Save user data in Xaman with the specified name. The data is saved as a text.",
      categories: ["xaman"],
      blockType: "xaman_variable_set",
    },
    {
      height: 47.5,
      block: `
        <block type="xaman_variable_get" x="0" y="0"></block>
      `,
      title: "Xaman Get Variable",
      description: "Retrieve user data from Xaman with the specified name. The data is returned as a text.",
      categories: ["xaman"],
      blockType: "xaman_variable_get",
    },
    {
      height: 194,
      block: `
  <block type="xaman_login" x="0" y="0">
    <field name="USER_INFO">userInfo</field>
    <next>
      <block type="xaman_variable_set">
        <field name="IS_ERROR">isError</field>
        <value name="KEY">
          <block type="xaman_variable_name">
            <field name="KEY">name1</field>
          </block>
        </value>
        <value name="DATA">
          <block type="text">
            <field name="TEXT">Value1</field>
          </block>
        </value>
        <next>
          <block type="text_print">
            <value name="TEXT">
              <block type="xaman_variable_get">
                <value name="KEY">
                  <block type="xaman_variable_name">
                    <field name="KEY">name1</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
      `,
      title: "Xaman Variable Handling Template",
      description: "This template demonstrates how to handle variables in Xaman. It includes logging in, setting a variable, and then retrieving and printing the variable value.",
      categories: ["template","xaman"]
    },
    {
      height: 447,
      block:`
  <block type="xrpl_create_account_and_request_faucet" x="0" y="0">
    <field name="FAUCET_INFO">faucetInfo</field>
    <value name="WEBSOCKET_ENDPOINT">
      <block type="xrpl_select_websocket_endpoint">
        <field name="NETWORK_TYPE">xrpl</field>
        <field name="WEBSOCKET_ENDPOINT">wss://s.altnet.rippletest.net:51233</field>
      </block>
    </value>
    <value name="XRP_AMOUNT">
      <block type="math_number">
        <field name="NUM">100</field>
      </block>
    </value>
    <next>
      <block type="text_print">
        <value name="TEXT">
          <block type="json_to_text">
            <value name="JSON">
              <block type="variables_get">
                <field name="VAR">faucetInfo</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="xaman_login">
            <field name="USER_INFO">userInfo</field>
            <next>
              <block type="xaman_request_payment_signature">
                <field name="PAYLOAD_ID">payloadID</field>
                <field name="IS_ERROR">isError</field>
                <value name="DESTINATION_ADDRESS">
                  <block type="json_get_value">
                    <value name="JSON">
                      <block type="variables_get">
                        <field name="VAR">faucetInfo</field>
                      </block>
                    </value>
                    <value name="KEY">
                      <block type="text">
                        <field name="TEXT">address</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="XRP_DROPS_AMOUNT">
                  <block type="xrpl_xrp_to_drops">
                    <value name="AMOUNT">
                      <block type="math_number">
                        <field name="NUM">0.1</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="MEMO">
                  <block type="text">
                    <field name="TEXT">null pay</field>
                  </block>
                </value>
                <next>
                  <block type="xaman_wait_for_signature">
                    <value name="PAYLOAD_ID">
                      <block type="variables_get">
                        <field name="VAR">payloadID</field>
                      </block>
                    </value>
                    <next>
                      <block type="xaman_logout"></block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
      `,
      title: "XRPL Account and Payment Example with Xaman",
      description: "Create a new XRPL account, login with Xaman, and send a payment using the selected network.",
      categories: ["template","xaman"]
    }
  ],
  text: [
    {
        height: 50,
        block: `
          <block type="text" x="0" y="0"></block>
        `,
        title: "Text",
        description: "Define a text string.",
        categories: ["text"],
        blockType: "text",
    },
    {
      height: 50,
      block: `
        <block type="text_print" x="0" y="0"></block>
      `,
      title: "Print Text",
      description: "Print text to the console.",
      categories: ["text"],
      blockType: "text_print",
    },
    {
      height: 50,
      block: `
        <block type="text_util_inspect_print" x="0" y="0"></block>
      `,
      title: "Inspect and Print",
      description: "Inspect an object and print its structure to the console.",
      categories: ["text"],
      blockType: "text_util_inspect_print",
    },
    {
      height: 118,
      block: `
        <block type="message_modal_block" x="0" y="0"></block>
      `,
      title: "Display a Message Box",
      description: "Display a customizable message box. Choose from three styles: Normal, Celebrate, or Console. Option to wait for the user to close the message before continuing.",
      categories: ["text"],
      blockType: "message_modal_block",
    },
    {
      height: 70,
      block: `
        <block type="dynamic_text_join" x="0" y="0"></block>
      `,
      title: "Join Text",
      description: "Join multiple text strings together.",
      categories: ["text"],
      blockType: "dynamic_text_join",
    },
    {
      height: 50,
      block: `
        <block type="text_length" x="0" y="0"></block>
      `,
      title: "Text Length",
      description: "Get the length of a text string.",
      categories: ["text"],
      blockType: "text_length",
    },
    {
      height: 50,
      block: `
        <block type="text_isEmpty" x="0" y="0"></block>
      `,
      title: "Text Is Empty",
      description: "Check if a text string is empty.",
      categories: ["text"],
      blockType: "text_isEmpty",
    },
    {
      height: 50,
      block: `
        <block type="number_to_text" x="0" y="0"></block>
      `,
      title: "Number to Text",
      description: "Convert a number to a text string.",
      categories: ["text"],
      blockType: "number_to_text",
    },
    {
      height: 50,
      block: `
        <block type="text_to_number" x="0" y="0"></block>
      `,
      title: "Text to Number",
      description: "Convert a text string to a number.",
      categories: ["text"],
      blockType: "text_to_number",
    },
    {
      height: 50,
      block: `
        <block type="text_starts_with" x="0" y="0"></block>
      `,
      title: "Starts With",
      description: "Checks if a text string starts with a specified prefix.",
      categories: ["text"],
      blockType: "text_starts_with",
    },
    {
      height: 50,
      block: `
        <block type="text_ends_with" x="0" y="0"></block>
      `,
      title: "Ends With",
      description: "Checks if a text string ends with a specified suffix.",
      categories: ["text"],
      blockType: "text_ends_with",
    },
    {
      height: 50,
      block: `
        <block type="text_contains" x="0" y="0"></block>
      `,
      title: "Contains",
      description: "Checks if a text string contains a specified substring.",
      categories: ["text"],
      blockType: "text_contains",
    },
    {
      height: 50,
      block: `
        <block type="text_to_uppercase" x="0" y="0"></block>
      `,
      title: "Upper Case",
      description: "Converts all the characters in a text string to uppercase.",
      categories: ["text"],
      blockType: "text_to_uppercase",
    },
    {
      height: 50,
      block: `
        <block type="text_to_lowercase" x="0" y="0"></block>
      `,
      title: "Lower Case",
      description: "Converts all the characters in a text string to lowercase.",
      categories: ["text"],
      blockType: "text_to_lowercase",
    },
    {
      height: 23.5,
      block: `
        <block type="text_onetime_block" x="0" y="0"></block>
      `,
      title: "Private Block",
      description: "Enter a one-time use string. The string will not be saved.",
      categories: ["text"],
      blockType: "text_onetime_block",
    },
    {
      height: 36.5,
      block: `
        <block type="code_multi_line_comment" x="0" y="0"></block>
      `,
      title: "Comment Out",
      description: "",
      categories: ["text"],
      blockType: "code_multi_line_comment",
    }
  ],
  math: [
    {
      height: 50,
      block: `
        <block type="math_number" x="0" y="0"></block>
      `,
      title: "Number",
      description: "This block represents a numerical value. It allows users to input any number, including integers and decimals. It's a fundamental block used in various mathematical operations and can be connected to other blocks that require numerical inputs.",
      categories: ["math"],
      blockType: "math_number",
    },
    {
      height: 50,
      block: `
        <block type="math_arithmetic" x="0" y="0"></block>
      `,
      title: "Arithmetic",
      description: "This block performs basic arithmetic operations. It includes addition, subtraction, multiplication, division, and exponentiation. Users can select the desired operation from a dropdown menu and input two numbers to perform the calculation. It's essential for creating mathematical expressions in your programs.",
      categories: ["math"],
      blockType: "math_arithmetic",
    },
    {
      height: 50,
      block: `
        <block type="math_percentage" x="0" y="0"></block>
      `,
      title: "Percentage",
      description: "Calculate a percentage.",
      categories: ["math"],
      blockType: "math_percentage",
    },
    {
      "height": 54,
      "block": `
        <block type="math_single" x="0" y="0"></block>
      `,
      title: "Math Operations",
      description: "This block provides various single-input mathematical operations. It includes functions like square root, absolute value, negation, natural logarithm, logarithm base 10, exponential function, and base 10 exponent. These operations are useful for more advanced mathematical calculations.",
      categories: ["math"],
      blockType: "math_single",
    },
    {
      "height": 54,
      "block": `
        <block type="math_trig" x="0" y="0"></block>
      `,
      title: "Trigonometry",
      description: "This block performs trigonometric functions. It includes sine, cosine, tangent, arcsine, arccosine, and arctangent. These functions are crucial for calculations involving angles and are often used in geometry, physics, and engineering applications.",
      categories: ["math"],
      blockType: "math_trig",
    },
    {
      "height": 54,
      "block": `
        <block type="math_constant" x="0" y="0"></block>
      `,
      title: "Constants",
      description: "This block provides access to common mathematical constants. It typically includes π (pi), e (Euler's number), φ (golden ratio), sqrt(2), sqrt(½), and infinity. These constants are useful in various mathematical and scientific calculations.",
      categories: ["math"],
      blockType: "math_constant",
    },
    {
      "height": 54,
      "block": `
        <block type="math_number_property" x="0" y="0"></block>
      `,
      title: "Number Properties",
      description: "This block checks various properties of a number. It can determine if a number is even, odd, prime, whole, positive, negative, or divisible by another number. It returns a boolean value (true or false) based on the selected property check.",
      categories: ["math"],
      blockType: "math_number_property",
    },
    {
      "height": 54,
      "block": `
        <block type="math_round" x="0" y="0"></block>
      `,
      title: "Round",
      description: "This block rounds numbers. It offers options to round up (ceiling), round down (floor), or round to the nearest integer. This block is useful when you need to work with whole numbers or when you want to limit the precision of decimal numbers.",
      categories: ["math"],
      blockType: "math_round",
    },
    {
      "height": 54,
      "block": `
        <block type="math_on_list" x="0" y="0"></block>
      `,
      title: "List Operations",
      description: "This block performs mathematical operations on lists of numbers. It can calculate the sum, minimum, maximum, average, median, mode, standard deviation, or random item from a list. This block is particularly useful when working with datasets or multiple values.",
      categories: ["math"],
      blockType: "math_on_list",
    },
    {
      "height": 54,
      "block": `
        <block type="math_modulo" x="0" y="0"></block>
      `,
      title: "Modulo",
      description: "This block calculates the remainder of a division operation. It takes two inputs: the dividend and the divisor. The block returns the remainder after division. Modulo is often used in programming for tasks like determining if a number is even or odd, or for creating cyclic patterns.",
      categories: ["math"],
      blockType: "math_modulo",
    },
    {
      "height": 54,
      "block": `
        <block type="math_constrain" x="0" y="0"></block>
      `,
      title: "Constrain",
      description: "This block constrains a number to fall within a specified range. It takes three inputs: the number to constrain, the lower limit, and the upper limit. If the number is outside the range, it's set to the nearest limit. This is useful for ensuring values stay within acceptable bounds.",
      categories: ["math"],
      blockType: "math_constrain",
    },
    {
      "height": 54,
      "block": `
        <block type="math_random_int" x="0" y="0"></block>
      `,
      title: "Random Integer",
      description: "This block generates a random integer within a specified range. Users input the minimum and maximum values, and the block returns a random integer inclusive of both limits. This is useful for creating games, simulations, or any application requiring randomness.",
      categories: ["math"],
      blockType: "math_random_int",
    },
    {
      "height": 54,
      "block": `
        <block type="math_random_float" x="0" y="0"></block>
      `,
      title: "Random Fraction",
      description: "This block generates a random fraction between 0 and 1. It returns a float value greater than or equal to 0 and strictly less than 1. This block is useful when you need a random decimal number, often for probability calculations or generating random percentages.",
      categories: ["math"],
      blockType: "math_random_float",
    },
    {
      "height": 54,
      "block": `
        <block type="math_atan2" x="0" y="0"></block>
      `,
      title: "Arctangent 2",
      description: "This block calculates the arctangent of y/x, using the signs of both arguments to determine the quadrant of the result. It's particularly useful in robotics and game development for calculating angles between points. The block takes two inputs (y and x) and returns the angle in radians.",
      categories: ["math"],
      blockType: "math_atan2",
    }
  ],
  supabase: [
    {
      height: 98.5,
      block: `
        <block type="supabase_create_client" x="0" y="0"></block>
      `,
      title: "Initialize Supabase Client",
      description: "This block initializes a Supabase client using the provided URL and Anon key. The client is used to interact with the Supabase backend services. Ensure to save the client instance to a variable for further operations.",
      categories: ["supabase"],
      blockType: "supabase_create_client",
    },
    {
      height: 194.5,
      block: `
        <block type="supabase_select" x="0" y="0"></block>
      `,
      title: "Supabase Select",
      description: "This block performs a SELECT query on the specified Supabase table. You can specify the columns to retrieve, apply various conditions for filtering the results, and output the selected data to a variable. It supports conditions like equal to, greater than, less than, and more.",
      categories: ["supabase"],
      blockType: "supabase_select",
    },
    {
      height: 123,
      block: `
        <block type="supabase_insert" x="0" y="0"></block>
      `,
      title: "Supabase Insert",
      description: "This block inserts data into the specified Supabase table. The data must be provided in JSON format. Ensure the data matches the table schema to avoid errors. You can handle any errors by outputting them to a variable.",
      categories: ["supabase"],
      blockType: "supabase_insert",
    },
    {
      height: 194.5,
      block: `
        <block type="supabase_update" x="0" y="0"></block>
      `,
      title: "Supabase Update",
      description: "This block updates data in the specified Supabase table based on the given filter conditions. The data to update must be in JSON format. Various conditions like equal to, greater than, and less than can be applied to filter the rows that need to be updated.",
      categories: ["supabase"],
      blockType: "supabase_update",
    },
    {
      height: 170.5,
      block: `
        <block type="supabase_delete" x="0" y="0"></block>
      `,
      title: "Supabase Delete",
      description: "This block deletes data from the specified Supabase table based on the provided filter conditions. Conditions like equal to, greater than, and less than can be applied to specify which rows to delete. Errors during the delete operation can be captured in a variable.",
      categories: ["supabase"],
      blockType: "supabase_delete",
    },
    {
      height: 407,
      block: `
  <block type="supabase_create_client" x="0" y="0">
    <field name="SUPABASE_CLIENT">supabaseClient</field>
    <value name="SUPABASE_URL">
      <block type="text">
        <field name="TEXT">https://xxxxx.supabase.co</field>
      </block>
    </value>
    <value name="ANON_KEY">
      <block type="text">
        <field name="TEXT"></field>
      </block>
    </value>
    <next>
      <block type="supabase_insert">
        <field name="IS_ERROR">isError</field>
        <value name="SUPABASE_CLIENT">
          <block type="variables_get">
            <field name="VAR">supabaseClient</field>
          </block>
        </value>
        <value name="TABLE_NAME">
          <block type="text">
            <field name="TEXT">transactions</field>
          </block>
        </value>
        <value name="INSERT_RECORDS_JSON">
          <block type="text_to_json">
            <value name="TEXT">
              <block type="text">
                <field name="TEXT">[{"transaction":{"abc":1},"number":1,"text":"abcdefg"}]</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="supabase_select">
            <field name="FILTER_OPERATOR">gt</field>
            <field name="SELECTED_DATA">selectedData</field>
            <value name="SUPABASE_CLIENT">
              <block type="variables_get">
                <field name="VAR">supabaseClient</field>
              </block>
            </value>
            <value name="TABLE_NAME">
              <block type="text">
                <field name="TEXT">transactions</field>
              </block>
            </value>
            <value name="COLUMNS">
              <block type="text">
                <field name="TEXT">created_at,id,transaction,number,text</field>
              </block>
            </value>
            <value name="FILTER_COLUMN">
              <block type="text">
                <field name="TEXT">created_at</field>
              </block>
            </value>
            <value name="FILTER_VALUE">
              <block type="text">
                <field name="TEXT">2024-06-30 3:00:00</field>
              </block>
            </value>
            <next>
              <block type="text_print">
                <value name="TEXT">
                  <block type="json_to_text">
                    <value name="JSON">
                      <block type="variables_get">
                        <field name="VAR">selectedData</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
      `,
      title: "Supabase Insert Record",
      description: "This template demonstrates basic Supabase database operations. It includes initializing a client, inserting new records, and retrieving data based on specific conditions. Ideal for learning the fundamental flow of database interactions using Supabase.",
      categories: ["template","supabase"],
    },
  ],
  table: [
    {
      height: 25,
      block: `
        <block type="table_empty" x="0" y="0"></block>
      `,
      title: "Create Empty Table",
      description: "This block initializes an empty table. It can be used as a starting point for creating and manipulating tables in your project.",
      categories: ["table"],
      blockType: "table_empty",
    },
    {
        height: 25,
        block: `
          <block type="table_load_csv" x="0" y="0"></block>
        `,
      title: "Load CSV",
      description: "This block loads data from a CSV file into a table. Use this block to import CSV data for analysis and manipulation within your project.",
      categories: ["table"],
      blockType: "table_load_csv",
    },
    {
      height: 48,
      block: `
        <block type="csv_to_table" x="0" y="0"></block>
      `,
      title: "Convert CSV to Table",
      description: "This block converts a CSV formatted string into a table. It is useful for transforming raw CSV data into a structured table format for further processing.",
      categories: ["table"],
      blockType: "csv_to_table",
    },
    {
      height: 100,
      block: `
        <block type="table_get_row" x="0" y="0"></block>
      `,
      title: "Table Row",
      description: "This block retrieves a row from a specified table. Use it to access and manipulate individual rows of data within your table.",
      categories: ["table"],
      blockType: "table_get_row",
    },
    {
      height: 100,
      block: `
        <block type="table_get_column" x="0" y="0"></block>
      `,
      title: "Table Column",
      description: "This block retrieves a column from a specified table. Use it to access and manipulate individual columns of data within your table.",
      categories: ["table"],
      blockType: "table_get_column",
    },
    {
      height: 23.5,
      block: `
        <block type="table_row_count" x="0" y="0"></block>
      `,
      title: "Row Count of Table",
      description: "This block returns the number of rows in the specified table.",
      categories: ["table"],
      blockType: "table_row_count",
    },
    {
      height: 100,
      block: `
        <block type="table_add_row" x="0" y="0"></block>
      `,
      title: "Add Row to Table",
      description: "This block adds a new row to a specified table. Use it to append new data entries to your table.",
      categories: ["table"],
      blockType: "table_add_row",
    },
    {
      height: 75,
      block: `
        <block type="table_csv_save" x="0" y="0"></block>
      `,
      title: "Save Table to CSV",
      description: "This block saves a table to a CSV file. Use it to export your table data into a CSV file for external use or backup.",
      categories: ["table"],
      blockType: "table_csv_save",
    },
    /*
    {
      height: 74.5,
      block: `
        <block type="notion_create_client" x="0" y="0"></block>
      `,
      title: "Initialize Notion Client",
      description: "",
      categories: ["notion"]
    },
    {
      height: 146.5,
      block: `
        <block type="notion_create_database" x="0" y="0"></block>
      `,
      title: "Notion Create Database",
      description: "",
      categories: ["notion"]
    },
    {
      height: 146.5,
      block: `
        <block type="notion_add_record" x="0" y="0"></block>
      `,
      title: "Notion Add Record",
      description: "",
      categories: ["notion"]
    },
    */
    {
      height: 471,
      block: `
  <block type="variables_set" x="0" y="0">
    <field name="VAR">wallets</field>
    <value name="VALUE">
      <block type="table_empty"></block>
    </value>
    <next>
      <block type="variables_set">
        <field name="VAR">wallets</field>
        <value name="VALUE">
          <block type="table_add_row">
            <value name="TABLE">
              <block type="variables_get">
                <field name="VAR">wallets</field>
              </block>
            </value>
            <value name="ROW">
              <block type="dynamic_list_create">
                <mutation items="2"></mutation>
                <value name="ADD0">
                  <block type="text">
                    <field name="TEXT">address</field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="text">
                    <field name="TEXT">secret</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="run_speed_set">
            <field name="SPEED">1000</field>
            <next>
              <block type="controls_for">
                <field name="VAR">i</field>
                <value name="FROM">
                  <block type="math_number">
                    <field name="NUM">1</field>
                  </block>
                </value>
                <value name="TO">
                  <block type="math_number">
                    <field name="NUM">100</field>
                  </block>
                </value>
                <value name="BY">
                  <block type="math_number">
                    <field name="NUM">1</field>
                  </block>
                </value>
                <statement name="DO">
                  <block type="xrpl_generate_wallet">
                    <field name="WALLET_INFO">walletInfo</field>
                    <next>
                      <block type="variables_set">
                        <field name="VAR">wallets</field>
                        <value name="VALUE">
                          <block type="table_add_row">
                            <value name="TABLE">
                              <block type="variables_get">
                                <field name="VAR">wallets</field>
                              </block>
                            </value>
                            <value name="ROW">
                              <block type="dynamic_list_create">
                                <mutation items="2"></mutation>
                                <value name="ADD0">
                                  <block type="json_get_value">
                                    <value name="JSON">
                                      <block type="variables_get">
                                        <field name="VAR">walletInfo</field>
                                      </block>
                                    </value>
                                    <value name="KEY">
                                      <block type="text">
                                        <field name="TEXT">address</field>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                                <value name="ADD1">
                                  <block type="json_get_value">
                                    <value name="JSON">
                                      <block type="variables_get">
                                        <field name="VAR">walletInfo</field>
                                      </block>
                                    </value>
                                    <value name="KEY">
                                      <block type="text">
                                        <field name="TEXT">secret</field>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </next>
                  </block>
                </statement>
                <next>
                  <block type="table_csv_save">
                    <value name="TABLE">
                      <block type="variables_get">
                        <field name="VAR">wallets</field>
                      </block>
                    </value>
                    <value name="FILENAME">
                      <block type="text">
                        <field name="TEXT">wallets.csv</field>
                      </block>
                    </value>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
      `,
      title: "Automated Wallet Creation and CSV Export",
      description: "This template automates the creation of 100 XRPL wallets and exports the wallet information (address and secret) to a CSV file. It initializes an empty table, generates wallets in a loop with a speed setting of 1000 (higher values result in faster execution), adds the wallet information to the table, and finally saves the table as a CSV file. This is useful for bulk wallet generation and exporting wallet credentials for further use.",
      categories: ["template","xrpl","table"]
    },
    {
      height: 265,
      block:`
  <block type="variables_set" x="0" y="0">
    <field name="VAR">wallets</field>
    <value name="VALUE">
      <block type="csv_to_table">
        <field name="EXCLUDE_HEADER">TRUE</field>
        <value name="TABLE_TEXT">
          <block type="table_load_csv">
            <field name="TABLE">[["address","secret"],["rsKjFyyNgREkDJgdeFJXzZncZGcraS2S6S","sEd726vjZSmNRXTJwr5kNU93XFFHQdr"],["rnxMD5jvXeLBrXiB152TNoLLM9XbSnpU7W","sEdSCJLgYC6YUrCFKxw9NcsYMo9Uhsh"],["rhuBFRAk5HqZ7byUBNEfnuqdn4NKHDebiV","sEdT21U5cwxQ6QEm8sASP1tyG5vvXds"],["rJF8aaomvQGq2T6gHUjQuJ4oz9oj8C343n","sEdTMjkmMCH6rN4yZecyydxE9CkWfX9"],["rNsPzis1sQxFbeN9YCygtR9KwfCWhWpPTX","sEdSu3nJAEwKhvVaMehMfLsLMpNGwnf"],["rLuWa9RCax9RSXqw7jY1oW3htvhQa8e15L","sEd7fFVh4FDUtWhQm5uZPfbXH1fsrPE"],["rGB9sa9eD5Zf8dX2wGtutpnoPc7He4zDWk","sEd7XDtA5YM45wWyUfUJsE3KNfiT2zk"],["rEnxAPwrtTNbQhCZrL3AVhesqEz7JBXJ7p","sEdSzc3QYe8j4HqsqtbNjnuBn2ojMex"],["rpDCKq7hrhBjfv7r9b9RuVo43H7oukSuzU","sEdT1MGBPYKQFcip354DTm8yGXvnuzS"],["rEEY86aP7oWRYxdJARTZ8WatDRW8anNg9V","sEd7tni4WeGvUzhALxYT3J1yRBSVu1u"],["rnGPTNin6qrnXyXk8w6rMZCcCtoyi1R1dC","sEdVMxKPQAnqNmrDRcPXePZUTtihVw3"]]</field>
          </block>
        </value>
      </block>
    </value>
    <next>
      <block type="variables_set">
        <field name="VAR">secrets</field>
        <value name="VALUE">
          <block type="table_get_column">
            <value name="TABLE">
              <block type="variables_get">
                <field name="VAR">wallets</field>
              </block>
            </value>
            <value name="COLUMN">
              <block type="math_number">
                <field name="NUM">2</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="run_speed_set">
            <field name="SPEED">1000</field>
            <next>
              <block type="controls_forEach">
                <field name="VAR">i</field>
                <value name="LIST">
                  <block type="variables_get">
                    <field name="VAR">secrets</field>
                  </block>
                </value>
                <statement name="DO">
                  <block type="text_print">
                    <value name="TEXT">
                      <block type="variables_get">
                        <field name="VAR">i</field>
                      </block>
                    </value>
                    <next>
                      <block type="xrpl_load_wallet">
                        <field name="WALLET_ID">xrplWallet</field>
                        <value name="WALLET_SEED">
                          <block type="variables_get">
                            <field name="VAR">i</field>
                          </block>
                        </value>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
      `,
      title: "Load and Process CSV Wallets",
      description: "This template demonstrates how to load a CSV file containing wallet addresses and secrets, extract the secrets column, and process each secret by loading the corresponding wallet. The workflow includes setting the execution speed and iterating through the secrets to print and load each XRPL wallet.",
      categories: ["template","xrpl","table"]
    }
  ],
  form: [
    {
      height: 51,
      block: `
        <block type="form_modal_block" x="0" y="0"></block>
      `,
      title: "Form Modal",
      description: "Create and display a form. You can add editable input fields to the form, allowing the user to enter variables. When the program is executed, the form will be displayed, and the user will be prompted to provide input.",
      categories: ["form"],
      blockType: "form_modal_block",
    },
    {
      height: 23.5,
      block: `
        <block type="form_submitted" x="0" y="0"></block>
      `,
      title: "Form Submitted",
      description: "Check if a form has been submitted. This block takes the result of a form submission as input, represented as a JSON object. It then checks the 'submit' property of the 'return' object within the form result. If the 'submit' property is 'true', the block outputs 'true', indicating that the form was successfully submitted. If the 'submit' property is 'false' or an error occurs while parsing the input, the block outputs 'false'. This block can be used to control the flow of your program based on the submission status of a form. For example, you could use it to execute different actions or display different UI elements depending on whether the form was submitted or not.",
      categories: ["form"],
      blockType: "form_submitted",
    },
    {
      height: 71.5,
      block: `
        <block type="form_variable_get" x="0" y="0"></block>
      `,
      title: "Form Get Variable",
      description: "Get the value of a variable from a submitted form. The block will search the form result for an item (field) that matches the specified variable name, and output the value of that item. The value can be a string, number, or null if the variable is not found. This block is useful when you need to access the values of individual fields from a submitted form, for example to use those values in further processing or to display them in your application.",
      categories: ["form"],
      blockType: "form_variable_get",
    },
    {
      height: 204,
      block: `
  <block type="form_modal_block" x="0" y="0">
    <field name="INPUT">{"editable":false,"title":{"default":"Form Title"},"items":{"label_0":{"key":"label_0","value":"ABC","type":"string","name":{"default":"Param1"},"description":{"default":"New Description"}}}}</field>
    <field name="FORM_RESULT">result</field>
    <next>
      <block type="dynamic_if">
        <mutation else="1"></mutation>
        <value name="IF0">
          <block type="form_submitted">
            <value name="FORM_RESULT">
              <block type="variables_get">
                <field name="VAR">result</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO0">
          <block type="text_print">
            <value name="TEXT">
              <block type="text">
                <field name="TEXT">submitted</field>
              </block>
            </value>
            <next>
              <block type="text_print">
                <value name="TEXT">
                  <block type="form_variable_get">
                    <value name="FORM_RESULT">
                      <block type="variables_get">
                        <field name="VAR">result</field>
                      </block>
                    </value>
                    <value name="VARIABLE_NAME">
                      <block type="text">
                        <field name="TEXT">Param1</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
        <statement name="ELSE">
          <block type="text_print">
            <value name="TEXT">
              <block type="text">
                <field name="TEXT">cancel</field>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </next>
  </block>
      `,
      title: "Simple Form Example",
      description: "This template displays a simple form modal with a single input field labeled 'Param1'. When the form is submitted, the block prints the submitted status and the value of the 'Param1' field. If the form is canceled, the block prints a 'cancel' message instead. This example demonstrates the usage of the form functionality in the visual programming environment.",
      categories: ["template","form"]
    }
  ],
  webapi: [
    {
      height: 146.5,
      block: `
        <block type="webapi_request" x="0" y="0"></block>
      `,
      title: "Web API Request",
      description: "Sends a Web API request and stores the response in a variable.",
      categories: ["webapi"],
      blockType: "webapi_request",
    },
    {
      height: 50,
      block: `
        <block type="dynamic_webapi_headers" x="0" y="0"></block>
      `,
      title: "HTTP Headers",
      description: "Create HTTP headers.",
      categories: ["webapi"],
      blockType: "dynamic_webapi_headers",
    },
    {
      height: 50,
      block: `
        <block type="webapi_header" x="0" y="0"></block>
      `,
      title: "HTTP Header Key-Value Piar",
      description: "Create a single HTTP header key-value pair.",
      categories: ["webapi"],
      blockType: "webapi_header",
    },
    {
      height: 50,
      block: `
        <block type="webapi_url_params" x="0" y="0"></block>
      `,
      title: "URL Parameters",
      description: "Create URL query pamaeters.",
      categories: ["webapi"],
      blockType: "webapi_url_params",
    },
    {
      height: 50,
      block: `
        <block type="webapi_url_param" x="0" y="0"></block>
      `,
      title: "URL Parameter",
      description: "Create a single URL query pamaeter key-value pair.",
      categories: ["webapi"],
      blockType: "webapi_url_param",
    },
    {
      height: 178,
      block: `
  <block type="webapi_request" x="0" y="0">
    <field name="METHOD">POST</field>
    <field name="BODY_FORMAT">json</field>
    <field name="IS_ERROR">isError</field>
    <field name="RESPONSE">response</field>
    <value name="URL">
      <block type="text">
        <field name="TEXT">&lt;URL&gt;</field>
      </block>
    </value>
    <value name="HEADERS">
      <block type="dynamic_webapi_headers">
        <mutation items="2"></mutation>
        <value name="ADD0">
          <block type="webapi_header">
            <value name="KEY">
              <block type="text">
                <field name="TEXT">Authorization</field>
              </block>
            </value>
            <value name="VALUE">
              <block type="text">
                <field name="TEXT">&lt;Token&gt;</field>
              </block>
            </value>
          </block>
        </value>
        <value name="ADD1">
          <block type="webapi_header">
            <value name="KEY">
              <block type="text">
                <field name="TEXT">Test</field>
              </block>
            </value>
            <value name="VALUE">
              <block type="text">
                <field name="TEXT">Data</field>
              </block>
            </value>
          </block>
        </value>
      </block>
    </value>
    <value name="BODY">
      <block type="json_create">
        <field name="INPUT">{"data":"test"}</field>
      </block>
    </value>
  </block>
      `,
      title: "Custom API Request",
      description: "This template allows you to make a custom POST request to an API endpoint of your choice. You can specify the URL, add headers (such as an Authorization token), and include a JSON payload in the request body. The error and response from the API call are stored in the respective variables for further processing.",
      categories: ["template","webapi"]
    }
  ],
  chart: [
    {
      height: 98.5,
      block: `
        <block type="chart_order_book_block" x="0" y="0"></block>
      `,
      title: "View Order Book Chart",
      description: "Displays an order book chart with the given title, trading pair, and bid/ask data.",
      categories: ["chart"],
      blockType: "chart_order_book_block",
    },
    {
      height: 23.5,
      block: `
        <block type="chart_random_order_book_data" x="0" y="0"></block>
      `,
      title: "Random Bids & Asks",
      description: "Generates random order book data for use in the order book chart.",
      categories: ["chart"],
      blockType: "chart_random_order_book_data",
    },
    {
      height: 23.5,
      block: `
        <block type="chart_bitbank_depth_to_order_book" x="0" y="0"></block>
      `,
      title: "Convert bitbank Depth to Bids & Asks",
      description: "Converts a Bitbank depth data structure to the format required for the order book chart.",
      categories: ["chart"],
      blockType: "chart_bitbank_depth_to_order_book",
    },
    {
      height: 23.5,
      block: `
        <block type="chart_bitrue_depth_to_order_book" x="0" y="0"></block>
      `,
      title: "Convert Bitrue Depth to Bids & Asks",
      description: "Converts a Bitrue depth data structure to the format required for the order book chart.",
      categories: ["chart"],
      blockType: "chart_bitrue_depth_to_order_book",
    },
    {
      height: 23.5,
      block: `
        <block type="chart_coinbase_pro_book_to_order_book" x="0" y="0"></block>
      `,
      title: "Convert Coinbase Pro Book to Bids & Asks",
      description: "Converts a Coinbase Pro book data structure to the format required for the order book chart.",
      categories: ["chart"],
      blockType: "chart_coinbase_pro_book_to_order_book",
    },
    {
      height: 47.5,
      block: `
        <block type="chart_extract_balanced_order_book" x="0" y="0"></block>
      `,
      title: "Extract Balanced Bids & Asks",
      description: "Extracts the bids and asks from an order book data structure, limiting the number of items per side.",
      categories: ["chart"],
      blockType: "chart_extract_balanced_order_book",
    },
    {
      height: 314,
      block: `
  <block type="controls_whileUntil" x="0" y="0">
    <field name="MODE">WHILE</field>
    <value name="BOOL">
      <block type="logic_true"></block>
    </value>
    <statement name="DO">
      <block type="webapi_request">
        <field name="METHOD">GET</field>
        <field name="BODY_FORMAT">json</field>
        <field name="IS_ERROR">isError</field>
        <field name="RESPONSE">response</field>
        <value name="URL">
          <block type="text">
            <field name="TEXT">https://public.bitbank.cc/xrp_jpy/depth</field>
          </block>
        </value>
        <next>
          <block type="chart_order_book_block">
            <field name="INPUT">"Title"</field>
            <value name="TITLE">
              <block type="text">
                <field name="TEXT">Order book live chart</field>
              </block>
            </value>
            <value name="PAIR">
              <block type="text">
                <field name="TEXT">XRP/JPY</field>
              </block>
            </value>
            <value name="DATA">
              <block type="chart_extract_balanced_order_book">
                <value name="ORDERBOOK">
                  <block type="chart_bitbank_depth_to_order_book">
                    <value name="DEPTH">
                      <block type="variables_get">
                        <field name="VAR">response</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="LIMIT">
                  <block type="math_number">
                    <field name="NUM">10</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
  </block>
      `,
      title: "Live Orderbook Chart",
      description: "This template fetches the current order book data from the Bitbank cryptocurrency exchange API and displays a live chart showing the buy and sell orders. The chart is updated every 3 seconds to provide real-time order book information for the XRP/JPY trading pair.",
      categories: ["template","chart","webapi"]
    }
  ],
  control: [
    {
      height: 50,
      block: `
        <block type="controls_wait_seconds" x="0" y="0"></block>
      `,
      title: "Wait Seconds",
      description: "Wait for a specified number of seconds.",
      categories: ["control"],
      blockType: "controls_wait_seconds",
    },
    {
      height: 50,
      block: `
        <block type="controls_wait_until_datetime" x="0" y="0"></block>
      `,
      title: "Wait DateTime",
      description: "Waits until the specified date and time.",
      categories: ["control"],
      blockType: "controls_wait_until_datetime",
    },
    {
      height: 50,
      block: `
        <block type="run_speed_set" x="0" y="0"></block>
      `,
      title: "Run Speed",
      description: "Set the execution speed of the program. The value can range from 1 to 1000, with higher values resulting in faster execution speeds.",
      categories: ["control"],
      blockType: "run_speed_set",
    },
  ],
  time: [
    {
      height: 50,
      block: `
        <block type="datetime_current" x="0" y="0"></block>
      `,
      title: "Current DateTime",
      description: "Get the current date and time.",
      categories: ["time"],
      blockType: "datetime_current",
    },
    {
      height: 100,
      block: `
        <block type="datetime_create" x="0" y="0"></block>
      `,
      title: "Create DateTime",
      description: "Create a date and time.",
      categories: ["time"],
      blockType: "datetime_create",
    },
    {
      height: 100,
      block: `
        <block type="datetime_to_text" x="0" y="0"></block>
      `,
      title: "DateTime to Text",
      description: "Convert a date and time to text.",
      categories: ["time"],
      blockType: "datetime_to_text",
    },
    {
      height: 50,
      block: `
        <block type="datetime_adjust" x="0" y="0"></block>
      `,
      title: "Adjust DateTime",
      description: "Adjust a date and time by a specified amount.",
      categories: ["time"],
      blockType: "datetime_adjust",
    },
    {
      height: 50,
      block: `
        <block type="datetime_text_format" x="0" y="0"></block>
      `,
      title: "DateTime Text Format",
      description: "Format a date and time as text.",
      categories: ["time"],
      blockType: "datetime_text_format",
    },
    {
      height: 50,
      block: `
        <block type="datetime_timezone" x="0" y="0"></block>
      `,
      title: "Timezone",
      description: "Set the timezone for date and time operations.",
      categories: ["time"],
      blockType: "datetime_timezone",
    },
    {
      height: 50,
      block: `
        <block type="datetime_compare" x="0" y="0"></block>
      `,
      title: "Compare DateTime",
      description: "Compare two dates and times.",
      categories: ["time"],
      blockType: "datetime_compare",
    }
  ],
  json: [
    {
      height: 23.5,
      block: `
        <block type="json_create" x="0" y="0"></block>
      `,
      title: "JSON Object",
      description: "Convert text to a JSON object.",
      categories: ["json"],
      blockType: "json_create",
    },
    {
      height: 70,
      block: `
        <block type="json_append_key_values" x="0" y="0"></block>
      `,
      title: "Set JSON Key-Value List",
      description: "Set a list of JSON key-value pairs.",
      categories: ["json"],
      blockType: "json_append_key_values",
    },
    {
      height: 50,
      block: `
        <block type="json_add_key_value_pairs" x="0" y="0"></block>
      `,
      title: "Dynamic JSON Key-Value List",
      description: "Create a dynamic list of JSON key-value pairs.",
      categories: ["json"],
      blockType: "json_add_key_value_pairs",
    },
    {
      height: 50,
      block: `
        <block type="json_key_value_pair" x="0" y="0"></block>
      `,
      title: "JSON Key-Value Pair",
      description: "Create a single JSON key-value pair.",
      categories: ["json"],
      blockType: "json_key_value_pair",
    },
    {
      height: 50,
      block: `
        <block type="text_to_json" x="0" y="0"></block>
      `,
      title: "Text to JSON",
      description: "Convert text to a JSON object.",
      categories: ["json"],
      blockType: "text_to_json",
    },
    {
      height: 50,
      block: `
        <block type="json_to_text" x="0" y="0"></block>
      `,
      title: "JSON to Text",
      description: "Convert a JSON object to text.",
      categories: ["json"],
      blockType: "json_to_text",
    },
    {
      height: 70,
      block: `
        <block type="json_get_value" x="0" y="0"></block>
      `,
      title: "JSON Get Value",
      description: "Get a value from a JSON object.",
      categories: ["json"],
      blockType: "json_get_value",
    },
  ],
  animation: [
    {
      height: 61,
      block: `
        <block type="animation_confetti" x="0" y="0"></block>
      `,
      title: "Confetti Animation",
      description: "Show a confetti animation.",
      categories: ["animation"],
      blockType: "animation_confetti",
    }
  ],
  logic: [
    {
      height: 70,
      block: `
        <block type="dynamic_if" x="0" y="0"></block>
      `,
      title: "If Logic",
      description: "Create a conditional logic block.",
      categories: ["logic"],
      blockType: "dynamic_if",
    },
    {
      height: 50,
      block: `
        <block type="logic_compare" x="0" y="0"></block>
      `,
      title: "Logic Compare",
      "description": "This block is used for comparing two values. It offers various comparison operators such as equal to, not equal to, less than, greater than, less than or equal to, and greater than or equal to. The block returns a boolean value (true or false) based on the comparison result. It's essential for creating conditional logic in your programs.",
      categories: ["logic"],
      blockType: "logic_compare",
    },
    {
      height: 50,
      block: `
        <block type="logic_undefined" x="0" y="0"></block>
      `,
      title: "Undefined",
      description: "Returns the undefined value, used to indicate the absence of a value.",
      categories: ["logic"],
      blockType: "logic_undefined",
    },
    {
      height: 50,
      block: `
        <block type="logic_null" x="0" y="0"></block>
      `,
      title: "Null",
      description: "This block represents a null value. In programming, null typically indicates the absence of any object value. It's often used to represent an uninitialized state or to indicate that a variable has no value assigned to it. Be cautious when using null values, as they can lead to errors if not handled properly.",
      categories: ["logic"],
      blockType: "logic_null",
    },
    {
      height: 50,
      block: `
        <block type="logic_true" x="0" y="0"></block>
      `,
      title: "True",
      description: "Returns the boolean value true.",
      categories: ["logic"],
      blockType: "logic_true",
    },
    {
      height: 50,
      block: `
        <block type="logic_false" x="0" y="0"></block>
      `,
      title: "False",
      description: "Returns the boolean value false.",
      categories: ["logic"],
      blockType: "logic_false",
    },
    {
      height: 50,
      block: `
        <block type="logic_negate" x="0" y="0"></block>
      `,
      "title": "Not",
      "description": "This block negates a boolean value. It takes a boolean input and returns its opposite. If the input is true, it returns false, and if the input is false, it returns true. This block is useful for inverting conditions or creating opposite logic in your program.",
      categories: ["logic"],
      blockType: "logic_negate",
    },
    /*
    {
      height: 50,
      block: `
        <block type="logic_boolean" x="0" y="0"></block>
      `,
      title: "Boolean",
      "description": "This block represents a boolean value, which can be either true or false. It is commonly used in conditional statements and logical operations. The block allows users to select between 'true' and 'false' from a dropdown menu, making it easy to set and change boolean values in your program.",
      categories: ["logic"],
      blockType: "logic_boolean",
    },
    */
    {
      height: 50,
      block: `
        <block type="logic_operation" x="0" y="0"></block>
      `,
      title: "Logical Operation",
      "description": "This block performs logical operations on boolean values. It supports 'AND' and 'OR' operations. The 'AND' operation returns true only if both inputs are true, while the 'OR' operation returns true if at least one input is true. This block is crucial for combining multiple conditions in complex logical expressions.",
      categories: ["logic"],
      blockType: "logic_operation",
    },
    {
      height: 96,
      block: `
        <block type="logic_ternary" x="0" y="0"></block>
      `,
      title: "Ternary Operator",
      description: "This block implements a ternary operation, which is a compact way of writing an if-else statement. It takes three inputs: a condition, a value to return if the condition is true, and a value to return if the condition is false. This block is useful for concise conditional assignments and can make your code more readable in certain situations.",
      categories: ["logic"],
      blockType: "logic_ternary",
    },
  ],
  loop: [
    {
      height: 80,
      block: `
        <block type="controls_whileUntil" x="0" y="0"></block>
      `,
      title: "While/Until Loop",
      description: "Create a while or until loop.",
      categories: ["loop"],
      blockType: "controls_whileUntil",
    },
    {
      height: 80,
      block: `
        <block type="controls_for" x="0" y="0"></block>
      `,
      title: "For Loop",
      description: "Create a for loop.",
      categories: ["loop"],
      blockType: "controls_for",
    },
    {
      height: 80,
      block: `
        <block type="controls_forEach" x="0" y="0"></block>
      `,
      title: "ForEach Loop",
      description: "Create a for-each loop.",
      categories: ["loop"],
      blockType: "controls_forEach",
    }
  ],
  list: [
    {
      height: 50,
      block: `
        <block type="lists_create_empty" x="0" y="0"></block>
      `,
      title: "Create Empty List",
      description: "Create an empty list to store items.",
      categories: ["list"],
      blockType: "lists_create_empty",
    },
    {
      height: 70,
      block: `
        <block type="lists_append" x="0" y="0"></block>
      `,
      title: "Append to Array",
      description: "Append an item to an array.",
      categories: ["list"],
      blockType: "lists_append",
    },
    {
      height: 70,
      block: `
        <block type="dynamic_list_create" x="0" y="0"></block>
      `,
      title: "Create List",
      description: "Create a dynamic list.",
      categories: ["list"],
      blockType: "dynamic_list_create",
    },
    {
      height: 50,
      block: `
        <block type="lists_length" x="0" y="0"></block>
      `,
      title: "List Length",
      description: "Get the length of a list.",
      categories: ["list"],
      blockType: "lists_length",
    },
    {
      height: 50,
      block: `
        <block type="lists_isEmpty" x="0" y="0"></block>
      `,
      title: "List Is Empty",
      description: "Check if a list is empty.",
      categories: ["list"],
      blockType: "lists_isEmpty",
    },
    {
      height: 50,
      block: `
        <block type="lists_repeat" x="0" y="0"></block>
      `,
      title: "List Repeat",
      description: "Create a list with one item repeated a specified number of times.",
      categories: ["list"],
      blockType: "lists_repeat",
    },
    {
      height: 50,
      block: `
        <block type="lists_getIndex" x="0" y="0"></block>
      `,
      title: "List Get Index",
      description: "Retrieve an item at a specified position in a list.",
      categories: ["list"],
      blockType: "lists_getIndex",
    },
    {
      height: 50,
      block: `
        <block type="lists_indexOf" x="0" y="0"></block>
      `,
      title: "List Index of",
      description: "Find the index of the first/last occurrence of an item in a list.",
      categories: ["list"],
      blockType: "lists_indexOf",
    },
    {
      height: 50,
      block: `
        <block type="lists_sort" x="0" y="0"></block>
      `,
      title: "Sort List",
      description: "Sort a list.",
      categories: ["list"],
      blockType: "lists_sort",
    },
    {
      height: 71.5,
      block: `
        <block type="lists_sort_json_value" x="0" y="0"></block>
      `,
      title: "Sort JSON List",
      description: "Sort a list of JSON objects by a specified key. This block takes a JSON array as input and allows you to sort the items in the array based on the value of a particular key. You can specify the type of sorting (numeric, alphabetic, or alphabetic with case-insensitive) as well as the sort order (ascending or descending). The 'Key' input specifies the property of the JSON objects that you want to sort by. The 'Type' dropdown allows you to choose the sorting algorithm, and the 'Order' dropdown lets you select ascending or descending order. The output of this block is the sorted JSON array. This can be useful when you need to present data in a specific order, for example, displaying a list of items sorted by price or name.",
      categories: ["list"],
      blockType: "lists_sort_json_value",
    },
  ],
  system: [
    {
      height: 62.1,
      block: `
        <block type="fallback_statement_block" x="0" y="0"></block>
      `,
      title: "Fallback Statement Block",
      description: "This block serves as a placeholder for an unknown or unrecognized statement-type block that the AI attempted to generate but failed. It represents a sequence of actions or commands that would normally be executed in order. Users can inspect this block to understand the AI's intended logic flow and potentially replace it with the correct implementation or adjust their input for better results.",
      categories: ["system","logic"],
      blockType: "fallback_statement_block",
    },
    {
      height: 56.7,
      block: `
        <block type="fallback_value_block" x="0" y="0"></block>
      `,
      title: "Fallback Value Block",
      description: "This block acts as a placeholder for an unknown or unrecognized value-type block that the AI attempted to generate but failed. It represents a block that would normally return a value (such as a number, text, or boolean). Users can examine this block to understand what kind of value or computation the AI intended to create, and potentially replace it with the correct implementation or refine their input for improved results.",
      categories: ["system","text","math"],
      blockType: "fallback_value_block",
    }
  ]
};
