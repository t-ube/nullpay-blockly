'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'step-1',
    block: `
      <block type="xrpl_client_initialize" x="0" y="0">
        <field name="XRPL_CLIENT">xrplClient</field>
        <value name="WEBSOCKET_ENDPOINT">
          <block type="xrpl_select_websocket_endpoint">
            <field name="NETWORK_TYPE">xrpl</field>
            <field name="WEBSOCKET_ENDPOINT">wss://s1.ripple.com</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'step-2',
    block: `
      <block type="xrpl_load_wallet" x="0" y="0">
        <field name="WALLET_ID">walletID</field>
        <value name="WALLET_SEED">
          <block type="text">
            <field name="TEXT">sEdTbWX2VSsYQ3n5L6hokj9kvUyKX59</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'step-3',
    block: `
      <block type="xrpl_autofill_payload" x="0" y="0">
        <field name="FILLED_PAYLOAD">filledPayload</field>
        <value name="XRPL_CLIENT">
          <block type="variables_get">
            <field name="VAR">xrplClient</field>
          </block>
        </value>
        <value name="TRANSACTION_PAYLOAD">
          <block type="xrpl_payload_payment">
            <value name="ACCOUNT_ADDRESS">
              <block type="json_get_value">
                <value name="JSON">
                  <block type="xrpl_wallet_info">
                    <value name="WALLET_ID">
                      <block type="variables_get">
                        <field name="VAR">walletID</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="KEY">
                  <block type="text">
                    <field name="TEXT">address</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="DESTINATION_ADDRESS">
              <block type="text">
                <field name="TEXT">rBv3deKgvs3he1dybHzCfhTQop1ju1gt9s</field>
              </block>
            </value>
            <value name="XRP_DROPS_AMOUNT">
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
    `
  },
  {
    id: 'step-4',
    block: `
      <block type="xrpl_wallet_sign" x="0" y="0">
        <field name="SIGNED_TRANSACTION">signedTxn</field>
        <value name="WALLET_ID">
          <block type="variables_get">
            <field name="VAR">walletID</field>
          </block>
        </value>
        <value name="FILLED_PAYLOAD">
          <block type="variables_get">
            <field name="VAR">filledPayload</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'step-5',
    block: `
      <block type="xrpl_command_submit_signed_transaction" x="0" y="0">
        <field name="SUBMIT_RESULT">result</field>
        <value name="XRPL_CLIENT">
          <block type="variables_get">
            <field name="VAR">xrplClient</field>
          </block>
        </value>
        <value name="SIGNED_TRANSACTION">
          <block type="variables_get">
            <field name="VAR">signedTxn</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'complete',
    block: `
        <block type="xrpl_client_initialize" x="0" y="0">
          <field name="XRPL_CLIENT">xrplClient</field>
          <value name="WEBSOCKET_ENDPOINT">
            <block type="xrpl_select_websocket_endpoint">
              <field name="NETWORK_TYPE">xrpl</field>
              <field name="WEBSOCKET_ENDPOINT">wss://s1.ripple.com</field>
            </block>
          </value>
          <next>
            <block type="xrpl_load_wallet">
              <field name="WALLET_ID">walletID</field>
              <value name="WALLET_SEED">
                <block type="text">
                  <field name="TEXT">sEdTbWX2VSsYQ3n5L6hokj9kvUyKX59</field>
                </block>
              </value>
              <next>
                <block type="xrpl_autofill_payload">
                  <field name="FILLED_PAYLOAD">filledPayload</field>
                  <value name="XRPL_CLIENT">
                    <block type="variables_get">
                      <field name="VAR">xrplClient</field>
                    </block>
                  </value>
                  <value name="TRANSACTION_PAYLOAD">
                    <block type="xrpl_payload_payment">
                      <value name="ACCOUNT_ADDRESS">
                        <block type="json_get_value">
                          <value name="JSON">
                            <block type="xrpl_wallet_info">
                              <value name="WALLET_ID">
                                <block type="variables_get">
                                  <field name="VAR">walletID</field>
                                </block>
                              </value>
                            </block>
                          </value>
                          <value name="KEY">
                            <block type="text">
                              <field name="TEXT">address</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <value name="DESTINATION_ADDRESS">
                        <block type="text">
                          <field name="TEXT">rBv3deKgvs3he1dybHzCfhTQop1ju1gt9s</field>
                        </block>
                      </value>
                      <value name="XRP_DROPS_AMOUNT">
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
                    <block type="xrpl_wallet_sign">
                      <field name="SIGNED_TRANSACTION">signedTxn</field>
                      <value name="WALLET_ID">
                        <block type="variables_get">
                          <field name="VAR">walletID</field>
                        </block>
                      </value>
                      <value name="FILLED_PAYLOAD">
                        <block type="variables_get">
                          <field name="VAR">filledPayload</field>
                        </block>
                      </value>
                      <next>
                        <block type="xrpl_command_submit_signed_transaction">
                          <field name="SUBMIT_RESULT">result</field>
                          <value name="XRPL_CLIENT">
                            <block type="variables_get">
                              <field name="VAR">xrplClient</field>
                            </block>
                          </value>
                          <value name="SIGNED_TRANSACTION">
                            <block type="variables_get">
                              <field name="VAR">signedTxn</field>
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
    `
  }
];

export default function XRPLDetailedPaymentGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">XRPL Detailed Payment Process</Typography>
      <Typography variant="body1" paragraph>
        {`Welcome to the XRPL Detailed Payment Process guide! In this tutorial, we'll create a program to send an XRP payment using the XRP Ledger, breaking down each step of the process.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Initializing XRPL Client</Typography>
      <Typography variant="body1" paragraph>
        {`First, let's initialize the XRPL client. This block sets up the connection to the XRP Ledger network.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Loading a Wallet</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll load a wallet using a seed. This wallet will be used to sign and send the transaction.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Autofilling the Transaction Payload</Typography>
      <Typography variant="body1" paragraph>
        {`Now, we'll create a payment transaction payload and autofill it with necessary details like sequence number and fees.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-3"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 4: Signing the Transaction</Typography>
      <Typography variant="body1" paragraph>
        {`With our autofilled payload, we'll now sign the transaction using our wallet.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-4"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 5: Submitting the Transaction</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, we'll submit our signed transaction to the XRP Ledger.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-5"/>
      </Box>

      <Typography variant="h6" mt={4}>Complete Program</Typography>
      <Typography variant="body1" paragraph>
        {`Here's the complete program that initializes an XRPL client, loads a wallet, creates and signs a transaction, and submits it to the XRP Ledger:`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="complete"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Congratulations! You've just created a detailed program to send an XRP payment. This program shows each step of the process, from initializing the client to submitting the transaction.`}
      </Typography>
      
      <Typography variant="body1" paragraph>
        {`Note: The seed used in this example is for demonstration purposes only. In a real application, you should never hardcode sensitive information like wallet seeds.`}
      </Typography>
    </Box>
  );
}