'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'math-step-1',
    block: `<block type="math_arithmetic" x="0" y="0">
      <field name="OP">ADD</field>
      <value name="A">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="B">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>`
  },
  {
    id: 'math-step-2',
    block: `<block type="math_arithmetic" x="0" y="0">
      <field name="OP">MULTIPLY</field>
      <value name="A">
        <shadow type="math_number">
          <field name="NUM">5</field>
        </shadow>
      </value>
      <value name="B">
        <shadow type="math_number">
          <field name="NUM">3</field>
        </shadow>
      </value>
    </block>`
  },
  {
    id: 'math-step-3',
    block: `<block type="text_print" x="0" y="0">
      <value name="TEXT">
        <block type="math_arithmetic">
          <field name="OP">DIVIDE</field>
          <value name="A">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value>
          <value name="B">
            <shadow type="math_number">
              <field name="NUM">2</field>
            </shadow>
          </value>
        </block>
      </value>
    </block>`
  }
];

export default function BasicMathGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Basic Math Operations</Typography>
      
      <Typography variant="body1" paragraph>
        {`In this guide, we'll learn how to perform basic mathematical operations using blocks. We'll cover addition, multiplication, and division.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Addition</Typography>
      <Typography variant="body1" paragraph>
        {`Let's start with addition. Here's a block that adds two numbers (1 + 1). You can change these numbers to add different values.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="math-step-1" />
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Multiplication</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's try multiplication. This block multiplies 5 by 3. Feel free to modify these numbers to explore different multiplications.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="math-step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Division and Printing</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, let's combine division with printing the result. This block divides 10 by 2 and then prints the result. This is how you can display the outcome of a mathematical operation.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="math-step-3"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Great job! You've now learned how to perform basic math operations using blocks. Try changing the numbers or operations to see different results.`}
      </Typography>
    </Box>
  );
}