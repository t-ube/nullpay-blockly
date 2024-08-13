'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'step-1',
    block: `
      <block type="variables_set" x="0" y="0">
        <field name="VAR">nftID</field>
        <value name="VALUE">
          <block type="text">
            <field name="TEXT">000813882BEF04758895A2BCE50BB446CB5AC2ACAD41FA367AFBF53500000299</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'step-2',
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
    id: 'step-3',
    block: `
      <block type="xrpl_command_get_nft_info" x="0" y="0">
        <field name="IS_ERROR">status</field>
        <field name="NFT_INFO">response</field>
        <value name="XRPL_CLIENT">
          <block type="variables_get">
            <field name="VAR">xrplClient</field>
          </block>
        </value>
        <value name="NFT_ID">
          <block type="variables_get">
            <field name="VAR">nftID</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'step-4',
    block: `
      <block type="variables_set" x="0" y="0">
        <field name="VAR">ownerAddress</field>
        <value name="VALUE">
          <block type="json_get_value">
            <value name="JSON">
              <block type="variables_get">
                <field name="VAR">response</field>
              </block>
            </value>
            <value name="KEY">
              <block type="text">
                <field name="TEXT">owner</field>
              </block>
            </value>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'step-5',
    block: `
      <block type="xaman_login" x="0" y="0">
        <field name="USER_INFO">userInfo</field>
      </block>
    `
  },
  {
    id: 'step-6',
    block: `
      <block type="xaman_request_transaction_signature" x="0" y="0">
        <field name="IS_ERROR">status</field>
        <field name="PAYLOAD_ID">payloadID</field>
        <value name="TRANSACTION_PAYLOAD">
          <block type="xrpl_payload_nft_buy_offer">
            <value name="OWNER_ID">
              <block type="variables_get">
                <field name="VAR">ownerAddress</field>
              </block>
            </value>
            <value name="NFT_ID">
              <block type="variables_get">
                <field name="VAR">nftID</field>
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
    id: 'step-7',
    block: `
      <block type="xaman_wait_for_signature" x="0" y="0">
        <value name="PAYLOAD_ID">
          <block type="variables_get">
            <field name="VAR">payloadID</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'complete',
    block: `
      <block type="variables_set" x="0" y="0">
        <field name="VAR">nftID</field>
        <value name="VALUE">
          <block type="text">
            <field name="TEXT">000813882BEF04758895A2BCE50BB446CB5AC2ACAD41FA367AFBF53500000299</field>
          </block>
        </value>
        <next>
          <block type="xrpl_client_initialize">
            <field name="XRPL_CLIENT">xrplClient</field>
            <value name="WEBSOCKET_ENDPOINT">
              <block type="xrpl_select_websocket_endpoint">
                <field name="NETWORK_TYPE">xrpl</field>
                <field name="WEBSOCKET_ENDPOINT">wss://s1.ripple.com</field>
              </block>
            </value>
            <next>
              <block type="xrpl_command_get_nft_info">
                <field name="IS_ERROR">status</field>
                <field name="NFT_INFO">response</field>
                <value name="XRPL_CLIENT">
                  <block type="variables_get">
                    <field name="VAR">xrplClient</field>
                  </block>
                </value>
                <value name="NFT_ID">
                  <block type="variables_get">
                    <field name="VAR">nftID</field>
                  </block>
                </value>
                <next>
                  <block type="variables_set">
                    <field name="VAR">ownerAddress</field>
                    <value name="VALUE">
                      <block type="json_get_value">
                        <value name="JSON">
                          <block type="variables_get">
                            <field name="VAR">response</field>
                          </block>
                        </value>
                        <value name="KEY">
                          <block type="text">
                            <field name="TEXT">owner</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <next>
                      <block type="xaman_login">
                        <field name="USER_INFO">userInfo</field>
                        <next>
                          <block type="xaman_request_transaction_signature">
                            <field name="IS_ERROR">status</field>
                            <field name="PAYLOAD_ID">payloadID</field>
                            <value name="TRANSACTION_PAYLOAD">
                              <block type="xrpl_payload_nft_buy_offer">
                                <value name="OWNER_ID">
                                  <block type="variables_get">
                                    <field name="VAR">ownerAddress</field>
                                  </block>
                                </value>
                                <value name="NFT_ID">
                                  <block type="variables_get">
                                    <field name="VAR">nftID</field>
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

export default function XRPLNFTBuyOfferGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Creating an NFT Buy Offer on XRPL with Xaman</Typography>
      <Typography variant="body1" paragraph>
        {`Welcome to the guide on creating an NFT Buy Offer on the XRP Ledger (XRPL) using Xaman! In this tutorial, we'll walk through the process of setting up an XRPL client, retrieving NFT information, and creating a buy offer using Xaman.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Set NFT ID</Typography>
      <Typography variant="body1" paragraph>
        {`First, we'll set the NFT ID we want to make an offer for. This is a unique identifier for the NFT on the XRPL.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Initialize XRPL Client</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll initialize the XRPL client to connect to the XRPL mainnet.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Retrieve NFT Information</Typography>
      <Typography variant="body1" paragraph>
        {`Now, we'll use the XRPL Clio command to retrieve information about the NFT.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-3"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 4: Extract Owner Address</Typography>
      <Typography variant="body1" paragraph>
        {`We'll extract the owner's address from the NFT information response.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-4"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 5: Authenticate with Xaman</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll authenticate the user using Xaman.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-5"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 6: Create NFT Buy Offer Payload</Typography>
      <Typography variant="body1" paragraph>
        {`Now, we'll create the payload for the NFT buy offer using Xaman.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-6"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 7: Wait for Signature</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, we'll wait for the user to sign the transaction using Xaman.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-7"/>
      </Box>

      <Typography variant="h6" mt={4}>Complete Program</Typography>
      <Typography variant="body1" paragraph>
        {`Here's the complete program that sets up an XRPL client, retrieves NFT information, and creates a buy offer using Xaman:`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="complete"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Congratulations! You've just created a program to make an NFT buy offer on the XRPL using Xaman for authentication and transaction signing.`}
      </Typography>
    </Box>
  );
}