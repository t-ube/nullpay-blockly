'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'while-step-1',
    block: `
      <variables>
        <variable id="counterVar">counter</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="counterVar">counter</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
        <next>
          <block type="controls_whileUntil">
            <field name="MODE">WHILE</field>
            <value name="BOOL">
              <block type="logic_compare">
                <field name="OP">LTE</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR" id="counterVar">counter</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number">
                    <field name="NUM">5</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO">
              <block type="text_print">
                <value name="TEXT">
                  <block type="variables_get">
                    <field name="VAR" id="counterVar">counter</field>
                  </block>
                </value>
                <next>
                  <block type="variables_set">
                    <field name="VAR" id="counterVar">counter</field>
                    <value name="VALUE">
                      <block type="math_arithmetic">
                        <field name="OP">ADD</field>
                        <value name="A">
                          <block type="variables_get">
                            <field name="VAR" id="counterVar">counter</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="math_number">
                            <field name="NUM">1</field>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </next>
              </block>
            </statement>
          </block>
        </next>
      </block>
    `
  },
  {
    id: 'while-step-2',
    block: `
      <variables>
        <variable id="totalVar">total</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="totalVar">total</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">0</field>
          </block>
        </value>
        <next>
          <block type="controls_whileUntil">
            <field name="MODE">WHILE</field>
            <value name="BOOL">
              <block type="logic_compare">
                <field name="OP">LT</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR" id="totalVar">total</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number">
                    <field name="NUM">100</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO">
              <block type="variables_set">
                <field name="VAR" id="totalVar">total</field>
                <value name="VALUE">
                  <block type="math_arithmetic">
                    <field name="OP">ADD</field>
                    <value name="A">
                      <block type="variables_get">
                        <field name="VAR" id="totalVar">total</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="math_random_int">
                        <value name="FROM">
                          <block type="math_number">
                            <field name="NUM">1</field>
                          </block>
                        </value>
                        <value name="TO">
                          <block type="math_number">
                            <field name="NUM">10</field>
                          </block>
                        </value>
                      </block>
                    </value>
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
    id: 'while-step-3',
    block: `
        <variables>
          <variable id="totalVar">total</variable>
        </variables>
        <block type="variables_set" x="0" y="0">
          <field name="VAR" id="totalVar">total</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">0</field>
            </block>
          </value>
          <next>
            <block type="controls_whileUntil">
              <field name="MODE">WHILE</field>
              <value name="BOOL">
                <block type="logic_compare">
                  <field name="OP">LT</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR" id="totalVar">total</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="math_number">
                      <field name="NUM">100</field>
                    </block>
                  </value>
                </block>
              </value>
              <statement name="DO">
                <block type="variables_set">
                  <field name="VAR" id="totalVar">total</field>
                  <value name="VALUE">
                    <block type="math_arithmetic">
                      <field name="OP">ADD</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR" id="totalVar">total</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_random_int">
                          <value name="FROM">
                            <block type="math_number">
                              <field name="NUM">1</field>
                            </block>
                          </value>
                          <value name="TO">
                            <block type="math_number">
                              <field name="NUM">10</field>
                            </block>
                          </value>
                        </block>
                      </value>
                    </block>
                  </value>
                  <next>
                    <block type="text_print">
                      <value name="TEXT">
                        <block type="dynamic_text_join">
                          <mutation items="2"></mutation>
                          <value name="ADD0">
                            <block type="text">
                              <field name="TEXT">Current total: </field>
                            </block>
                          </value>
                          <value name="ADD1">
                            <block type="variables_get">
                              <field name="VAR" id="totalVar">total</field>
                            </block>
                          </value>
                        </block>
                      </value>
                    </block>
                  </next>
                </block>
              </statement>
            </block>
          </next>
        </block>
    `
  }
];

export default function WhileLoopGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Repeating Actions with While Loops</Typography>
      
      <Typography variant="body1" paragraph>
        {`In this guide, we'll learn how to use while loops to repeat actions in our programs. While loops allow us to execute a set of instructions repeatedly as long as a certain condition is true.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Basic While Loop</Typography>
      <Typography variant="body1" paragraph>
        {`Let's start with a simple while loop that counts from 1 to 5. We'll use a counter variable and increment it inside the loop.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="while-step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: While Loop with a Condition</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's use a while loop to add random numbers until we reach a total of at least 100. This demonstrates how while loops can be used with more complex conditions.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="while-step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: While Loop with Print Statements</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, let's modify our previous example to print the current total after each addition. This shows how we can perform multiple actions within a loop and track the progress of our loop.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="while-step-3"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Great job! You've learned how to use while loops to repeat actions in your programs. While loops are powerful tools that allow you to execute code repeatedly based on a condition. Try modifying the conditions or actions in these loops to see how they behave differently!`}
      </Typography>
    </Box>
  );
}