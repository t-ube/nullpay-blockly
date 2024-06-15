// @/blocks/flyoutContents.tsx
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
    height: 150,
    block: `
      <block type="xrpl_account_info_api" x="0" y="0"></block>
    `,
    title: "XRPL Account Info",
    description: "Retrieve information about a specific XRPL account.",
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
    description: "",
    categories: ["xrpl"]
  },
  {
    height: 131,
    block: `
      <block type="xrpl_client_subscribe_account_transactions" x="0" y="0"></block>
    `,
    title: "Subscribe transactions",
    description: "",
    categories: ["xrpl"]
  },
  {
    height: 100,
    block: `
      <block type="xrpl_client_unsubscribe_account_transactions" x="0" y="0"></block>
    `,
    title: "Unsubscribe transactions",
    description: "",
    categories: ["xrpl"]
  },
  {
    height: 80,
    block: `
      <block type="xrpl_wallet_initialize" x="0" y="0"></block>
    `,
    title: "Initialize Wallet",
    description: "",
    categories: ["xrpl"]
  },
  {
    height: 183,
    block: `
      <block type="xrpl_payment_transaction" x="0" y="0"></block>
    `,
    title: "Payment Transaction",
    description: "",
    categories: ["xrpl"]
  },
  {
    height: 105,
    block: `
      <block type="xrpl_wallet_sign" x="0" y="0"></block>
    `,
    title: "Sign Wallet",
    description: "",
    categories: ["xrpl"]
  },
  {
    height: 105,
    block: `
      <block type="xrpl_client_submit" x="0" y="0"></block>
    `,
    title: "Submit",
    description: "",
    categories: ["xrpl"]
  },
  /*{
    height: 150,
    block: `
      <block type="xrpl_subscribe_streams" x="0" y="0"></block>
    `,
    title: "Subscribe to XRPL",
    description: "",
    categories: ["xrpl"]
  },*/
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
    title: "XRPL Create Account Sample",
    description: "Create a new XRPL account using the selected network.",
    categories: ["sample","xrpl"]
  }
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
    title: "Xaman Payment Sample",
    description: "Create a new XRPL account and payment.",
    categories: ["sample","xaman"]
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
    title: "Inspect and print",
    description: "",
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

export const control_blocks = [
  {
      height: 50,
      block: `
        <block type="wait_seconds" x="0" y="0"></block>
      `,
      title: "Wait Seconds",
      description: "Wait for a specified number of seconds.",
      categories: ["control"]
  }
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
    title: "undefined",
    description: "",
    categories: ["logic"]
  },
  {
    height: 50,
    block: `
      <block type="null" x="0" y="0"></block>
    `,
    title: "null",
    description: "",
    categories: ["logic"]
  },
];

export const loops_blocks = [
  {
    height: 80,
    block: `
      <block type="controls_whileUntil" x="0" y="0"></block>
    `,
    title: "While/Until Loop",
    description: "Create a while or until loop.",
    categories: ["loops"]
  },
  {
    height: 80,
    block: `
      <block type="controls_for" x="0" y="0"></block>
    `,
    title: "For Loop",
    description: "Create a for loop.",
    categories: ["loops"]
  },
  {
    height: 80,
    block: `
      <block type="controls_forEach" x="0" y="0"></block>
    `,
    title: "ForEach Loop",
    description: "Create a for-each loop.",
    categories: ["loops"]
  }
];

export const lists_blocks = [
  {
    height: 50,
    block: `
      <block type="array_init" x="0" y="0"></block>
    `,
    title: "Initialize Array",
    description: "Initialize an array.",
    categories: ["lists"]
  },
  {
    height: 70,
    block: `
      <block type="array_append" x="0" y="0"></block>
    `,
    title: "Append to Array",
    description: "Append an item to an array.",
    categories: ["lists"]
  },
  {
    height: 70,
    block: `
      <block type="dynamic_list_create" x="0" y="0"></block>
    `,
    title: "Create List",
    description: "Create a dynamic list.",
    categories: ["lists"]
  },
  {
    height: 50,
    block: `
      <block type="lists_length" x="0" y="0"></block>
    `,
    title: "List Length",
    description: "Get the length of a list.",
    categories: ["lists"]
  },
  {
    height: 50,
    block: `
      <block type="lists_isEmpty" x="0" y="0"></block>
    `,
    title: "List Is Empty",
    description: "Check if a list is empty.",
    categories: ["lists"]
  },
  {
    height: 50,
    block: `
      <block type="lists_sort" x="0" y="0"></block>
    `,
    title: "Sort List",
    description: "Sort a list.",
    categories: ["lists"]
  }
];
