'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'step-1',
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
    id: 'step-2',
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
    id: 'step-3',
    block: `
      <block type="text_print" x="0" y="0">
        <value name="TEXT">
          <block type="variables_get">
            <field name="VAR">address</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'complete',
    block: `
      <block type="xrpl_load_wallet" x="0" y="0">
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
              <block type="text_print">
                <value name="TEXT">
                  <block type="variables_get">
                    <field name="VAR">address</field>
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

export default function XRPLWalletLoadingGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">XRPL Wallet Loading</Typography>
      <Typography variant="body1" paragraph>
        {`Welcome to the XRPL Wallet Loading guide! In this tutorial, we'll create a program to load an XRPL wallet from a seed and extract its address.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Loading the XRPL Wallet</Typography>
      <Typography variant="body1" paragraph>
        {`First, let's load the XRPL wallet using a seed. This block initializes the wallet and stores it in a variable.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Extracting the Wallet Address</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll extract the address from the loaded wallet and store it in a variable.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Displaying the Wallet Address</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, we'll print the extracted wallet address.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-3"/>
      </Box>

      <Typography variant="h6" mt={4}>Complete Program</Typography>
      <Typography variant="body1" paragraph>
        {`Here's the complete program that loads an XRPL wallet, extracts its address, and displays it:`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="complete"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Congratulations! You've just created a program to load an XRPL wallet and extract its address.`}
      </Typography>

      <Typography variant="body1" paragraph>
        {`Note: The seed used in this example is for demonstration purposes only. In a real application, you should never hardcode sensitive information like wallet seeds.`}
      </Typography>
    </Box>
  );
}