// @/blocks/BlockContents.tsx
export const xrpl_blocks = [
  {
    height: 54,
    block: `
      <block type="xrpl_create_account" x="0" y="0"></block>
    `,
    title: "XRPL Create Account",
    description: "Create a new XRPL account using the selected network.",
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
      <block type="xrpl_client_subscribe_account_transactions" x="0" y="0"></block>
    `,
    title: "Subscribe Transactions",
    description: "Subscribe to transactions for a specific XRPL account to receive real-time updates.",
    categories: ["xrpl"]
  },
  {
    height: 100,
    block: `
      <block type="xrpl_client_unsubscribe_account_transactions" x="0" y="0"></block>
    `,
    title: "Unsubscribe Transactions",
    description: "Unsubscribe from transactions for a specific XRPL account to stop receiving updates.",
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
    height: 123,
    block: `
      <block type="xrpl_easy_submit" x="0" y="0"></block>
    `,
    title: "XRPL Easy Submit",
    description: "Submit a transaction to the XRPL with autofill capability. Specify the XRPL client, wallet, and transaction. The transaction will be automatically filled with necessary details and the result will be stored in the specified variable.",
    categories: ["xrpl"]
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
              <block type="xrpl_client_subscribe_account_transactions" id="tJM*;^\`t~)2/1!az$a}-">
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
                                  <block type="xrpl_client_unsubscribe_account_transactions" id="-rK?aF\`hW8;u^MsOVDVo">
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
  }
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

export const table_blocks = [
  {
    height: 25,
    block: `
      <block type="table_empty" x="0" y="0"></block>
    `,
    title: "Table",
    description: "",
    categories: ["table"]
  },
  {
      height: 25,
      block: `
        <block type="table_input_csv" x="0" y="0"></block>
      `,
      title: "Table",
      description: "",
      categories: ["table"]
  },
  {
    height: 48,
    block: `
      <block type="csv_to_table" x="0" y="0"></block>
    `,
    title: "Table",
    description: "",
    categories: ["table"]
  },
  {
    height: 100,
    block: `
      <block type="table_get_row" x="0" y="0"></block>
    `,
    title: "Table",
    description: "",
    categories: ["table"]
  },
  {
    height: 100,
    block: `
      <block type="table_get_column" x="0" y="0"></block>
    `,
    title: "Table",
    description: "",
    categories: ["table"]
  },
  {
    height: 100,
    block: `
      <block type="table_add_row" x="0" y="0"></block>
    `,
    title: "Table",
    description: "",
    categories: ["table"]
  },
  {
    height: 75,
    block: `
      <block type="table_csv_save" x="0" y="0"></block>
    `,
    title: "Table CSV Save",
    description: "",
    categories: ["table"]
  },
  {
    height: 471,
    block: `
      <variables>
        <variable id="vHUKFaYWkuLipXA-eqRT">newTable</variable>
        <variable id="(lW_F+JQ3xijMjT(fNB_">i</variable>
        <variable id="45(Oig9he3qprkqRAy)?">walletInfo</variable>
        <variable id="JIchN7D{RHv1PS=h?t-b">newRow</variable>
      </variables>
      <block type="table_add_row" id="#f$80#FXI2]9*Vqdg::d" x="0" y="0">
        <field name="VAR" id="vHUKFaYWkuLipXA-eqRT">newTable</field>
        <value name="TABLE">
          <block type="table_empty" id="s5^+*^+v\`[%{\`ht#K0Mu"></block>
        </value>
        <value name="ROW">
          <block type="dynamic_list_create" id="h;,iQiw^_V0/(ty03QxF">
            <mutation items="2"></mutation>
            <value name="ADD0">
              <block type="text" id=".u_z(A[cb7}_!ODsdy/-">
                <field name="TEXT">address</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="text" id="dAv?_nEr2e#H.\`^i(yS=">
                <field name="TEXT">secret</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="controls_for" id="D!9D7xP2X9Io!YowjWiL">
            <field name="VAR" id="(lW_F+JQ3xijMjT(fNB_">i</field>
            <value name="FROM">
              <block type="math_number" id="(vH@P?}.pah|j6/Upfo4">
                <field name="NUM">0</field>
              </block>
            </value>
            <value name="TO">
              <block type="math_number" id="Gli:*FqvnGWo!y=50[)p">
                <field name="NUM">10</field>
              </block>
            </value>
            <value name="BY">
              <block type="math_number" id="pV*74{s(6h6xQ#7CY{4u">
                <field name="NUM">1</field>
              </block>
            </value>
            <statement name="DO">
              <block type="xrpl_create_account" id="4p,Nq[,|$R]$6n=RxJcw">
                <field name="VAR" id="45(Oig9he3qprkqRAy)?">walletInfo</field>
                <next>
                  <block type="variables_set" id="{sAp6b^Sig1FH^Zbmvxi">
                    <field name="VAR" id="JIchN7D{RHv1PS=h?t-b">newRow</field>
                    <value name="VALUE">
                      <block type="dynamic_list_create" id="UR;?\`q$$%=;NQ~DifS8G">
                        <mutation items="2"></mutation>
                        <value name="ADD0">
                          <block type="json_get_value" id="+oPFp*mxG;7[SPp(%iq-">
                            <value name="VAR">
                              <block type="variables_get" id="xg5GJmzKG{lmX(0tag2h">
                                <field name="VAR" id="45(Oig9he3qprkqRAy)?">walletInfo</field>
                              </block>
                            </value>
                            <value name="KEY">
                              <block type="text" id="lI@3Y{p-5;2a9Aa.NrB$">
                                <field name="TEXT">address</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <value name="ADD1">
                          <block type="json_get_value" id="WgXq4rLIQ~jIH@e{o%Hb">
                            <value name="VAR">
                              <block type="variables_get" id="+Qxpi)@d@QTT[hxrVa:u">
                                <field name="VAR" id="45(Oig9he3qprkqRAy)?">walletInfo</field>
                              </block>
                            </value>
                            <value name="KEY">
                              <block type="text" id="nJd/q06P8Qc|dTa,I.Tn">
                                <field name="TEXT">secret</field>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </value>
                    <next>
                      <block type="table_add_row" id="oQ]%cJH4({@K+bzQ=r+Q">
                        <field name="VAR" id="vHUKFaYWkuLipXA-eqRT">newTable</field>
                        <value name="TABLE">
                          <block type="variables_get" id="f~C_a0tAz+*m[S*yXv*A">
                            <field name="VAR" id="vHUKFaYWkuLipXA-eqRT">newTable</field>
                          </block>
                        </value>
                        <value name="ROW">
                          <block type="variables_get" id="^y8h^|.H$Zb4M!}C0h)D">
                            <field name="VAR" id="JIchN7D{RHv1PS=h?t-b">newRow</field>
                          </block>
                        </value>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </statement>
            <next>
              <block type="table_csv_save" id=",i,w:+;H+%7-ntn[dm@=">
                <value name="TABLE">
                  <block type="variables_get" id="|BI9v4t:.CDvY|}7yOFb">
                    <field name="VAR" id="vHUKFaYWkuLipXA-eqRT">newTable</field>
                  </block>
                </value>
                <value name="FILENAME">
                  <block type="text" id="h8ZCHn=gS3?z[-x4,EzI">
                    <field name="TEXT">wallets.csv</field>
                  </block>
                </value>
                <next>
                  <block type="text_print" id="*3unDtx1ul%Ap;rU)F_j">
                    <value name="TEXT">
                      <block type="text" id="%v0Sraad1*BFBi-Wj~vR">
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
    `,
    title: "Automated Wallet Creation and CSV Export",
    description: "This program is designed to automate the creation of multiple XRPL wallets and save the wallet information into a CSV file. The process starts by creating an empty table to store the wallet data. An initial row with placeholders for 'address' and 'secret' is added to the table. Then, a loop runs from 0 to 10, during which a new XRPL wallet is created in each iteration. The wallet information, specifically the 'address' and 'secret', is extracted and added as a new row to the table. Once all the wallets are created and their information is added to the table, the table is saved as a CSV file named 'wallets.csv'. Finally, the program prints a message 'Complete!' to indicate that the process is finished. This program demonstrates how to use loops, variable manipulation, and file operations within Blockly to automate complex tasks.",
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
    description: "",
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
    description: "",
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
      <block type="lists_repeat" x="0" y="0"></block>
    `,
    title: "List Repeat",
    description: "",
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
      <block type="lists_getIndex" x="0" y="0"></block>
    `,
    title: "List Get Index",
    description: "",
    categories: ["list"]
  },
  {
    height: 50,
    block: `
      <block type="lists_indexOf" x="0" y="0"></block>
    `,
    title: "List Index of",
    description: "",
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
