import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'step-1',
    block: `
      <block type="xrpl_client_initialize" x="0" y="0">
        <field name="XRPL_CLIENT">xrplClient</field>
        <value name="SERVER">
          <block type="xrpl_network_wss_selection">
            <field name="NETWORK_TYPE">xrpl</field>
            <field name="CONNECTION">wss://s1.ripple.com</field>
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
        <value name="SEED">
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
      <block type="xrpl_easy_submit" x="0" y="0">
        <field name="RESULT">result</field>
        <value name="XRPL_CLIENT">
          <block type="variables_get">
            <field name="VAR">xrplClient</field>
          </block>
        </value>
        <value name="WALLET_ID">
          <block type="variables_get">
            <field name="VAR">walletID</field>
          </block>
        </value>
        <value name="PAYLOAD">
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
            <value name="DEST_ADDRESS">
              <block type="text">
                <field name="TEXT">rBv3deKgvs3he1dybHzCfhTQop1ju1gt9s</field>
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
    `
  },
  {
    id: 'complete',
    block: `
        <block type="xrpl_client_initialize" x="0" y="0">
          <field name="XRPL_CLIENT">xrplClient</field>
          <value name="SERVER">
            <block type="xrpl_network_wss_selection">
              <field name="NETWORK_TYPE">xrpl</field>
              <field name="CONNECTION">wss://s1.ripple.com</field>
            </block>
          </value>
          <next>
            <block type="xrpl_load_wallet">
              <field name="WALLET_ID">walletID</field>
              <value name="SEED">
                <block type="text">
                  <field name="TEXT">sEdTbWX2VSsYQ3n5L6hokj9kvUyKX59</field>
                </block>
              </value>
              <next>
                <block type="xrpl_easy_submit">
                  <field name="RESULT">result</field>
                  <value name="XRPL_CLIENT">
                    <block type="variables_get">
                      <field name="VAR">xrplClient</field>
                    </block>
                  </value>
                  <value name="WALLET_ID">
                    <block type="variables_get">
                      <field name="VAR">walletID</field>
                    </block>
                  </value>
                  <value name="PAYLOAD">
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
                      <value name="DEST_ADDRESS">
                        <block type="text">
                          <field name="TEXT">rBv3deKgvs3he1dybHzCfhTQop1ju1gt9s</field>
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
            </block>
          </next>
        </block>
    `
  }
];

export default function XRPLPaymentGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">XRPL Payment Process</Typography>
      <Typography variant="body1" paragraph>
        {`Welcome to the XRPL Payment guide! In this tutorial, we'll create a simple program to send an XRP payment using the XRP Ledger.`}
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

      <Typography variant="h6" mt={4}>Step 3: Submitting a Payment</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's create and submit a payment transaction. We'll use the 'easy submit' block to simplify the process.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-3" />
      </Box>

      <Typography variant="h6" mt={4}>Complete Program</Typography>
      <Typography variant="body1" paragraph>
        {`Here's the complete program that initializes an XRPL client, loads a wallet, and sends an XRP payment:`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="complete" />
      </Box>

      <Typography variant="body1" paragraph>
        {`Congratulations! You've just created a program to send an XRP payment. This program initializes an XRPL client, loads a wallet, and sends 1 XRP to the specified destination address.`}
      </Typography>
      
      <Typography variant="body1" paragraph>
        {`Note: The seed used in this example is for demonstration purposes only. In a real application, you should never hardcode sensitive information like wallet seeds.`}
      </Typography>
    </Box>
  );
}