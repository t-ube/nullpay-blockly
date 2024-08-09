'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'if-else-step-1',
    block: `
      <block type="dynamic_if" x="0" y="0">
        <value name="IF0">
          <block type="logic_compare">
            <field name="OP">GT</field>
            <value name="A">
              <block type="math_number">
                <field name="NUM">10</field>
              </block>
            </value>
            <value name="B">
              <block type="math_number">
                <field name="NUM">5</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO0">
          <block type="text_print">
            <value name="TEXT">
              <block type="text">
                <field name="TEXT">10 is greater than 5</field>
              </block>
            </value>
          </block>
        </statement>
      </block>
    `
  },
  {
    id: 'if-else-step-2',
    block: `
      <variables>
        <variable id="amountVar">amount</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="amountVar">amount</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">1500</field>
          </block>
        </value>
        <next>
          <block type="controls_if">
            <mutation else="1"></mutation>
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">GT</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR" id="amountVar">amount</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number">
                    <field name="NUM">1000</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="text_print">
                <value name="TEXT">
                  <block type="text">
                    <field name="TEXT">You qualify for a discount!</field>
                  </block>
                </value>
              </block>
            </statement>
            <statement name="ELSE">
              <block type="text_print">
                <value name="TEXT">
                  <block type="text">
                    <field name="TEXT">No discount applied.</field>
                  </block>
                </value>
              </block>
            </statement>
          </block>
        </next>
      </block>
    `
  },
  {
    id: 'if-else-step-3',
    block: `
      <variables>
        <variable id="scoreVar">score</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="scoreVar">score</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">75</field>
          </block>
        </value>
        <next>
          <block type="dynamic_if">
            <mutation elseif="2" else="1"></mutation>
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">GTE</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR" id="scoreVar">score</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number">
                    <field name="NUM">90</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="text_print">
                <value name="TEXT">
                  <block type="text">
                    <field name="TEXT">Excellent! You got an A.</field>
                  </block>
                </value>
              </block>
            </statement>
            <value name="IF1">
              <block type="logic_compare">
                <field name="OP">GTE</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR" id="scoreVar">score</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number">
                    <field name="NUM">80</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO1">
              <block type="text_print">
                <value name="TEXT">
                  <block type="text">
                    <field name="TEXT">Great job! You got a B.</field>
                  </block>
                </value>
              </block>
            </statement>
            <value name="IF2">
              <block type="logic_compare">
                <field name="OP">GTE</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR" id="scoreVar">score</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number">
                    <field name="NUM">70</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO2">
              <block type="text_print">
                <value name="TEXT">
                  <block type="text">
                    <field name="TEXT">Good work! You got a C.</field>
                  </block>
                </value>
              </block>
            </statement>
            <statement name="ELSE">
              <block type="text_print">
                <value name="TEXT">
                  <block type="text">
                    <field name="TEXT">You need to study more.</field>
                  </block>
                </value>
              </block>
            </statement>
          </block>
        </next>
      </block>
    `
  }
];

export default function IfElseGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Making Decisions with If-Else</Typography>
      
      <Typography variant="body1" paragraph>
        {`In this guide, we'll learn how to make decisions in our programs using if-else statements. These allow our programs to behave differently based on certain conditions.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Simple If Statement</Typography>
      <Typography variant="body1" paragraph>
        {`Let's start with a simple if statement. This block checks if 10 is greater than 5, and if it is, it prints a message.`}
      </Typography>
      <div id="if-else-step-1" style={{ marginBottom: '20px' }} />

      <Typography variant="h6" mt={4}>Step 2: If-Else Statement</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's use an if-else statement to make a decision based on a purchase amount. We'll set an amount variable and then check if it qualifies for a discount.`}
      </Typography>
      <div id="if-else-step-2" style={{ marginBottom: '20px' }} />

      <Typography variant="h6" mt={4}>Step 3: Multiple Conditions (If-Else If-Else)</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, let's use multiple conditions to grade a score. We'll use if, else if, and else to assign a letter grade based on a numerical score.`}
      </Typography>
      <div id="if-else-step-3" style={{ marginBottom: '20px' }} />

      <Typography variant="body1" paragraph>
        {`Great job! You've learned how to use if-else statements to make decisions in your programs. These are fundamental tools in programming that allow your code to respond differently based on various conditions. Try changing the values or conditions to see how the output changes!`}
      </Typography>
    </Box>
  );
}