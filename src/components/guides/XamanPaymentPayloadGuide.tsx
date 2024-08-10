'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'step-1',
    block: `<block type="xaman_login" x="0" y="0"></block>`
  },
  {
    id: 'step-2',
    block: 
      `<block type="xaman_login" x="0" y="0">
        <next>
          <block type="xaman_payload_set"></block>
        </next>
      </block>`
  },
  {
    id: 'step-3',
    block: 
      `<block type="xaman_login" x="0" y="0">
        <next>
          <block type="xaman_payload_set">
            <value name="PAYLOAD">
              <block type="xrpl_payload_payment">
                <value name="ACCOUNT_ADDRESS">
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
                <value name="DEST_ADDRESS">
                  <block type="text">
                    <field name="TEXT">rKCXJLoUhd4dSvd9Vropg8TeURZHgZuknt</field>
                  </block>
                </value>
                <value name="AMOUNT">
                  <block type="xrpl_xrp_to_drops">
                    <value name="AMOUNT">
                      <block type="math_number">
                        <field name="NUM">1</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </next>
      </block>`
  },
  {
    id: 'step-4',
    block: 
`      <block type="xaman_login" x="0" y="0">
        <next>
          <block type="xaman_payload_set">
            <value name="PAYLOAD">
              <block type="xrpl_payload_payment">
                <value name="ACCOUNT_ADDRESS">
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
                <value name="DEST_ADDRESS">
                  <block type="text">
                    <field name="TEXT">rKCXJLoUhd4dSvd9Vropg8TeURZHgZuknt</field>
                  </block>
                </value>
                <value name="AMOUNT">
                  <block type="xrpl_xrp_to_drops">
                    <value name="AMOUNT">
                      <block type="math_number">
                        <field name="NUM">1</field>
                      </block>
                    </value>
                  </block>
                </value>
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
      </block>`
  }
];

export default function XamanPaymentPayloadGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Xaman Payment with Payload</Typography>
      <Typography variant="body1" paragraph>
        {`Welcome to the advanced Xaman Payment guide! In this tutorial, we'll create a program that logs in to the Xaman wallet, sets up a payment payload, and waits for the user's signature.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Logging in with Xaman</Typography>
      <Typography variant="body1" paragraph>
        {`First, let's add the "Xaman Login" block. This block is used to log in to the Xaman wallet and store the user information.`}
      </Typography>
      <div id="step-1" style={{ marginBottom: '20px' }} />

      <Typography variant="h6" mt={4}>Step 2: Setting up the Payload</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll add the "Xaman Payload Set" block. This block allows us to create and configure a payment payload.`}
      </Typography>
      <div id="step-2" style={{ marginBottom: '20px' }} />

      <Typography variant="h6" mt={4}>Step 3: Configuring the Payment Payload</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's configure the payment payload. We'll set the source account (using the logged-in user's information), the destination address, and the amount of XRP to send. We'll use 1 XRP as an example.`}
      </Typography>
      <div id="step-3" style={{ marginBottom: '20px' }} />

      <Typography variant="h6" mt={4}>Step 4: Waiting for Signature</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, we'll add the "Wait for Signature" block. This block ensures that the program waits for the user to sign the transaction before proceeding.`}
      </Typography>
      <div id="step-4" style={{ marginBottom: '20px' }} />

      <Typography variant="body1" paragraph>
        {`Congratulations! You've created an advanced program that logs in to Xaman, sets up a payment payload using the user's account information, and waits for the user's signature. This example demonstrates how to create more complex interactions with the XRPL using Xaman and Blockly.`}
      </Typography>
    </Box>
  );
}