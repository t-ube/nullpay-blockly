'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'concat-step-1',
    block: `<block type="text" x="0" y="0">
      <field name="TEXT">Hello</field>
    </block>`
  },
  {
    id: 'concat-step-2',
    block: `<block type="dynamic_text_join" x="0" y="0">
      <mutation items="2"></mutation>
      <value name="ADD0">
        <block type="text">
          <field name="TEXT">Hello </field>
        </block>
      </value>
      <value name="ADD1">
        <block type="text">
          <field name="TEXT">World</field>
        </block>
      </value>
    </block>`
  },
  {
    id: 'concat-step-3',
    block: `<block type="text_print" x="0" y="0">
      <value name="TEXT">
        <block type="dynamic_text_join">
          <mutation items="3"></mutation>
          <value name="ADD0">
            <block type="text">
              <field name="TEXT">Hello </field>
            </block>
          </value>
          <value name="ADD1">
            <block type="text">
              <field name="TEXT">amazing </field>
            </block>
          </value>
          <value name="ADD2">
            <block type="text">
              <field name="TEXT">World!</field>
            </block>
          </value>
        </block>
      </value>
    </block>`
  }
];

export default function TextConcatenationGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Text Concatenation</Typography>
      
      <Typography variant="body1" paragraph>
        {`In this guide, we'll learn how to combine (concatenate) text strings using blocks. This is a fundamental operation when working with text in programming.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Creating a Text Block</Typography>
      <Typography variant="body1" paragraph>
        {`Let's start with a simple text block. This block contains the word "Hello". You can change this text to anything you like.`}
      </Typography>
      <div id="concat-step-1" style={{ marginBottom: '20px' }} />

      <Typography variant="h6" mt={4}>Step 2: Joining Two Text Blocks</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's combine two pieces of text. We'll use a "join text" block to concatenate "Hello" and "World". Notice how we've added a space after "Hello" to separate the words.`}
      </Typography>
      <div id="concat-step-2" style={{ marginBottom: '20px' }} />

      <Typography variant="h6" mt={4}>Step 3: Concatenating Multiple Texts and Printing</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, let's join three pieces of text and print the result. We're combining "Hello", "amazing", and "World!" into one message and then using a print block to display it.`}
      </Typography>
      <div id="concat-step-3" style={{ marginBottom: '20px' }} />

      <Typography variant="body1" paragraph>
        {`Excellent work! You've learned how to concatenate text strings. This skill is crucial for creating dynamic messages in your programs. Try modifying the text in these blocks to create your own messages!`}
      </Typography>
    </Box>
  );
}