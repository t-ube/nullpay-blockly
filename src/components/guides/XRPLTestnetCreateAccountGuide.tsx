'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'step-1',
    block: `<block type="xrpl_generate_wallet" x="0" y="0">
      <field name="WALLET_INFO">walletInfo</field>
    </block>`
  },
  {
    id: 'step-2',
    block: `<block type="variables_set" x="0" y="0">
      <field name="VAR">address</field>
      <value name="VALUE">
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
    </block>`
  },
  {
    id: 'step-3',
    block: `<block type="variables_set" x="0" y="0">
      <field name="VAR">secret</field>
      <value name="VALUE">
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
    </block>`
  },
  {
    id: 'step-4',
    block: `<block type="xrpl_request_faucet" x="0" y="0">
      <field name="FAUCET_INFO">faucetInfo</field>
      <value name="FAUCET_NETWORK_URI">
        <block type="xrpl_select_faucet_network_uri">
          <field name="NETWORK_TYPE">xrpl</field>
          <field name="FAUCET_NETWORK_URI">https://faucet.altnet.rippletest.net/accounts</field>
        </block>
      </value>
      <value name="DESTINATION_ADDRESS">
        <block type="variables_get">
          <field name="VAR">address</field>
        </block>
      </value>
    </block>`
  },
  {
    id: 'complete',
    block: `<block type="xrpl_generate_wallet" x="0" y="0">
    <field name="WALLET_INFO">walletInfo</field>
    <next>
      <block type="variables_set">
        <field name="VAR">address</field>
        <value name="VALUE">
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
        <next>
          <block type="variables_set">
            <field name="VAR">secret</field>
            <value name="VALUE">
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
            <next>
              <block type="xrpl_request_faucet">
                <field name="FAUCET_INFO">faucetInfo</field>
                <value name="FAUCET_NETWORK_URI">
                  <block type="xrpl_select_faucet_network_uri">
                    <field name="NETWORK_TYPE">xrpl</field>
                    <field name="FAUCET_NETWORK_URI">https://faucet.altnet.rippletest.net/accounts</field>
                  </block>
                </value>
                <value name="DESTINATION_ADDRESS">
                  <block type="variables_get">
                    <field name="VAR">address</field>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>`
  }
];

export default function XRPLTestnetCreateAccountGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">XRPL Testnet Wallet Generation and Account Activation</Typography>
      <Typography variant="body1" paragraph>
        {`Welcome to the XRPL Testnet Wallet Generation and Account Activation guide! In this tutorial, we'll create a program to generate an XRPL wallet locally, extract the address and secret, and then activate the account on the testnet by requesting funds from a faucet.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Generate XRPL Wallet Information</Typography>
      <Typography variant="body1" paragraph>
        {`First, let's generate XRPL wallet information using the "Generate XRPL Wallet" block. This will create a new wallet locally and store the information in the "walletInfo" variable. Note that this step doesn't create an account on the XRPL network yet.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Extract Wallet Address</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll extract the wallet address from the "walletInfo" and store it in a separate variable called "address". This address will be used to identify the account on the XRPL network.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Extract Wallet Secret</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's extract the wallet secret from the "walletInfo" and store it in a separate variable called "secret". This secret is crucial for signing transactions and should be kept secure.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-3"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 4: Activate Account on Testnet</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, we'll activate the account on the XRPL Testnet by requesting funds from the faucet. This step will create the actual account on the network and fund it with test XRP.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-4"/>
      </Box>

      <Typography variant="h6" mt={4}>Complete Program</Typography>
      <Typography variant="body1" paragraph>
        {`Here's the complete program that generates XRPL wallet information locally, extracts the address and secret, and activates the account on the testnet by requesting funds from the faucet:`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="complete"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Congratulations! You've just created a program that generates wallet information locally and then activates an account on the XRPL Testnet. This program demonstrates the process of creating a new wallet and funding it to establish its presence on the network.`}
      </Typography>
    </Box>
  );
}