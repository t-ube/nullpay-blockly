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
    block: `<block type="xaman_payment" x="0" y="0"></block>`
  },
  {
    id: 'step-3',
    block: 
      `<block type="xaman_login" x="0" y="0">
        <next>
          <block type="xaman_payment">
            <value name="DESTINATION">
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
        </next>
      </block>`
  },
  {
    id: 'step-4',
    block:
      `<block type="xaman_login" x="0" y="0">
        <next>
          <block type="xaman_payment">
            <value name="DESTINATION">
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

export default function XamanPaymentGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Xaman Payment</Typography>
      <Typography variant="body1" paragraph>
        {`Welcome to the Xaman Payment guide! In this tutorial, we'll create a program that logs in to the Xaman wallet, initiates an XRP payment, and waits for the user's signature.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Logging in with Xaman</Typography>
      <Typography variant="body1" paragraph>
        {`First, let's add the "Xaman Login" block. This block is used to log in to the Xaman wallet.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Setting up the Payment</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll add the "Xaman Payment" block. This block allows us to set up an XRP payment.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Configuring the Payment</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's configure the payment. We'll set the destination address and the amount of XRP to send. We'll use 1 XRP as an example.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-3"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 4: Waiting for Signature</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, we'll add the "Wait for Signature" block. This block ensures that the program waits for the user to sign the transaction before proceeding.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-4"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Congratulations! You've created a program that logs in to Xaman, sets up an XRP payment, and waits for the user's signature. This is a basic example of how to interact with the XRPL using Xaman and Blockly.`}
      </Typography>
    </Box>
  );
}