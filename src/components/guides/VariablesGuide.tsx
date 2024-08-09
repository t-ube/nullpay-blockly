'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'var-step-1',
    block: `
      <variables>
        <variable id="scoreVar">score</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="scoreVar">score</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">0</field>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'var-step-2',
    block: `
      <variables>
        <variable id="scoreVar">score</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="scoreVar">score</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">0</field>
          </block>
        </value>
        <next>
          <block type="text_print">
            <value name="TEXT">
              <block type="variables_get">
                <field name="VAR" id="scoreVar">score</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    `
  },
  {
    id: 'var-step-3',
    block: `
      <variables>
        <variable id="scoreVar">score</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="scoreVar">score</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">0</field>
          </block>
        </value>
        <next>
          <block type="text_print">
            <value name="TEXT">
              <block type="dynamic_text_join">
                <mutation items="2"></mutation>
                <value name="ADD0">
                  <block type="text">
                    <field name="TEXT">Initial score: </field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="variables_get">
                    <field name="VAR" id="scoreVar">score</field>
                  </block>
                </value>
              </block>
            </value>
            <next>
              <block type="variables_set">
                <field name="VAR" id="scoreVar">score</field>
                <value name="VALUE">
                  <block type="math_arithmetic">
                    <field name="OP">ADD</field>
                    <value name="A">
                      <block type="variables_get">
                        <field name="VAR" id="scoreVar">score</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="math_number">
                        <field name="NUM">10</field>
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
                            <field name="TEXT">Updated score: </field>
                          </block>
                        </value>
                        <value name="ADD1">
                          <block type="variables_get">
                            <field name="VAR" id="scoreVar">score</field>
                          </block>
                        </value>
                      </block>
                    </value>
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

export default function VariablesGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Working with Variables</Typography>
      
      <Typography variant="body1" paragraph>
        {`In this guide, we'll learn how to work with variables. Variables are like containers that store information in your program, and you can change their contents as your program runs.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Creating a Variable</Typography>
      <Typography variant="body1" paragraph>
        {`Let's start by creating a variable called "score" and setting its initial value to 0. This might represent a player's score in a game.`}
      </Typography>
      <div id="var-step-1" style={{ marginBottom: '20px' }} />

      <Typography variant="h6" mt={4}>Step 2: Using a Variable</Typography>
      <Typography variant="body1" paragraph>
        {`Now that we have created our "score" variable, let's use it in our program. We'll print the value of the score to see what it contains.`}
      </Typography>
      <div id="var-step-2" style={{ marginBottom: '20px' }} />

      <Typography variant="h6" mt={4}>Step 3: Updating a Variable</Typography>
      <Typography variant="body1" paragraph>
        {`Variables are useful because we can change their values. Let's update our score by adding 10 points, then print the new score.`}
      </Typography>
      <Typography variant="body1" paragraph>
        {`This example sets the initial score to 0, prints it, then adds 10 to the score and prints the updated value.`}
      </Typography>
      <div id="var-step-3" style={{ marginBottom: '20px' }} />

      <Typography variant="body1" paragraph>
        {`Great job! You've learned how to create, use, and update variables. Variables are fundamental in programming as they allow your programs to store and manipulate data. Try changing the initial value or the amount added to the score to see how it affects the output!`}
      </Typography>
    </Box>
  );
}