'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'step-1',
    block: `
      <block type="controls_whileUntil">
        <field name="MODE">WHILE</field>
        <value name="BOOL">
          <block type="logic_true"></block>
        </value>
      </block>
    `
  },
  {
    id: 'step-2',
    block: `
      <block type="webapi_request">
        <field name="METHOD">GET</field>
        <field name="BODY_FORMAT">json</field>
        <field name="IS_ERROR">isError</field>
        <field name="RESPONSE">response</field>
        <value name="URL">
          <block type="text">
            <field name="TEXT">https://openapi.bitrue.com/api/v1/depth?symbol=XRPUSDC</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'step-3',
    block: `
      <block type="chart_order_book_block">
        <field name="INPUT">"Title"</field>
        <value name="TITLE">
          <block type="text">
            <field name="TEXT">Order book live chart</field>
          </block>
        </value>
        <value name="PAIR">
          <block type="text">
            <field name="TEXT">XRP/USDC</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'step-4',
    block: `
      <block type="chart_extract_balanced_order_book">
        <value name="ORDERBOOK">
          <block type="chart_bitrue_depth_to_order_book">
            <value name="DEPTH">
              <block type="variables_get">
                <field name="VAR">response</field>
              </block>
            </value>
          </block>
        </value>
        <value name="LIMIT">
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'complete',
    block: `
      <block type="controls_whileUntil">
        <field name="MODE">WHILE</field>
        <value name="BOOL">
          <block type="logic_true"></block>
        </value>
        <statement name="DO">
          <block type="webapi_request">
            <field name="METHOD">GET</field>
            <field name="BODY_FORMAT">json</field>
            <field name="IS_ERROR">isError</field>
            <field name="RESPONSE">response</field>
            <value name="URL">
              <block type="text">
                <field name="TEXT">https://openapi.bitrue.com/api/v1/depth?symbol=XRPUSDC</field>
              </block>
            </value>
            <next>
              <block type="chart_order_book_block">
                <field name="INPUT">"Title"</field>
                <value name="TITLE">
                  <block type="text">
                    <field name="TEXT">Order book live chart</field>
                  </block>
                </value>
                <value name="PAIR">
                  <block type="text">
                    <field name="TEXT">XRP/USDC</field>
                  </block>
                </value>
                <value name="DATA">
                  <block type="chart_extract_balanced_order_book">
                    <value name="ORDERBOOK">
                      <block type="chart_bitrue_depth_to_order_book">
                        <value name="DEPTH">
                          <block type="variables_get">
                            <field name="VAR">response</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <value name="LIMIT">
                      <block type="math_number">
                        <field name="NUM">10</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
      </block>
    `
  }
];

export default function XRPUSDCOrderBookLiveChartGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">XRP/USDC Order Book Live Chart (Bitrue)</Typography>
      <Typography variant="body1" paragraph>
        {`Welcome to the XRP/USDC Order Book Live Chart guide! In this tutorial, we'll create a program to fetch real-time order book data from Bitrue and display it as a live chart.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Setting Up the Continuous Loop</Typography>
      <Typography variant="body1" paragraph>
        {`First, we'll set up a continuous loop to keep our chart updating in real-time.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Fetching Order Book Data</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll use a web API request to fetch the latest order book data from Bitrue.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Creating the Chart Block</Typography>
      <Typography variant="body1" paragraph>
        {`Now, we'll set up the chart block to display our order book data.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-3"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 4: Processing and Limiting the Data</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, we'll process the raw data from Bitrue and limit it to the top 10 orders on each side.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="step-4"/>
      </Box>

      <Typography variant="h6" mt={4}>Complete Program</Typography>
      <Typography variant="body1" paragraph>
        {`Here's the complete program that continuously fetches XRP/USDC order book data from Bitrue and displays it as a live chart:`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="complete"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Congratulations! You've just created a program to display a live XRP/USDC order book chart using data from Bitrue.`}
      </Typography>
    </Box>
  );
}