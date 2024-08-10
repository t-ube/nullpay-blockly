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
      <value name="CONNECTION">
        <block type="xrpl_faucet_network_selection">
          <field name="NETWORK_TYPE">xrpl</field>
          <field name="CONNECTION">https://faucet.altnet.rippletest.net/accounts</field>
        </block>
      </value>
      <value name="ADDRESS">
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
                <value name="CONNECTION">
                  <block type="xrpl_faucet_network_selection">
                    <field name="NETWORK_TYPE">xrpl</field>
                    <field name="CONNECTION">https://faucet.altnet.rippletest.net/accounts</field>
                  </block>
                </value>
                <value name="ADDRESS">
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

export default function XRPLTestnetGenerateWalletGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">XRPL Testnet Generate Wallet</Typography>
      <Typography variant="body1" paragraph>
        {`Welcome to the XRPL Testnet Generate Wallet guide! In this tutorial, we'll create a program to generate an XRPL wallet on the testnet, extract the address and secret, and then request funds from a faucet.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Generate an XRPL Wallet</Typography>
      <Typography variant="body1" paragraph>
        {`First, let's generate an XRPL wallet using the "Generate XRPL Wallet" block. This will create a new wallet on the testnet and store the information in the "walletInfo" variable.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Extract Wallet Address</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll extract the wallet address from the "walletInfo" and store it in a separate variable called "address".`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Extract Wallet Secret</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's extract the wallet secret from the "walletInfo" and store it in a separate variable called "secret".`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-3"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 4: Request Funds from Testnet Faucet</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, we'll request funds from the XRPL Testnet faucet using the extracted address.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-4"/>
      </Box>

      <Typography variant="h6" mt={4}>Complete Program</Typography>
      <Typography variant="body1" paragraph>
        {`Here's the complete program that generates an XRPL testnet wallet, extracts the address and secret, and requests funds from the testnet faucet:`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="complete"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Congratulations! You've just created a program that interacts with the XRPL Testnet. This program generates a new wallet on the testnet, extracts important information, and funds it using the testnet faucet.`}
      </Typography>
    </Box>
  );
}