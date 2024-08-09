'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'step-1',
    block: `<block type="text_print" x="0" y="0"></block>`
  },
  {
    id: 'step-2',
    block: `<block type="text" x="0" y="0"></block>`
  },
  {
    id: 'step-3',
    block: `
    <block type="text_print" x="0" y="0">
      <value name="TEXT">
        <block type="text">
          <field name="TEXT">Hello World</field>
        </block>
      </value>
    </block>
  `
  }
];

export default function HelloWorldGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Hello World</Typography>
      
      <Typography variant="body1" paragraph>
        {`Welcome to your first programming lesson! In this guide, we'll create a simple program that displays the message "Hello World" on the screen.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Adding a Print Block</Typography>
      <Typography variant="body1" paragraph>
        {`First, let's add a "print" block to our workspace. This block is used to display text on the screen.`}
      </Typography>
      <div id="step-1" style={{ marginBottom: '20px' }} />

      <Typography variant="h6" mt={4}>Step 2: Creating a Text Block</Typography>
      <Typography variant="body1" paragraph>
        {`Next, we'll create a "text" block. This block allows us to input the specific text we want to display.`}
      </Typography>
      <div id="step-2" style={{ marginBottom: '20px' }} />

      <Typography variant="h6" mt={4}>Step 3: Combining Blocks</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's combine the "print" and "text" blocks. We'll put the text "Hello World" inside the text block, and then place the text block inside the print block.`}
      </Typography>
      <div id="step-3" style={{ marginBottom: '20px' }} />

      <Typography variant="body1" paragraph>
        {`Congratulations! You've just created your first program. When run, this program will display the message "Hello World" on the screen.`}
      </Typography>
    </Box>
  );
}