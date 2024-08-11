import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'step-1',
    block: `
      <block type="xaman_login" x="0" y="0">
        <field name="USER_INFO">userInfo</field>
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
      <block type="xaman_login" x="0" y="0">
        <field name="USER_INFO">userInfo</field>
        <next>
          <block type="variables_set">
            <field name="VAR">address</field>
            <value name="VALUE">
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

export default function XamanWalletLoadingGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Xaman Wallet Loading</Typography>
      <Typography variant="body1" paragraph>
        {`Welcome to the Xaman Wallet Loading guide! In this tutorial, we'll create a program to log in with Xaman and extract the user's address.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Logging in with Xaman</Typography>
      <Typography variant="body1" paragraph>
        {`First, let's use Xaman to log in the user. This will prompt the user to connect their Xaman wallet.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>{`Step 2: Extracting User's Address`}</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll extract the user's address from the Xaman login information.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>{`Step 3: Displaying User's Address`}</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, we'll print the user's address.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-3"/>
      </Box>

      <Typography variant="h6" mt={4}>Complete Program</Typography>
      <Typography variant="body1" paragraph>
        {`Here's the complete program that logs in with Xaman, extracts the user's address, and displays it:`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="complete"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Congratulations! You've just created a program to log in with Xaman and extract the user's address.`}
      </Typography>
    </Box>
  );
}