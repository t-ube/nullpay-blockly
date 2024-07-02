import { blocks } from "blockly/blocks";

// @/blocks/BlockContents.tsx
export const xrpl_blocks = [
  {
    height: 54,
    block: `
      <block type="xrpl_create_account" x="0" y="0"></block>
    `,
    title: "XRPL Generate Wallet",
    description: "This block generates a new wallet on the XRPL (XRP Ledger). The generated wallet includes a unique address and a corresponding secret key, which can be used for transactions on the XRPL network. Note that the wallet needs to be activated by funding it with the minimum reserve amount before it can be used for transactions. Ensure to store the generated keys securely.",
    categories: ["xrpl"]
  },
  {
    height: 150,
    block: `
      <block type="xrpl_request_custom_faucet" x="0" y="0"></block>
    `,
    title: "XRPL Create Account and Custom Faucet Request",
    description: "Request funds from a custom XRPL faucet.",
    categories: ["xrpl"]
  },
  {
    height: 50,
    block: `
      <block type="xrpl_network_wss_selection" x="0" y="0"></block>
    `,
    title: "XRPL Network Selection",
    description: "Select the WebSocket URL for the XRPL network.",
    categories: ["xrpl"]
  },
  {
    height: 50,
    block: `
      <block type="xrpl_faucet_network_selection" x="0" y="0"></block>
    `,
    title: "XRPL Faucet Network Selection",
    description: "Select the faucet network for creating test accounts.",
    categories: ["xrpl"]
  },
  {
    height: 150,
    block: `
      <block type="xrpl_request_faucet" x="0" y="0"></block>
    `,
    title: "XRPL Faucet Request",
    description: "Request funds from the default XRPL faucet.",
    categories: ["xrpl"]
  },
  {
    height: 50,
    block: `
      <block type="xrpl_address" x="0" y="0"></block>
    `,
    title: "XRPL Address",
    description: "Define an XRPL address.",
    categories: ["xrpl"]
  },
  {
    height: 50,
    block: `
      <block type="xrpl_exchange_address" x="0" y="0"></block>
    `,
    title: "XRPL Exchange Address",
    description: "Define an XRPL exchange address.",
    categories: ["xrpl"]
  },
  {
    height: 50,
    block: `
      <block type="xrpl_xrp_to_drops" x="0" y="0"></block>
    `,
    title: "XRP to Drops",
    description: "Convert XRP to drops.",
    categories: ["xrpl"]
  },
  {
    height: 50,
    block: `
      <block type="xrpl_drops_to_xrp" x="0" y="0"></block>
    `,
    title: "Drops to XRP",
    description: "Convert drops to XRP.",
    categories: ["xrpl"]
  },
  {
    height: 80,
    block: `
      <block type="xrpl_client_initialize" x="0" y="0"></block>
    `,
    title: "Initialize XRPL Client",
    description: "Initialize a new XRPL client to connect to the XRPL network.",
    categories: ["xrpl"]
  },
  {
    height: 150,
    block: `
      <block type="xrpl_account_info" x="0" y="0"></block>
    `,
    title: "XRPL Account Info",
    description: "Retrieve information about a specific XRPL account.",
    categories: ["xrpl"]
  },
  {
    height: 131,
    block: `
      <block type="xrpl_subscribe_account_txn" x="0" y="0"></block>
    `,
    title: "Subscribe Account Transactions",
    description: "Subscribe to transactions for a specific XRPL account to receive real-time updates.",
    categories: ["xrpl"]
  },
  {
    height: 100,
    block: `
      <block type="xrpl_unsubscribe_account_txn" x="0" y="0"></block>
    `,
    title: "Unsubscribe Account Transactions",
    description: "Unsubscribe from transactions for a specific XRPL account to stop receiving updates.",
    categories: ["xrpl"]
  },
  {
    height: 131,
    block: `
      <block type="xrpl_subscribe_all_txn" x="0" y="0"></block>
    `,
    title: "Subscribe All Transactions",
    description: "Subscribe to all transactions on the XRPL to receive real-time updates for every transaction.",
    categories: ["xrpl"]
  },
  {
    height: 100,
    block: `
      <block type="xrpl_unsubscribe_all_txn" x="0" y="0"></block>
    `,
    title: "Unsubscribe All Transactions",
    description: "Unsubscribe from all transactions on the XRPL to stop receiving updates for every transaction.",
    categories: ["xrpl"]
  },
  {
    height: 80,
    block: `
      <block type="xrpl_load_wallet" x="0" y="0"></block>
    `,
    title: "Load Wallet",
    description: "Load an existing wallet using a seed to manage XRPL accounts and transactions.",
    categories: ["xrpl"]
  },
  {
    height: 80,
    block: `
      <block type="xrpl_wallet_info" x="0" y="0"></block>
    `,
    title: "Wallet Info",
    description: "Retrieve information about an XRPL wallet. Provide the wallet ID to get the address and secret.",
    categories: ["xrpl"]
  },
  {
    height: 183,
    block: `
      <block type="xrpl_payment_transaction" x="0" y="0"></block>
    `,
    title: "Payment Transaction",
    description: "Create and submit a payment transaction on the XRPL.",
    categories: ["xrpl"]
  },
  {
    height: 105,
    block: `
      <block type="xrpl_wallet_sign" x="0" y="0"></block>
    `,
    title: "Sign Wallet",
    description: "Sign a transaction with the wallet's private key to authorize it.",
    categories: ["xrpl"]
  },
  {
    height: 105,
    block: `
      <block type="xrpl_client_submit" x="0" y="0"></block>
    `,
    title: "Submit",
    description: "Submit a signed transaction to the XRPL network for processing.",
    categories: ["xrpl"]
  },
  {
    height: 50,
    block: `
      <block type="datetime_to_ripple_epoch" x="0" y="0"></block>
    `,
    title: "DateTime to Ripple Epoch",
    description: "Convert a date and time to Ripple epoch time.",
    categories: ["xrpl"]
  },
  {
    height: 50,
    block: `
      <block type="ripple_epoch_to_datetime" x="0" y="0"></block>
    `,
    title: "Ripple Epoch to DateTime",
    description: "Convert Ripple epoch time to date and time.",
    categories: ["xrpl"]
  },
  {
    height: 50,
    block: `
      <block type="xrpl_token_select" x="0" y="0"></block>
    `,
    title: "XRPL Token Select",
    description: "Select an issued token on the XRPL from the dropdown.",
    categories: ["xrpl"]
  },
  {
    height: 96,
    block: `
      <block type="xrpl_create_new_token" x="0" y="0"></block>
    `,
    title: "XRPL Create New Token",
    description: "Create a new token on the XRPL by specifying the issuer address, currency code, and total supply.",
    categories: ["xrpl"]
  },
  {
    height: 50,
    block: `
      <block type="xrpl_rippling_txn" x="0" y="0"></block>
    `,
    title: "XRPL Rippling Transaction",
    description: "Create a rippling transaction for the XRPL. Specify whether to enable or disable rippling and the address to set this for.",
    categories: ["xrpl"]
  },
  {
    height: 99,
    block: `
      <block type="xrpl_client_autofill" x="0" y="0"></block>
    `,
    title: "XRPL Transaction Autofill",
    description: "Automatically fill in a transaction using the specified XRPL client. Define the XRPL client and the transaction to autofill.",
    categories: ["xrpl"]
  },
  {
    height: 99,
    block: `
      <block type="xrpl_trust_set_txn" x="0" y="0"></block>
    `,
    title: "XRPL Trust Set",
    description: "Create a trust line setting transaction for the XRPL. Specify the token and the address to set the trust line for.",
    categories: ["xrpl"]
  },
  {
    height: 120,
    block: `
      <block type="xrpl_payment_token_txn" x="0" y="0"></block>
    `,
    title: "XRPL Payment Token",
    description: "Create a payment transaction on the XRPL. Specify the token, account address, destination address, and amount for the transaction.",
    categories: ["xrpl"]
  },
  {
    height: 120,
    block: `
      <block type="xrpl_buy_token_offer_txn" x="0" y="0"></block>
    `,
    title: "XRPL Buy Offer",
    description: "Create a buy offer for tokens on the XRPL DEX.",
    categories: ["xrpl"]
  },
  {
    height: 120,
    block: `
      <block type="xrpl_sale_token_offer_txn" x="0" y="0"></block>
    `,
    title: "XRPL Sale Offer",
    description: "Create a sale offer for tokens on the XRPL DEX.",
    categories: ["xrpl"]
  },
  {
    height: 123,
    block: `
      <block type="xrpl_easy_submit" x="0" y="0"></block>
    `,
    title: "XRPL Easy Submit",
    description: "Submit a transaction to the XRPL with autofill capability. Specify the XRPL client, wallet, and transaction. The transaction will be automatically filled with necessary details and the result will be stored in the specified variable.",
    categories: ["xrpl"]
  },
  {
    height: 23.5,
    block: `
      <block type="xrpl_txn_type_select" x="0" y="0"></block>
    `,
    title: "XRPL Transaction Type Select",
    description: "Select an XRPL transaction type from the dropdown.",
    categories: ["xrpl"]
  },
  {
    height: 93.5,
    block: `
      <block type="xrpl_tx_command" x="0" y="0"></block>
    `,
    title: "XRPL Get Transaction",
    description: "Retrieve a transaction from the XRPL using the specified client and transaction hash.",
    categories: ["xrpl"]
  },
  {
    height: 93.5,
    block: `
      <block type="xrpl_account_lines_command" x="0" y="0"></block>
    `,
    title: "XRPL Get Account Lines",
    description: "Retrieve information about the trust lines associated with an XRPL account.",
    categories: ["xrpl"]
  },
  {
    height: 167.5,
    block: `
      <block type="xrpl_read_txn_info" x="0" y="0"></block>
    `,
    title: "XRPL Read Transaction info",
    description: "Retrieve transaction information and store it in separate variables.",
    categories: ["xrpl"]
  },
  {
    height: 143.5,
    block: `
      <block type="xrpl_extract_offer_create_txn" x="0" y="0"></block>
    `,
    title: "XRPL Extract Offer Create Transaction",
    description: "Extract and process an OfferCreate transaction from the XRPL into separate variables.",
    categories: ["xrpl"]
  },
  {
    height: 1502.5,
    block: `
        <variables>
          <variable id="}=@y]lR)yo\$7jm\${%)~Q">issuerInfo</variable>
          <variable id="=%)Saa;n}:JDCT)JwuHf">issuerAddress</variable>
          <variable id="y(c/b\`2w_ExT-MP[t]o2">token</variable>
          <variable id="Xe_Um=04.A}Pm;=wMsX:">xrplClient</variable>
          <variable id="bxPm,KY=-@8vtu*bSGsp">issuerWallet</variable>
          <variable id="IuTgNBpqZmM*Wnx4\`!pt">result</variable>
          <variable id="GF3QbB*ZmaBxon@!4?FH">faucetInfo</variable>
          <variable id="/}dNVuDet})7KIAd!{;V">userAddress</variable>
          <variable id="xMBzI7UBn!L3](uO_[sm">userWallet</variable>
          <variable id="R.lC{=0~|_Ha0S)g3Aga">accountLines</variable>
        </variables>
        <block type="xrpl_request_custom_faucet" id="G)}V,za@edq^YN@CIzmj" x="0" y="0">
          <field name="VAR" id="}=@y]lR)yo\$7jm\${%)~Q">issuerInfo</field>
          <value name="CONNECTION">
            <block type="xrpl_network_wss_selection" id="/t(|RBJj0}q|LuIn(ag6">
              <field name="NETWORK_TYPE">xrpl</field>
              <field name="CONNECTION">wss://s.altnet.rippletest.net:51233</field>
            </block>
          </value>
          <value name="AMOUNT">
            <block type="math_number" id="x)L386P,?clW6*x*@W+.">
              <field name="NUM">1000</field>
            </block>
          </value>
          <next>
            <block type="variables_set" id="Z0/W[eVt0|Q@++g/]loh">
              <field name="VAR" id="=%)Saa;n}:JDCT)JwuHf">issuerAddress</field>
              <value name="VALUE">
                <block type="json_get_value" id="4j4K7Ln}-nTM~_CScP7w">
                  <value name="VAR">
                    <block type="variables_get" id="P#TJjIZt{KOz5T5CC7~x">
                      <field name="VAR" id="}=@y]lR)yo\$7jm\${%)~Q">issuerInfo</field>
                    </block>
                  </value>
                  <value name="KEY">
                    <block type="text" id="YIh?+7#JU7+fA/1m\`XYL">
                      <field name="TEXT">address</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="variables_set" id=";RzTIWE0bTNF[sCO[-o{">
                  <field name="VAR" id="y(c/b\`2w_ExT-MP[t]o2">token</field>
                  <value name="VALUE">
                    <block type="xrpl_create_new_token" id="xj4t7^/lk17OuJX\`(3(i">
                      <value name="ISSUER">
                        <block type="variables_get" id="}{avAx},E59Dd}Mj469O">
                          <field name="VAR" id="=%)Saa;n}:JDCT)JwuHf">issuerAddress</field>
                        </block>
                      </value>
                      <value name="CODE">
                        <block type="text" id="G#D{9=ghRW2T3CV[Z/V.">
                          <field name="TEXT">TST</field>
                        </block>
                      </value>
                      <value name="SUPPLY">
                        <block type="math_number" id="n04k33{Ik^#M#t#|Dk6C">
                          <field name="NUM">100000</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <next>
                    <block type="text_print" id="gzRZf,=vU0nET1:HXQtp">
                      <value name="TEXT">
                        <block type="json_to_text" id="Xm?l_u??\`\`m9]_!@]dAt">
                          <value name="JSON">
                            <block type="variables_get" id="StNJ|2+Yo9(q!H1,DX}5">
                              <field name="VAR" id="y(c/b\`2w_ExT-MP[t]o2">token</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <next>
                        <block type="xrpl_client_initialize" id="7xl8[+*psP%_%QdmXe*I">
                          <field name="VAR" id="Xe_Um=04.A}Pm;=wMsX:">xrplClient</field>
                          <value name="SERVER">
                            <block type="xrpl_network_wss_selection" id="xdv1J7TW7N?npM%ee!R2">
                              <field name="NETWORK_TYPE">xrpl</field>
                              <field name="CONNECTION">wss://s.altnet.rippletest.net:51233</field>
                            </block>
                          </value>
                          <next>
                            <block type="xrpl_load_wallet" id="4JB\$@tr9U)!^+|is{F)c">
                              <field name="VAR" id="bxPm,KY=-@8vtu*bSGsp">issuerWallet</field>
                              <value name="SEED">
                                <block type="json_get_value" id="VgA(ukOC-bDq/e|HwZiU">
                                  <value name="VAR">
                                    <block type="variables_get" id="|n[iv*[w\`!Fu\$ofqAW4A">
                                      <field name="VAR" id="}=@y]lR)yo\$7jm\${%)~Q">issuerInfo</field>
                                    </block>
                                  </value>
                                  <value name="KEY">
                                    <block type="text" id="n26RfEAuxBd9+H5d~P79">
                                      <field name="TEXT">secret</field>
                                    </block>
                                  </value>
                                </block>
                              </value>
                              <next>
                                <block type="xrpl_easy_submit" id="YCpMl^~Xl/D[s@1r,@*W">
                                  <field name="VAR" id="IuTgNBpqZmM*Wnx4\`!pt">result</field>
                                  <value name="CLIENT">
                                    <block type="variables_get" id="3behGs!l[P*BUD-K7:,v">
                                      <field name="VAR" id="Xe_Um=04.A}Pm;=wMsX:">xrplClient</field>
                                    </block>
                                  </value>
                                  <value name="WALLET">
                                    <block type="variables_get" id="a7ZB4FV7AP!.!EDo*fb\`">
                                      <field name="VAR" id="bxPm,KY=-@8vtu*bSGsp">issuerWallet</field>
                                    </block>
                                  </value>
                                  <value name="TRANSACTION">
                                    <block type="xrpl_rippling_txn" id="t*yU?=oC%].mFct)8{N_">
                                      <field name="RIPPLING">ENABLE</field>
                                      <value name="ADDRESS">
                                        <block type="variables_get" id="l_Uc|PZ.Z{Q[N|14M.Q}">
                                          <field name="VAR" id="=%)Saa;n}:JDCT)JwuHf">issuerAddress</field>
                                        </block>
                                      </value>
                                    </block>
                                  </value>
                                  <next>
                                    <block type="xrpl_request_custom_faucet" id=".37*Z?f!S\$pta5V^P,zS">
                                      <field name="VAR" id="GF3QbB*ZmaBxon@!4?FH">faucetInfo</field>
                                      <value name="CONNECTION">
                                        <block type="xrpl_network_wss_selection" id="l0m{q9k[f.BLrAzCVfi#">
                                          <field name="NETWORK_TYPE">xrpl</field>
                                          <field name="CONNECTION">wss://s.altnet.rippletest.net:51233</field>
                                        </block>
                                      </value>
                                      <value name="AMOUNT">
                                        <block type="math_number" id="{Y/w[95N78sUL?P1-n\`g">
                                          <field name="NUM">100</field>
                                        </block>
                                      </value>
                                      <next>
                                        <block type="variables_set" id="(z:-hx-~fe1,}iylo]/#">
                                          <field name="VAR" id="/}dNVuDet})7KIAd!{;V">userAddress</field>
                                          <value name="VALUE">
                                            <block type="json_get_value" id="fPX;D^no%d/N|VUH5X_]">
                                              <value name="VAR">
                                                <block type="variables_get" id="VoU|nCp}%6o-p\$u]xG_9">
                                                  <field name="VAR" id="GF3QbB*ZmaBxon@!4?FH">faucetInfo</field>
                                                </block>
                                              </value>
                                              <value name="KEY">
                                                <block type="text" id="]jy/D=3nc^p~Ou-gW}+G">
                                                  <field name="TEXT">address</field>
                                                </block>
                                              </value>
                                            </block>
                                          </value>
                                          <next>
                                            <block type="xrpl_load_wallet" id="e8o.n)_s~QV]i4lOeDQ{">
                                              <field name="VAR" id="xMBzI7UBn!L3](uO_[sm">userWallet</field>
                                              <value name="SEED">
                                                <block type="json_get_value" id="_O9**!zzQsJXa\`BxXg\$L">
                                                  <value name="VAR">
                                                    <block type="variables_get" id="bw\`s/+K#0HMWjCTxNT4,">
                                                      <field name="VAR" id="GF3QbB*ZmaBxon@!4?FH">faucetInfo</field>
                                                    </block>
                                                  </value>
                                                  <value name="KEY">
                                                    <block type="text" id="WT}m*j*7i?C,1|@;Np3l">
                                                      <field name="TEXT">secret</field>
                                                    </block>
                                                  </value>
                                                </block>
                                              </value>
                                              <next>
                                                <block type="xrpl_easy_submit" id="o]ih?DJ_y#jsw1b1|2Yv">
                                                  <field name="VAR" id="IuTgNBpqZmM*Wnx4\`!pt">result</field>
                                                  <value name="CLIENT">
                                                    <block type="variables_get" id="wLJW6OuwaK_/QZ2/89Uy">
                                                      <field name="VAR" id="Xe_Um=04.A}Pm;=wMsX:">xrplClient</field>
                                                    </block>
                                                  </value>
                                                  <value name="WALLET">
                                                    <block type="variables_get" id="0UrO+PW*Q#lC3-^KTY:6">
                                                      <field name="VAR" id="xMBzI7UBn!L3](uO_[sm">userWallet</field>
                                                    </block>
                                                  </value>
                                                  <value name="TRANSACTION">
                                                    <block type="xrpl_trust_set_txn" id="\$^z21d,u*nnCB(_(7U\$]">
                                                      <value name="TOKEN">
                                                        <block type="variables_get" id="=nE\$BGkDwF45#N!LSZB0">
                                                          <field name="VAR" id="y(c/b\`2w_ExT-MP[t]o2">token</field>
                                                        </block>
                                                      </value>
                                                      <value name="ADDRESS">
                                                        <block type="variables_get" id="l.UPF#a/1;%Xkxl^}Y|c">
                                                          <field name="VAR" id="/}dNVuDet})7KIAd!{;V">userAddress</field>
                                                        </block>
                                                      </value>
                                                    </block>
                                                  </value>
                                                  <next>
                                                    <block type="xrpl_easy_submit" id="ng9+*1dnrg3(#UG2A5|d">
                                                      <field name="VAR" id="IuTgNBpqZmM*Wnx4\`!pt">result</field>
                                                      <value name="CLIENT">
                                                        <block type="variables_get" id="i24~A]BPk9~juHxjO0~8">
                                                          <field name="VAR" id="Xe_Um=04.A}Pm;=wMsX:">xrplClient</field>
                                                        </block>
                                                      </value>
                                                      <value name="WALLET">
                                                        <block type="variables_get" id="HO,wI%C0qp61SbE-mp%q">
                                                          <field name="VAR" id="xMBzI7UBn!L3](uO_[sm">userWallet</field>
                                                        </block>
                                                      </value>
                                                      <value name="TRANSACTION">
                                                        <block type="xrpl_buy_token_offer_txn" id="FIB(nUf,@e%(pd0w9eeb">
                                                          <value name="ACCOUNT_ADDRESS">
                                                            <block type="variables_get" id="XPqhM#Ljg6_u(%{+5:qU">
                                                              <field name="VAR" id="/}dNVuDet})7KIAd!{;V">userAddress</field>
                                                            </block>
                                                          </value>
                                                          <value name="TOKEN">
                                                            <block type="variables_get" id="j]{{\`?\$W:}dGHg717YPd">
                                                              <field name="VAR" id="y(c/b\`2w_ExT-MP[t]o2">token</field>
                                                            </block>
                                                          </value>
                                                          <value name="TOKEN_AMOUNT">
                                                            <block type="math_number" id="k%F8hoJ~k*2VMen@W;BL">
                                                              <field name="NUM">1</field>
                                                            </block>
                                                          </value>
                                                          <value name="XRP_AMOUNT">
                                                            <block type="math_number" id="5Clcj{)%-(Ip-@/it4gu">
                                                              <field name="NUM">10</field>
                                                            </block>
                                                          </value>
                                                        </block>
                                                      </value>
                                                      <next>
                                                        <block type="xrpl_easy_submit" id="j_6=:#W6:xlB4D{;74me">
                                                          <field name="VAR" id="IuTgNBpqZmM*Wnx4\`!pt">result</field>
                                                          <value name="CLIENT">
                                                            <block type="variables_get" id=":eFrew]b]h3gcajI*0+O">
                                                              <field name="VAR" id="Xe_Um=04.A}Pm;=wMsX:">xrplClient</field>
                                                            </block>
                                                          </value>
                                                          <value name="WALLET">
                                                            <block type="variables_get" id="NrHvCt*LUv8P\`eKk|0c3">
                                                              <field name="VAR" id="bxPm,KY=-@8vtu*bSGsp">issuerWallet</field>
                                                            </block>
                                                          </value>
                                                          <value name="TRANSACTION">
                                                            <block type="xrpl_sale_token_offer_txn" id="UXj7\`J@]Da+|D38AdCSM">
                                                              <value name="ACCOUNT_ADDRESS">
                                                                <block type="variables_get" id="|bOfsJN14/#g]a.^3ZI+">
                                                                  <field name="VAR" id="=%)Saa;n}:JDCT)JwuHf">issuerAddress</field>
                                                                </block>
                                                              </value>
                                                              <value name="TOKEN">
                                                                <block type="variables_get" id="xWiQk9Mm)%+i}D|?BZc*">
                                                                  <field name="VAR" id="y(c/b\`2w_ExT-MP[t]o2">token</field>
                                                                </block>
                                                              </value>
                                                              <value name="TOKEN_AMOUNT">
                                                                <block type="math_number" id="g3a!6?-c0u^2cq\`C4#F=">
                                                                  <field name="NUM">1</field>
                                                                </block>
                                                              </value>
                                                              <value name="XRP_AMOUNT">
                                                                <block type="math_number" id="CA!KZ0H^xm38L{Ye/AMx">
                                                                  <field name="NUM">10</field>
                                                                </block>
                                                              </value>
                                                            </block>
                                                          </value>
                                                          <next>
                                                            <block type="dynamic_if" id="/HNRBW=M:yOz^~[7Rw:%">
                                                              <mutation else="1"></mutation>
                                                              <value name="IF0">
                                                                <block type="xrpl_account_lines_command" id="Xz9iiB_R#y}p=J1NCp6F">
                                                                  <field name="VAR" id="R.lC{=0~|_Ha0S)g3Aga">accountLines</field>
                                                                  <value name="CLIENT">
                                                                    <block type="variables_get" id="PNjch4E~s@#l%x}pv1U[">
                                                                      <field name="VAR" id="Xe_Um=04.A}Pm;=wMsX:">xrplClient</field>
                                                                    </block>
                                                                  </value>
                                                                  <value name="ACCOUNT_ADDRESS">
                                                                    <block type="variables_get" id="1|J]JlPS*p*A)||xf,VT">
                                                                      <field name="VAR" id="/}dNVuDet})7KIAd!{;V">userAddress</field>
                                                                    </block>
                                                                  </value>
                                                                </block>
                                                              </value>
                                                              <statement name="DO0">
                                                                <block type="text_print" id="1g3nJM,(5;4aiY*:bDK=">
                                                                  <value name="TEXT">
                                                                    <block type="json_to_text" id="jk]L+]pe\`j4R_o(mdQ:D">
                                                                      <value name="JSON">
                                                                        <block type="variables_get" id="0}S,j}7zI|QOfN#[0^9m">
                                                                          <field name="VAR" id="R.lC{=0~|_Ha0S)g3Aga">accountLines</field>
                                                                        </block>
                                                                      </value>
                                                                    </block>
                                                                  </value>
                                                                  <next>
                                                                    <block type="text_print" id="T0v{Q-CA}-ip!/idfbfv">
                                                                      <value name="TEXT">
                                                                        <block type="text" id="Wr_rTT5GO!}8y[!C!sI\$">
                                                                          <field name="TEXT">Complete!</field>
                                                                        </block>
                                                                      </value>
                                                                    </block>
                                                                  </next>
                                                                </block>
                                                              </statement>
                                                              <statement name="ELSE">
                                                                <block type="text_print" id="Z2E[UAW.RJ]Fv\$^~FW/A">
                                                                  <value name="TEXT">
                                                                    <block type="text" id="B|XKo?}^r+C6*YC_:ahx">
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
    `,
    title: "XRPL Token Creation and Transaction Flow",
    description: "This template guides you through the entire process of creating and managing a token on the XRPL (XRP Ledger). It includes steps to create a token, initialize the XRPL client, request testnet funds, set up wallets, and execute transactions such as trust set and token offers. This comprehensive flow ensures you understand how to interact with the XRPL for token management and transactions.",
    categories: ["template","xrpl"]
  },
  {
    height: 759,
    block: `
  <variables>
    <variable id="kDLr-FS(n4n(\`vJ2c9#$">xrplClient</variable>
    <variable id="]Noe}fF6/C5P8A{2$m~6">transactionHash</variable>
    <variable id="LSjNV)z/ozI_7F|ntY{A">transaction</variable>
    <variable id="V|9D3)Jg@[SNY=:1*57o">transactionType</variable>
    <variable id="$F;Acx^Tl;0FeJ\`tBI(z">account</variable>
    <variable id="lKc/v\`weu]x|QzZY%czN">ledgerIndex</variable>
    <variable id=":5?1N~|AcY;T\`R_lm$b(">hash</variable>
    <variable id="xWg\`}7GJ$AR,I7(1B-hX">date</variable>
    <variable id="sY,z!:\`96U)fU(2UB8Fg">extractedData</variable>
  </variables>
  <block type="xrpl_client_initialize" id="A3y[!Z-60*aOL%.5r!y]" x="0" y="0">
    <field name="VAR" id="kDLr-FS(n4n(\`vJ2c9#$">xrplClient</field>
    <value name="SERVER">
      <block type="xrpl_network_wss_selection" id="F4aUDcaP%cN[tf)la4.C">
        <field name="NETWORK_TYPE">xrpl</field>
        <field name="CONNECTION">wss://xrpl.ws</field>
      </block>
    </value>
    <next>
      <block type="variables_set" id="pN;mmh)tXAZ-c[Gx7,|h">
        <field name="VAR" id="]Noe}fF6/C5P8A{2$m~6">transactionHash</field>
        <value name="VALUE">
          <block type="text" id="F)K+cD[B8U@dpkUk!zic">
            <field name="TEXT">5CB55A3927BEF28E714A59F7CDC2C33D211B78DB015B819E8DADD02C032EA7EE</field>
          </block>
        </value>
        <next>
          <block type="dynamic_if" id="_V]oQWGRjSIT9Bi5)bnv">
            <value name="IF0">
              <block type="xrpl_tx_command" id="r(#2Wl2.=.gT?k[9Ch)2">
                <field name="VAR" id="LSjNV)z/ozI_7F|ntY{A">transaction</field>
                <value name="CLIENT">
                  <block type="variables_get" id="}3uNy?l?6w=3eLw4\`:SQ">
                    <field name="VAR" id="kDLr-FS(n4n(\`vJ2c9#$">xrplClient</field>
                  </block>
                </value>
                <value name="HASH">
                  <block type="variables_get" id="66hU,ufPD?9P,9Q739=}">
                    <field name="VAR" id="]Noe}fF6/C5P8A{2$m~6">transactionHash</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="dynamic_if" id="V?YV03YrwQ0)ks]h+$b-">
                <value name="IF0">
                  <block type="xrpl_read_txn_info" id="mu%aZtLf442Tdp}0H}zR">
                    <field name="TYPE_VAR" id="V|9D3)Jg@[SNY=:1*57o">transactionType</field>
                    <field name="ACCOUNT_VAR" id="$F;Acx^Tl;0FeJ\`tBI(z">account</field>
                    <field name="INDEX_VAR" id="lKc/v\`weu]x|QzZY%czN">ledgerIndex</field>
                    <field name="HASH_VAR" id=":5?1N~|AcY;T\`R_lm$b(">hash</field>
                    <field name="AMOUNT_DATE" id="xWg\`}7GJ$AR,I7(1B-hX">date</field>
                    <value name="TRANSACTION_JSON">
                      <block type="variables_get" id="C]VQ]\`:ML+Nu!ge[Vq6N">
                        <field name="VAR" id="LSjNV)z/ozI_7F|ntY{A">transaction</field>
                      </block>
                    </value>
                  </block>
                </value>
                <statement name="DO0">
                  <block type="dynamic_if" id=",lF!HB!8{f=z!eQ()Osr">
                    <value name="IF0">
                      <block type="logic_compare" id="i5DTByAuT,%RFycw./#t">
                        <field name="OP">EQ</field>
                        <value name="A">
                          <block type="variables_get" id="5LwKNMzYnzGwJ,3\`EV6D">
                            <field name="VAR" id="V|9D3)Jg@[SNY=:1*57o">transactionType</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="xrpl_txn_type_select" id="BzpQ4fEwA/il!W/3O\`LM">
                            <field name="TRANSACTION_TYPE">OfferCreate</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <statement name="DO0">
                      <block type="dynamic_if" id="f:RE$!9dwz*t|7xsQ^}?">
                        <mutation else="1"></mutation>
                        <value name="IF0">
                          <block type="xrpl_extract_offer_create_txn" id="o(e*MZ?dh3(p9_F/e7g2">
                            <field name="VAR" id="sY,z!:\`96U)fU(2UB8Fg">extractedData</field>
                            <value name="TRANSACTION_JSON">
                              <block type="variables_get" id="e2LFj(o$0PK~5m:xeloR">
                                <field name="VAR" id="LSjNV)z/ozI_7F|ntY{A">transaction</field>
                              </block>
                            </value>
                            <value name="ACCOUNT_ADDRESS">
                              <block type="variables_get" id="3qMMJ{mRo-PtgwCAKVoD">
                                <field name="VAR" id="$F;Acx^Tl;0FeJ\`tBI(z">account</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <statement name="DO0">
                          <block type="text_print" id="r]Y+^au*y)+T.S;T^{_Q">
                            <value name="TEXT">
                              <block type="json_to_text" id="KyCLGTQP^m*h2DNs0v(5">
                                <value name="JSON">
                                  <block type="variables_get" id="^;R]Cr)|-YKcZ.c.d_gx">
                                    <field name="VAR" id="sY,z!:\`96U)fU(2UB8Fg">extractedData</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <next>
                              <block type="text_print" id="Jx~.,l)/}%aH*J{H5yLS">
                                <value name="TEXT">
                                  <block type="text" id="6y1WA4FJ@6E1@JYFyw5d">
                                    <field name="TEXT">-----------------------------------</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="text_print" id="zNzWAt\`?I)9@7m[0Dhjq">
                                    <value name="TEXT">
                                      <block type="dynamic_text_join" id="v6W|y)2DJe;5(?Q=)kRF">
                                        <mutation items="2"></mutation>
                                        <value name="ADD0">
                                          <block type="text" id="%@PVn/?7@8Iouf{c,Z,8">
                                            <field name="TEXT">Pay offer : </field>
                                          </block>
                                        </value>
                                        <value name="ADD1">
                                          <block type="json_get_value" id="D(HqK?F=i)iV^mm1_1M4">
                                            <value name="VAR">
                                              <block type="json_get_value" id="\`A4+i3ncHEP5$F$,nLqu">
                                                <value name="VAR">
                                                  <block type="variables_get" id=".ZyM*bZbwQOI]q\`+N=0!">
                                                    <field name="VAR" id="sY,z!:\`96U)fU(2UB8Fg">extractedData</field>
                                                  </block>
                                                </value>
                                                <value name="KEY">
                                                  <block type="text" id=")RcY04!(?$T%BuB0MDbo">
                                                    <field name="TEXT">AmountPayOffer</field>
                                                  </block>
                                                </value>
                                              </block>
                                            </value>
                                            <value name="KEY">
                                              <block type="text" id="P}qKP905L:Wac?Vy9=o}">
                                                <field name="TEXT">value</field>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="text_print" id="oV8qv:(k4cK,6Cyosu?[">
                                        <value name="TEXT">
                                          <block type="dynamic_text_join" id="cDN~4nLk[MpY,dsp0vED">
                                            <mutation items="2"></mutation>
                                            <value name="ADD0">
                                              <block type="text" id="i-x{@7.SH|mFYF~FE)w]">
                                                <field name="TEXT">Payed : </field>
                                              </block>
                                            </value>
                                            <value name="ADD1">
                                              <block type="json_get_value" id="B[@kKB,d,pPNx^/)O0_x">
                                                <value name="VAR">
                                                  <block type="json_get_value" id="H!ItuT9i!}xms}!-,NVO">
                                                    <value name="VAR">
                                                      <block type="variables_get" id="6,6zb_8iRdz+bBovY{m*">
                                                        <field name="VAR" id="sY,z!:\`96U)fU(2UB8Fg">extractedData</field>
                                                      </block>
                                                    </value>
                                                    <value name="KEY">
                                                      <block type="text" id="[BFpnz\`l;TD2Oe{5\`kUC">
                                                        <field name="TEXT">AmountPaid</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <value name="KEY">
                                                  <block type="text" id="ROK$:#_6bD#}8Fm?Z~*x">
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
                        </statement>
                        <statement name="ELSE">
                          <block type="text_print" id="!0h8)zjKkEw9%L@!N9aY">
                            <value name="TEXT">
                              <block type="text" id="rp,AMV8RcCzQtr/o*,_a">
                                <field name="TEXT">Failed to parse</field>
                              </block>
                            </value>
                          </block>
                        </statement>
                      </block>
                    </statement>
                  </block>
                </statement>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </next>
  </block>
    `,
    title: "Extract and Print XRPL Transaction",
    description: "A template for initializing an XRPL client, fetching a transaction using a hash, extracting transaction information, and processing offer create transactions. The block sequence demonstrates connecting to the XRPL network, retrieving transaction details, and parsing specific transaction types for further analysis or actions.",
    categories: ["template","xrpl"]
  },
  {
    height: 750,
    block:`
      <variables>
        <variable id="SCCBolVb[Z4Zs:Utl96W">exchanges</variable>
        <variable id="~_b6iJcgV_ym.fFIk9j5">xrplClient</variable>
        <variable id="ES0/)T6)?BE|qSt%jewk">transactionInfo</variable>
      </variables>
      <block type="variables_set" id="0U*6zc~k~P1S!6,+!{u!" x="0" y="0">
        <field name="VAR" id="SCCBolVb[Z4Zs:Utl96W">exchanges</field>
        <value name="VALUE">
          <block type="dynamic_list_create" id=",~,a2_WbB:UKc:.RMoEL">
            <mutation items="9"></mutation>
            <value name="ADD0">
              <block type="xrpl_exchange_address" id="C\`ff,w$#C.KhgX%=x]X9">
                <field name="ADDRESS">rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="xrpl_exchange_address" id="Pz%_mV_j_SS!G.X[OnE6">
                <field name="ADDRESS">rLbKbPyuvs4wc1h13BEPHgbFGsRXMeFGL6</field>
              </block>
            </value>
            <value name="ADD2">
              <block type="xrpl_exchange_address" id="1$Dg(rQec5nN$)eB{K@x">
                <field name="ADDRESS">raLPjTYeGezfdb6crXZzcC8RkLBEwbBHJ5</field>
              </block>
            </value>
            <value name="ADD3">
              <block type="xrpl_exchange_address" id="D7n+Y09EoRCdlptl(i\`#">
                <field name="ADDRESS">rhUYLd2aUiUVYkBZYwTc5RYgCAbNHAwkeZ</field>
              </block>
            </value>
            <value name="ADD4">
              <block type="xrpl_exchange_address" id="DoharXE_6Zmg78lVRNUx">
                <field name="ADDRESS">rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w</field>
              </block>
            </value>
            <value name="ADD5">
              <block type="xrpl_exchange_address" id="B5;j{x/)_mH8n%s6}[xY">
                <field name="ADDRESS">rNQEMJA4PsoSrZRn9J6RajAYhcDzzhf8ok</field>
              </block>
            </value>
            <value name="ADD6">
              <block type="xrpl_exchange_address" id="x0X@nlxRv(^+uSlYJsmM">
                <field name="ADDRESS">rGDreBvnHrX1get7na3J4oowN19ny4GzFn</field>
              </block>
            </value>
            <value name="ADD7">
              <block type="xrpl_exchange_address" id="X-0;4,7x4a=58%85oCl?">
                <field name="ADDRESS">rUzWJkXyEtT8ekSSxkBYPqCvHpngcy6Fks</field>
              </block>
            </value>
            <value name="ADD8">
              <block type="xrpl_exchange_address" id="zrxz,nF,.@:Y{l0qQcIs">
                <field name="ADDRESS">rBg33rYWkR9G2jDKZKmCsGd1wZrGoL83Lb</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="xrpl_client_initialize" id="QF9@!2dA)Z8=f%C_QKL9">
            <field name="VAR" id="~_b6iJcgV_ym.fFIk9j5">xrplClient</field>
            <value name="SERVER">
              <block type="xrpl_network_wss_selection" id="6MjF0aai[X_)@BZ@D5tL">
                <field name="NETWORK_TYPE">xrpl</field>
                <field name="CONNECTION">wss://xrpl.ws</field>
              </block>
            </value>
            <next>
              <block type="xrpl_subscribe_account_txn" id="tJM*;^\`t~)2/1!az$a}-">
                <field name="VAR" id="ES0/)T6)?BE|qSt%jewk">transactionInfo</field>
                <value name="CLIENT">
                  <block type="variables_get" id="=.uSa8RDkfWc[hn)c2I/">
                    <field name="VAR" id="~_b6iJcgV_ym.fFIk9j5">xrplClient</field>
                  </block>
                </value>
                <value name="ID">
                  <block type="text" id="szuZMkYM4uzjqaTJ)TP)">
                    <field name="TEXT">subscribe1</field>
                  </block>
                </value>
                <value name="ACCOUNTS">
                  <block type="variables_get" id="WFC]7N.d]iULGSj[Z=Q\`">
                    <field name="VAR" id="SCCBolVb[Z4Zs:Utl96W">exchanges</field>
                  </block>
                </value>
                <next>
                  <block type="controls_whileUntil" id=".goz/:DUKv3$N#wyc!7^">
                    <field name="MODE">WHILE</field>
                    <value name="BOOL">
                      <block type="logic_compare" id="/tDZJ0#]DQ9qV9(+v:K#">
                        <field name="OP">EQ</field>
                        <value name="A">
                          <block type="variables_get" id="7q;.NR?NHG,x}Wj,;td$">
                            <field name="VAR" id="ES0/)T6)?BE|qSt%jewk">transactionInfo</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="undefined" id="biK*Nb-*$UaN3)Fx9f:{"></block>
                        </value>
                      </block>
                    </value>
                    <statement name="DO">
                      <block type="text_print" id="dfCufoqj=ubK),-q(.pu">
                        <value name="TEXT">
                          <block type="text" id="b.pW%!6k-_;:q$Fj/NZs">
                            <field name="TEXT">polling...</field>
                          </block>
                        </value>
                        <next>
                          <block type="wait_seconds" id="Lh.z4b(E!=.#:geLI,zJ">
                            <value name="TIME">
                              <block type="math_number" id="*@[7MGd/A22fF=Yp2!}#">
                                <field name="NUM">5</field>
                              </block>
                            </value>
                          </block>
                        </next>
                      </block>
                    </statement>
                    <next>
                      <block type="text_print" id="OOffWonov3bE(k#S#Z%k">
                        <value name="TEXT">
                          <block type="text" id="YLN{nC/X2wfAh!|SkI+=">
                            <field name="TEXT">---------------------------</field>
                          </block>
                        </value>
                        <next>
                          <block type="text_print" id="Rfgc=Ue;|3Gde_A]52eC">
                            <value name="TEXT">
                              <block type="json_to_text" id="lnpv!x)vY|tIY.:m7u!T">
                                <value name="JSON">
                                  <block type="variables_get" id="m!eZ?8Q6RVJCn9L?p9[1">
                                    <field name="VAR" id="ES0/)T6)?BE|qSt%jewk">transactionInfo</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <next>
                              <block type="text_print" id="2h;-~5m;)_|HUDvqv~/y">
                                <value name="TEXT">
                                  <block type="text" id="aj2ThljKy~,{}wTAjR]2">
                                    <field name="TEXT">---------------------------</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="xrpl_unsubscribe_account_txn" id="-rK?aF\`hW8;u^MsOVDVo">
                                    <value name="CLIENT">
                                      <block type="variables_get" id="+bA%y^)n7n#z3i@QZZN;">
                                        <field name="VAR" id="~_b6iJcgV_ym.fFIk9j5">xrplClient</field>
                                      </block>
                                    </value>
                                    <value name="ID">
                                      <block type="text" id="9,v!Gt|]0k}#|~Y=\`9!B">
                                        <field name="TEXT">subscribe1</field>
                                      </block>
                                    </value>
                                    <value name="ACCOUNTS">
                                      <block type="variables_get" id="%n7WmrCN=;1*;DAJC@;u">
                                        <field name="VAR" id="SCCBolVb[Z4Zs:Utl96W">exchanges</field>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="text_print" id="oj;?yw-~[6m+j[SX}nz!">
                                        <value name="TEXT">
                                          <block type="text" id="2Oq}EXBoFAzYkg{w;yV8">
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
  /*
  {
    height: 135,
    block:`
      <variables>
        <variable id="7NXq!4WpNW5XTiN(Uuo{">faucetInfo</variable>
      </variables>
      <block type="xrpl_request_custom_faucet" id=":=JLQVa1*F#y98#Qd}*U" x="0" y="0">
        <field name="VAR" id="7NXq!4WpNW5XTiN(Uuo{">faucetInfo</field>
        <value name="CONNECTION">
        <block type="xrpl_network_wss_selection" id="N|OOQqSY4k]V~[J#q7]^">
          <field name="NETWORK_TYPE">xrpl</field>
          <field name="CONNECTION">wss://s.altnet.rippletest.net:51233</field>
        </block>
        </value>
        <value name="AMOUNT">
        <block type="math_number" id="aSVL8.h^2+G4DUuM]r|H">
          <field name="NUM">1000</field>
        </block>
        </value>
      </block>
    `,
    title: "XRPL Faucet Request Example",
    description: "Request funds from the XRPL faucet using the selected network and specified amount.",
    categories: ["template","xrpl"]
  }
  */
];

export const xaman_blocks = [
  {
      height: 80,
      block: `
        <block type="xaman_simple_login" x="0" y="0"></block>
      `,
      title: "Xaman Simple Login",
      description: "Perform a simple login to the Xaman system.",
      categories: ["xaman"]
  },
  {
      height: 50,
      block: `
        <block type="xaman_simple_logout" x="0" y="0"></block>
      `,
      title: "Xaman Simple Logout",
      description: "Perform a simple logout from the Xaman system.",
      categories: ["xaman"]
  },
  {
      height: 200,
      block: `
        <block type="xaman_payment" x="0" y="0"></block>
      `,
      title: "Xaman Payment",
      description: "Process a payment using the Xaman system.",
      categories: ["xaman"]
  },
  {
      height: 80,
      block: `
        <block type="xaman_wait_for_signature" x="0" y="0"></block>
      `,
      title: "Xaman Wait for Signature",
      description: "Wait for a signature in the Xaman system.",
      categories: ["xaman"]
  },
  {
    height: 23.5,
    block: `
      <block type="xaman_variable_name" x="0" y="0"></block>
    `,
    title: "Xaman Store Key",
    description: "Input a name for Xaman Variable (at least 3 characters, a-z0-9). This name is used for storing and retrieving data.",
    categories: ["xaman"]
  },
  {
    height: 98.5,
    block: `
      <block type="xaman_variable_set" x="0" y="0"></block>
    `,
    title: "Xaman Set Variable",
    description: "Save user data in Xaman with the specified name. The data is saved as a text.",
    categories: ["xaman"]
  },
  {
    height: 47.5,
    block: `
      <block type="xaman_variable_get" x="0" y="0"></block>
    `,
    title: "Xaman Get Variable",
    description: "Retrieve user data from Xaman with the specified name. The data is returned as a text.",
    categories: ["xaman"]
  },
  {
    height: 194,
    block: `
    <variables>
      <variable id="f*RJqcwAmU1=-p;r7jyF">userInfo</variable>
      <variable id="eTrPHu/(@J.;k2!Gdk2t">status</variable>
      <variable id="Zq,w{khu7aT$#4e4Ug1V">data</variable>
    </variables>
    <block type="xaman_simple_login" id="f-c+ed2:I0374,5%4m@K" x="0" y="0">
      <field name="VAR" id="f*RJqcwAmU1=-p;r7jyF">userInfo</field>
      <next>
        <block type="xaman_variable_set" id="7s9Ib[.,!hW)^8w-U=]8">
          <field name="STATUS" id="eTrPHu/(@J.;k2!Gdk2t">status</field>
          <value name="DATA">
            <block type="text" id="Tlb$uk_zd2oV0pcq$Xr{">
              <field name="TEXT">Value1</field>
            </block>
          </value>
          <value name="KEY">
            <block type="xaman_variable_name" id="Ck90G#D51q.U~\`6J|VN{">
              <field name="KEY">name1</field>
            </block>
          </value>
          <next>
            <block type="text_print" id="2b#k)S:*:Z?{OqAy)$Bp">
              <value name="TEXT">
                <block type="xaman_variable_get" id="byP+z,.C24TKMJLYB@x0">
                  <value name="KEY">
                    <block type="xaman_variable_name" id="Be9rEjKge/euNP$%JZeV">
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
    <variables>
      <variable id="iFdY8EIySLEsg3B#+Kt6">faucetInfo</variable>
      <variable id="_fnZ#%D$iVPeh,vm[fqp">userInfo</variable>
      <variable id="9/U)[:oS\`7#x2Mra]5Tu">payloadID</variable>
      <variable id="h!l]-UQ|^nDpMUxd*|7G">error</variable>
    </variables>
    <block type="xrpl_request_custom_faucet" id=",c#Q(9RsUi{$IzA=^Jd}" x="0" y="0">
      <field name="VAR" id="iFdY8EIySLEsg3B#+Kt6">faucetInfo</field>
      <value name="CONNECTION">
        <block type="xrpl_network_wss_selection" id="h0okwSp;l9/?R{=a-h]p">
          <field name="NETWORK_TYPE">xrpl</field>
          <field name="CONNECTION">wss://s.altnet.rippletest.net:51233</field>
        </block>
      </value>
      <value name="AMOUNT">
        <block type="math_number" id="Jt%wEGZbte_4@wPA-93D">
          <field name="NUM">100</field>
        </block>
      </value>
      <next>
        <block type="text_print" id="xqy.!?,5P8m@m?[on-sG">
          <value name="TEXT">
            <block type="json_to_text" id="A94tzQoma}2Hj|wg|:c=">
              <value name="JSON">
                <block type="variables_get" id="{.)z+[CWn--T)=Sxq$:Q">
                  <field name="VAR" id="iFdY8EIySLEsg3B#+Kt6">faucetInfo</field>
                </block>
              </value>
            </block>
          </value>
          <next>
            <block type="xaman_simple_login" id="Gz.V4*|xi#oV}Y_~}qSg">
              <field name="VAR" id="_fnZ#%D$iVPeh,vm[fqp">userInfo</field>
              <next>
                <block type="xaman_payment" id="\`tbLE=kevs{~qXQucG,E">
                  <field name="VAR" id="9/U)[:oS\`7#x2Mra]5Tu">payloadID</field>
                  <field name="ERROR_VAR" id="h!l]-UQ|^nDpMUxd*|7G">error</field>
                  <value name="DESTINATION">
                    <block type="json_get_value" id="y8_lzp}Gd@9fXAQzyPxR">
                      <value name="VAR">
                        <block type="variables_get" id="Oj!dMl!A8d%F18b^B|I0">
                          <field name="VAR" id="iFdY8EIySLEsg3B#+Kt6">faucetInfo</field>
                        </block>
                      </value>
                      <value name="KEY">
                        <block type="text" id="NA$WA5w)LHRS3uFm6UqQ">
                          <field name="TEXT">address</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <value name="AMOUNT">
                    <block type="xrpl_xrp_to_drops" id="{6tW8_ogd8^hDxgdVLU[">
                      <value name="AMOUNT">
                        <block type="math_number" id="Sew^/j3d[mm]6bm_m~3J">
                          <field name="NUM">0.1</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <value name="MEMO">
                    <block type="text" id="X%MHhKv=FbJ=[j~+w{.C">
                      <field name="TEXT">null pay</field>
                    </block>
                  </value>
                  <next>
                    <block type="xaman_wait_for_signature" id="ARObe.dNi$fXz84:Tbx/">
                      <value name="PAYLOAD">
                        <block type="variables_get" id="J)?Vpb;(;vN.BZ9bLxa5">
                          <field name="VAR" id="9/U)[:oS\`7#x2Mra]5Tu">payloadID</field>
                        </block>
                      </value>
                      <next>
                        <block type="xaman_simple_logout" id="hqG\`GX4B/[A\`%YEU?QN("></block>
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
];

export const text_blocks = [
  {
      height: 50,
      block: `
        <block type="text" x="0" y="0"></block>
      `,
      title: "Text",
      description: "Define a text string.",
      categories: ["text"]
  },
  {
    height: 50,
    block: `
      <block type="text_print" x="0" y="0"></block>
    `,
    title: "Print Text",
    description: "Print text to the console.",
    categories: ["text"]
  },
  {
    height: 50,
    block: `
      <block type="text_util_inspect_print" x="0" y="0"></block>
    `,
    title: "Inspect and Print",
    description: "Inspect an object and print its structure to the console.",
    categories: ["text"]
  },
  {
      height: 70,
      block: `
        <block type="dynamic_text_join" x="0" y="0"></block>
      `,
      title: "Join Text",
      description: "Join multiple text strings together.",
      categories: ["text"]
  },
  {
      height: 50,
      block: `
        <block type="text_length" x="0" y="0"></block>
      `,
      title: "Text Length",
      description: "Get the length of a text string.",
      categories: ["text"]
  },
  {
      height: 50,
      block: `
        <block type="text_isEmpty" x="0" y="0"></block>
      `,
      title: "Text Is Empty",
      description: "Check if a text string is empty.",
      categories: ["text"]
  },
  {
      height: 50,
      block: `
        <block type="number_to_text" x="0" y="0"></block>
      `,
      title: "Number to Text",
      description: "Convert a number to a text string.",
      categories: ["text"]
  },
  {
      height: 50,
      block: `
        <block type="text_to_number" x="0" y="0"></block>
      `,
      title: "Text to Number",
      description: "Convert a text string to a number.",
      categories: ["text"]
  },
  {
      height: 50,
      block: `
        <block type="text_starts_with" x="0" y="0"></block>
      `,
      title: "Starts With",
      description: "Checks if a text string starts with a specified prefix.",
      categories: ["text"]
  },
  {
    height: 50,
    block: `
      <block type="text_ends_with" x="0" y="0"></block>
    `,
    title: "Ends With",
    description: "Checks if a text string ends with a specified suffix.",
    categories: ["text"]
  },
  {
    height: 50,
    block: `
      <block type="text_to_uppercase" x="0" y="0"></block>
    `,
    title: "Upper Case",
    description: "Converts all the characters in a text string to uppercase.",
    categories: ["text"]
  },
  {
    height: 50,
    block: `
      <block type="text_to_lowercase" x="0" y="0"></block>
    `,
    title: "Lower Case",
    description: "Converts all the characters in a text string to lowercase.",
    categories: ["text"]
  },
  {
    height: 23.5,
    block: `
      <block type="text_onetime_block" x="0" y="0"></block>
    `,
    title: "Private Block",
    description: "Enter a one-time use string. The string will not be saved.",
    categories: ["text"]
  }
];

export const math_blocks = [
  {
      height: 50,
      block: `
        <block type="math_number" x="0" y="0"></block>
      `,
      title: "Number",
      description: "Define a number.",
      categories: ["math"]
  },
  {
      height: 50,
      block: `
        <block type="percentage" x="0" y="0"></block>
      `,
      title: "Percentage",
      description: "Calculate a percentage.",
      categories: ["math"]
  }
];

export const supabase_blocks = [
  {
    height: 98.5,
    block: `
      <block type="supabase_create_client" x="0" y="0"></block>
    `,
    title: "Initialize Supabase Client",
    description: "This block initializes a Supabase client using the provided URL and Anon key. The client is used to interact with the Supabase backend services. Ensure to save the client instance to a variable for further operations.",
    categories: ["supabase"]
  },
  {
    height: 194.5,
    block: `
      <block type="supabase_select" x="0" y="0"></block>
    `,
    title: "Supabase Select",
    description: "This block performs a SELECT query on the specified Supabase table. You can specify the columns to retrieve, apply various conditions for filtering the results, and output the selected data to a variable. It supports conditions like equal to, greater than, less than, and more.",
    categories: ["supabase"]
  },
  {
    height: 123,
    block: `
      <block type="supabase_insert" x="0" y="0"></block>
    `,
    title: "Supabase Insert",
    description: "This block inserts data into the specified Supabase table. The data must be provided in JSON format. Ensure the data matches the table schema to avoid errors. You can handle any errors by outputting them to a variable.",
    categories: ["supabase"]
  },
  {
    height: 194.5,
    block: `
      <block type="supabase_update" x="0" y="0"></block>
    `,
    title: "Supabase Update",
    description: "This block updates data in the specified Supabase table based on the given filter conditions. The data to update must be in JSON format. Various conditions like equal to, greater than, and less than can be applied to filter the rows that need to be updated.",
    categories: ["supabase"]
  },
  {
    height: 170.5,
    block: `
      <block type="supabase_delete" x="0" y="0"></block>
    `,
    title: "Supabase Delete",
    description: "This block deletes data from the specified Supabase table based on the provided filter conditions. Conditions like equal to, greater than, and less than can be applied to specify which rows to delete. Errors during the delete operation can be captured in a variable.",
    categories: ["supabase"]
  },
  {
    height: 50,
    block: `
      <block type="supabase_text_to_json" x="0" y="0"></block>
    `,
    title: "Text to JSON",
    description: "This block converts plain text to a JSON object. It is useful for preparing data before inserting or updating it in the Supabase database. The JSON object can be used in subsequent database operations.",
    categories: ["supabase"]
  },
];

export const table_blocks = [
  {
    height: 25,
    block: `
      <block type="table_empty" x="0" y="0"></block>
    `,
    title: "Create Empty Table",
    description: "This block initializes an empty table. It can be used as a starting point for creating and manipulating tables in your project.",
    categories: ["table"]
  },
  {
      height: 25,
      block: `
        <block type="table_load_csv" x="0" y="0"></block>
      `,
    title: "Load CSV",
    description: "This block loads data from a CSV file into a table. Use this block to import CSV data for analysis and manipulation within your project.",
    categories: ["table"]
  },
  {
    height: 48,
    block: `
      <block type="csv_to_table" x="0" y="0"></block>
    `,
    title: "Convert CSV to Table",
    description: "This block converts a CSV formatted string into a table. It is useful for transforming raw CSV data into a structured table format for further processing.",
    categories: ["table"]
  },
  {
    height: 100,
    block: `
      <block type="table_get_row" x="0" y="0"></block>
    `,
    title: "Table Row",
    description: "This block retrieves a row from a specified table. Use it to access and manipulate individual rows of data within your table.",
    categories: ["table"]
  },
  {
    height: 100,
    block: `
      <block type="table_get_column" x="0" y="0"></block>
    `,
    title: "Table Column",
    description: "This block retrieves a column from a specified table. Use it to access and manipulate individual columns of data within your table.",
    categories: ["table"]
  },
  {
    height: 23.5,
    block: `
      <block type="table_row_count" x="0" y="0"></block>
    `,
    title: "Row Count of Table",
    description: "This block returns the number of rows in the specified table.",
    categories: ["table"]
  },
  {
    height: 100,
    block: `
      <block type="table_add_row" x="0" y="0"></block>
    `,
    title: "Add Row to Table",
    description: "This block adds a new row to a specified table. Use it to append new data entries to your table.",
    categories: ["table"]
  },
  {
    height: 75,
    block: `
      <block type="table_csv_save" x="0" y="0"></block>
    `,
    title: "Save Table to CSV",
    description: "This block saves a table to a CSV file. Use it to export your table data into a CSV file for external use or backup.",
    categories: ["table"]
  },
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
  {
    height: 471,
    block: `
    <variables>
      <variable id="q.hZdolqKqT?:^6~O,[%">wallets</variable>
      <variable id="Q@U=mDF62Q=nEa(6(9Sj">i</variable>
      <variable id="YOSm)NsKAOYz[s9.5H5,">walletInfo</variable>
    </variables>
    <block type="variables_set" id="v(m.VQzRUr7XIc_(b.kl" x="0" y="0">
      <field name="VAR" id="q.hZdolqKqT?:^6~O,[%">wallets</field>
      <value name="VALUE">
        <block type="table_empty" id="3:2][p5HV+i^$oMhG}$0"></block>
      </value>
      <next>
        <block type="variables_set" id="||QV4rglE6}~|mtp%IjX">
          <field name="VAR" id="q.hZdolqKqT?:^6~O,[%">wallets</field>
          <value name="VALUE">
            <block type="table_add_row" id="mbEyrWICynSb%p*K:l;z">
              <value name="TABLE">
                <block type="variables_get" id="AA6mmyG2KHxPgV)0Qvs8">
                  <field name="VAR" id="q.hZdolqKqT?:^6~O,[%">wallets</field>
                </block>
              </value>
              <value name="ROW">
                <block type="dynamic_list_create" id="C%tyFR9IQp.-DhXYqa9o">
                  <mutation items="2"></mutation>
                  <value name="ADD0">
                    <block type="text" id="O,38!.V$?2BG+X^2HA($">
                      <field name="TEXT">address</field>
                    </block>
                  </value>
                  <value name="ADD1">
                    <block type="text" id="=3AY1I|,bO|/2ST-/ig6">
                      <field name="TEXT">secret</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
          </value>
          <next>
            <block type="control_run_speed" id="?o/cOV60o5.R;QIpD5P)">
              <field name="SPEED">1000</field>
              <next>
                <block type="controls_for" id="#zbNUAe-!fyD5(TMf.w7">
                  <field name="VAR" id="Q@U=mDF62Q=nEa(6(9Sj">i</field>
                  <value name="FROM">
                    <block type="math_number" id="rzng,;]S_A|Q\`O)v6pB)">
                      <field name="NUM">1</field>
                    </block>
                  </value>
                  <value name="TO">
                    <block type="math_number" id=".q}uVDo2GD$*lH5a-^ie">
                      <field name="NUM">100</field>
                    </block>
                  </value>
                  <value name="BY">
                    <block type="math_number" id="3HH\`ALFF](3bC^KRRWVk">
                      <field name="NUM">1</field>
                    </block>
                  </value>
                  <statement name="DO">
                    <block type="xrpl_create_account" id="]vw@V{#^T_aNGo;,V9wx">
                      <field name="VAR" id="YOSm)NsKAOYz[s9.5H5,">walletInfo</field>
                      <next>
                        <block type="variables_set" id="|#Z94{wAj6m\`Uz1R~N-f">
                          <field name="VAR" id="q.hZdolqKqT?:^6~O,[%">wallets</field>
                          <value name="VALUE">
                            <block type="table_add_row" id="EiAW4[~5DSl4h8]W96G=">
                              <value name="TABLE">
                                <block type="variables_get" id="PJly,659X9HC}_+qx@7R">
                                  <field name="VAR" id="q.hZdolqKqT?:^6~O,[%">wallets</field>
                                </block>
                              </value>
                              <value name="ROW">
                                <block type="dynamic_list_create" id="wLNvmiiH.VG33nWAACNA">
                                  <mutation items="2"></mutation>
                                  <value name="ADD0">
                                    <block type="json_get_value" id="MeC)$^:^zH3%rR=W)Seb">
                                      <value name="VAR">
                                        <block type="variables_get" id="72OxRs6\`#}GaQ/-t-S{B">
                                          <field name="VAR" id="YOSm)NsKAOYz[s9.5H5,">walletInfo</field>
                                        </block>
                                      </value>
                                      <value name="KEY">
                                        <block type="text" id="]1i2Y?yKx_Z^0sUsi$3U">
                                          <field name="TEXT">address</field>
                                        </block>
                                      </value>
                                    </block>
                                  </value>
                                  <value name="ADD1">
                                    <block type="json_get_value" id="^A^F+|~CBi~t:UviMm5O">
                                      <value name="VAR">
                                        <block type="variables_get" id="Zcvb7GD}hLN0w_3H:HpP">
                                          <field name="VAR" id="YOSm)NsKAOYz[s9.5H5,">walletInfo</field>
                                        </block>
                                      </value>
                                      <value name="KEY">
                                        <block type="text" id="MNVy*iqAOCB!Jui7_,L{">
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
                    <block type="table_csv_save" id="@y}Vb?d7/:1w/Ynf;]o\`">
                      <value name="TABLE">
                        <block type="variables_get" id=",uaOx\`Og71I,$3fWF2|q">
                          <field name="VAR" id="q.hZdolqKqT?:^6~O,[%">wallets</field>
                        </block>
                      </value>
                      <value name="FILENAME">
                        <block type="text" id="8Ra4x]+8jcLC]EW+$B_3">
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
    <variables>
      <variable id="2=71lVd$7rX]Qs(dBzvy">wallets</variable>
      <variable id="Ujm}94h(.OSmL%aNGTCo">secrets</variable>
      <variable id="ElY=y_c+SRB4UU!nMf(t">i</variable>
      <variable id="@}WJq[fy\`-m^WoiOK;5~">xrplWallet</variable>
    </variables>
    <block type="variables_set" id="5%;_y4)G|LPW5k,V1t.," x="0" y="0">
      <field name="VAR" id="2=71lVd$7rX]Qs(dBzvy">wallets</field>
      <value name="VALUE">
        <block type="csv_to_table" id="w,No7me$SL4jEtJ8,F#Q">
          <field name="EXCLUDE_HEADER">TRUE</field>
          <value name="TABLE_TEXT">
            <block type="table_load_csv" id="--zfX}}iWN*P7k:ra{wJ">
              <field name="TABLE">[["address","secret"],["rsKjFyyNgREkDJgdeFJXzZncZGcraS2S6S","sEd726vjZSmNRXTJwr5kNU93XFFHQdr"],["rnxMD5jvXeLBrXiB152TNoLLM9XbSnpU7W","sEdSCJLgYC6YUrCFKxw9NcsYMo9Uhsh"],["rhuBFRAk5HqZ7byUBNEfnuqdn4NKHDebiV","sEdT21U5cwxQ6QEm8sASP1tyG5vvXds"],["rJF8aaomvQGq2T6gHUjQuJ4oz9oj8C343n","sEdTMjkmMCH6rN4yZecyydxE9CkWfX9"],["rNsPzis1sQxFbeN9YCygtR9KwfCWhWpPTX","sEdSu3nJAEwKhvVaMehMfLsLMpNGwnf"],["rLuWa9RCax9RSXqw7jY1oW3htvhQa8e15L","sEd7fFVh4FDUtWhQm5uZPfbXH1fsrPE"],["rGB9sa9eD5Zf8dX2wGtutpnoPc7He4zDWk","sEd7XDtA5YM45wWyUfUJsE3KNfiT2zk"],["rEnxAPwrtTNbQhCZrL3AVhesqEz7JBXJ7p","sEdSzc3QYe8j4HqsqtbNjnuBn2ojMex"],["rpDCKq7hrhBjfv7r9b9RuVo43H7oukSuzU","sEdT1MGBPYKQFcip354DTm8yGXvnuzS"],["rEEY86aP7oWRYxdJARTZ8WatDRW8anNg9V","sEd7tni4WeGvUzhALxYT3J1yRBSVu1u"],["rnGPTNin6qrnXyXk8w6rMZCcCtoyi1R1dC","sEdVMxKPQAnqNmrDRcPXePZUTtihVw3"]]</field>
            </block>
          </value>
        </block>
      </value>
      <next>
        <block type="variables_set" id="ji4v\`aii?uOvMui\`($P%">
          <field name="VAR" id="Ujm}94h(.OSmL%aNGTCo">secrets</field>
          <value name="VALUE">
            <block type="table_get_column" id="|E]]E7q3)o#el(4Z8keq">
              <value name="TABLE">
                <block type="variables_get" id="_s@eek^I{6Bm!xEQphhm">
                  <field name="VAR" id="2=71lVd$7rX]Qs(dBzvy">wallets</field>
                </block>
              </value>
              <value name="COLUMN">
                <block type="math_number" id="HdCY}H+TG%)bfSoEmAHp">
                  <field name="NUM">2</field>
                </block>
              </value>
            </block>
          </value>
          <next>
            <block type="control_run_speed" id="k.Y\`d5h{W%F.yC|v*FC]">
              <field name="SPEED">1000</field>
              <next>
                <block type="controls_forEach" id="/%z-=#~%0Ch]sk0(a#p=">
                  <field name="VAR" id="ElY=y_c+SRB4UU!nMf(t">i</field>
                  <value name="LIST">
                    <block type="variables_get" id="h1Sf#jsS\`TYS-~3yJ]XB">
                      <field name="VAR" id="Ujm}94h(.OSmL%aNGTCo">secrets</field>
                    </block>
                  </value>
                  <statement name="DO">
                    <block type="text_print" id="%+JakUJQgJ)|_[~]3QWT">
                      <value name="TEXT">
                        <block type="variables_get" id="!0%luMK62I)2{AP?1\`%w">
                          <field name="VAR" id="ElY=y_c+SRB4UU!nMf(t">i</field>
                        </block>
                      </value>
                      <next>
                        <block type="xrpl_load_wallet" id="bQd%bB#g{sG,lCf\`||5S">
                          <field name="VAR" id="@}WJq[fy\`-m^WoiOK;5~">xrplWallet</field>
                          <value name="SEED">
                            <block type="variables_get" id="04uz+4fLy1juSr.EM+l1">
                              <field name="VAR" id="ElY=y_c+SRB4UU!nMf(t">i</field>
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
];

export const control_blocks = [
  {
      height: 50,
      block: `
        <block type="wait_seconds" x="0" y="0"></block>
      `,
      title: "Wait Seconds",
      description: "Wait for a specified number of seconds.",
      categories: ["control"]
  },
  {
    height: 50,
    block: `
      <block type="control_run_speed" x="0" y="0"></block>
    `,
    title: "Run Speed",
    description: "Set the execution speed of the program. The value can range from 1 to 1000, with higher values resulting in faster execution speeds.",
    categories: ["control"]
  },
];

export const time_blocks = [
  {
    height: 50,
    block: `
      <block type="current_datetime" x="0" y="0"></block>
    `,
    title: "Current DateTime",
    description: "Get the current date and time.",
    categories: ["time"]
  },
  {
    height: 100,
    block: `
      <block type="create_datetime" x="0" y="0"></block>
    `,
    title: "Create DateTime",
    description: "Create a date and time.",
    categories: ["time"]
  },
  {
    height: 100,
    block: `
      <block type="datetime_to_text" x="0" y="0"></block>
    `,
    title: "DateTime to Text",
    description: "Convert a date and time to text.",
    categories: ["time"]
  },
  {
    height: 50,
    block: `
      <block type="adjust_datetime" x="0" y="0"></block>
    `,
    title: "Adjust DateTime",
    description: "Adjust a date and time by a specified amount.",
    categories: ["time"]
  },
  {
    height: 50,
    block: `
      <block type="datetime_text_format" x="0" y="0"></block>
    `,
    title: "DateTime Text Format",
    description: "Format a date and time as text.",
    categories: ["time"]
  },
  {
    height: 50,
    block: `
      <block type="timezone_block" x="0" y="0"></block>
    `,
    title: "Timezone",
    description: "Set the timezone for date and time operations.",
    categories: ["time"]
  },
  {
    height: 50,
    block: `
      <block type="compare_datetime" x="0" y="0"></block>
    `,
    title: "Compare DateTime",
    description: "Compare two dates and times.",
    categories: ["time"]
  }
];

export const json_blocks = [
  {
    height: 23.5,
    block: `
      <block type="json_text_block" x="0" y="0"></block>
    `,
    title: "Text to JSON",
    description: "Convert text to a JSON object.",
    categories: ["json"]
  },
  {
    height: 70,
    block: `
      <block type="json_get_value" x="0" y="0"></block>
    `,
    title: "JSON Get Value",
    description: "Get a value from a JSON object.",
    categories: ["json"]
  },
  {
    height: 50,
    block: `
      <block type="json_to_text" x="0" y="0"></block>
    `,
    title: "JSON to Text",
    description: "Convert a JSON object to text.",
    categories: ["json"]
  },
  {
    height: 50,
    block: `
      <block type="text_to_json" x="0" y="0"></block>
    `,
    title: "Text to JSON",
    description: "Convert text to a JSON object.",
    categories: ["json"]
  }
];

export const animation_blocks = [
  {
    height: 50,
    block: `
      <block type="confetti_animation" x="0" y="0"></block>
    `,
    title: "Confetti Animation",
    description: "Show a confetti animation.",
    categories: ["animation"]
  }
];

export const logic_blocks = [
  {
    height: 70,
    block: `
      <block type="dynamic_if" x="0" y="0"></block>
    `,
    title: "If Logic",
    description: "Create a conditional logic block.",
    categories: ["logic"]
  },
  {
    height: 50,
    block: `
      <block type="logic_compare" x="0" y="0"></block>
    `,
    title: "Logic Compare",
    description: "Compare two values.",
    categories: ["logic"]
  },
  {
    height: 50,
    block: `
      <block type="undefined" x="0" y="0"></block>
    `,
    title: "Undefined",
    description: "Returns the undefined value, used to indicate the absence of a value.",
    categories: ["logic"]
  },
  {
    height: 50,
    block: `
      <block type="null" x="0" y="0"></block>
    `,
    title: "Null",
    description: "Returns the null value, used to indicate the intentional absence of any object value.",
    categories: ["logic"]
  },
  {
    height: 50,
    block: `
      <block type="true" x="0" y="0"></block>
    `,
    title: "True",
    description: "Returns the boolean value true.",
    categories: ["logic"]
  },
  {
    height: 50,
    block: `
      <block type="false" x="0" y="0"></block>
    `,
    title: "False",
    description: "Returns the boolean value false.",
    categories: ["logic"]
  },
];

export const loop_blocks = [
  {
    height: 80,
    block: `
      <block type="controls_whileUntil" x="0" y="0"></block>
    `,
    title: "While/Until Loop",
    description: "Create a while or until loop.",
    categories: ["loop"]
  },
  {
    height: 80,
    block: `
      <block type="controls_for" x="0" y="0"></block>
    `,
    title: "For Loop",
    description: "Create a for loop.",
    categories: ["loop"]
  },
  {
    height: 80,
    block: `
      <block type="controls_forEach" x="0" y="0"></block>
    `,
    title: "ForEach Loop",
    description: "Create a for-each loop.",
    categories: ["loop"]
  }
];

export const lists_blocks = [
  {
    height: 50,
    block: `
      <block type="lists_create_empty" x="0" y="0"></block>
    `,
    title: "Create Empty List",
    description: "Create an empty list to store items.",
    categories: ["list"]
  },
  {
    height: 70,
    block: `
      <block type="array_append" x="0" y="0"></block>
    `,
    title: "Append to Array",
    description: "Append an item to an array.",
    categories: ["list"]
  },
  {
    height: 70,
    block: `
      <block type="dynamic_list_create" x="0" y="0"></block>
    `,
    title: "Create List",
    description: "Create a dynamic list.",
    categories: ["list"]
  },
  {
    height: 50,
    block: `
      <block type="lists_length" x="0" y="0"></block>
    `,
    title: "List Length",
    description: "Get the length of a list.",
    categories: ["list"]
  },
  {
    height: 50,
    block: `
      <block type="lists_isEmpty" x="0" y="0"></block>
    `,
    title: "List Is Empty",
    description: "Check if a list is empty.",
    categories: ["list"]
  },
  {
    height: 50,
    block: `
      <block type="lists_repeat" x="0" y="0"></block>
    `,
    title: "List Repeat",
    description: "Create a list with one item repeated a specified number of times.",
    categories: ["list"]
  },
  {
    height: 50,
    block: `
      <block type="lists_getIndex" x="0" y="0"></block>
    `,
    title: "List Get Index",
    description: "Retrieve an item at a specified position in a list.",
    categories: ["list"]
  },
  {
    height: 50,
    block: `
      <block type="lists_indexOf" x="0" y="0"></block>
    `,
    title: "List Index of",
    description: "Find the index of the first/last occurrence of an item in a list.",
    categories: ["list"]
  },
  {
    height: 50,
    block: `
      <block type="lists_sort" x="0" y="0"></block>
    `,
    title: "Sort List",
    description: "Sort a list.",
    categories: ["list"]
  }
];
