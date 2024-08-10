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
        <value name="SERVER">
          <block type="xrpl_network_wss_selection">
            <field name="NETWORK_TYPE">xrpl</field>
            <field name="CONNECTION">wss://s.altnet.rippletest.net:51233</field>
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
      <block type="variables_set" x="0" y="0">
        <field name="VAR">address</field>
        <value name="VALUE">
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
      </block>
    `
  },
  {
    id: 'step-4',
    block: `
      <block type="xrpl_command_account_info" x="0" y="0">
        <field name="ACCOUNT_INFO">accountInfo</field>
        <value name="XRPL_CLIENT">
          <block type="variables_get">
            <field name="VAR">xrplClient</field>
          </block>
        </value>
        <value name="ADDRESS">
          <block type="variables_get">
            <field name="VAR">address</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'step-5',
    block: `
      <block type="text_print" x="0" y="0">
        <value name="TEXT">
          <block type="json_to_text">
            <value name="JSON">
              <block type="variables_get">
                <field name="VAR">accountInfo</field>
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
            <field name="CONNECTION">wss://s.altnet.rippletest.net:51233</field>
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
            <block type="variables_set">
                <field name="VAR">address</field>
                <value name="VALUE">
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
                <next>
                <block type="xrpl_command_account_info">
                    <field name="ACCOUNT_INFO">accountInfo</field>
                    <value name="XRPL_CLIENT">
                    <block type="variables_get">
                        <field name="VAR">xrplClient</field>
                    </block>
                    </value>
                    <value name="ADDRESS">
                    <block type="variables_get">
                        <field name="VAR">address</field>
                    </block>
                    </value>
                    <next>
                    <block type="text_print">
                        <value name="TEXT">
                        <block type="json_to_text">
                            <value name="JSON">
                            <block type="variables_get">
                                <field name="VAR">accountInfo</field>
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
    `
  }
];

export default function XRPLAccountInfoGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">XRPL Account Information Retrieval</Typography>
      <Typography variant="body1" paragraph>
        {`Welcome to the XRPL Account Information Retrieval guide! In this tutorial, we'll create a program to connect to the XRPL testnet, load a wallet, and retrieve account information.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Initializing XRPL Client</Typography>
      <Typography variant="body1" paragraph>
        {`First, let's initialize the XRPL client. This block sets up the connection to the XRPL testnet.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Loading a Wallet</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll load a wallet using a seed. This wallet will be used to query account information.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Extracting the Wallet Address</Typography>
      <Typography variant="body1" paragraph>
        {`Now, we'll extract the address from the loaded wallet and store it in a variable.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-3"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 4: Retrieving Account Information</Typography>
      <Typography variant="body1" paragraph>
        {`Using the extracted address, we'll now query the XRPL for account information.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-4"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 5: Displaying Account Information</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, we'll print the retrieved account information.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-5"/>
      </Box>

      <Typography variant="h6" mt={4}>Complete Program</Typography>
      <Typography variant="body1" paragraph>
        {`Here's the complete program that initializes an XRPL client, loads a wallet, retrieves account information, and displays it:`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="complete"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Congratulations! You've just created a program to retrieve and display account information from the XRPL testnet.`}
      </Typography>
      
      <Typography variant="body1" paragraph>
        {`Note: The seed used in this example is for demonstration purposes only. In a real application, you should never hardcode sensitive information like wallet seeds.`}
      </Typography>
    </Box>
  );
}