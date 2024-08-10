'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'loop-list-step-1',
    block: `
      <variables>
        <variable id="listVar">fruits</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="listVar">fruits</field>
        <value name="VALUE">
          <block type="dynamic_list_create">
            <mutation items="3"></mutation>
            <value name="ADD0">
              <block type="text">
                <field name="TEXT">apple</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="text">
                <field name="TEXT">banana</field>
              </block>
            </value>
            <value name="ADD2">
              <block type="text">
                <field name="TEXT">cherry</field>
              </block>
            </value>
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'loop-list-step-2',
    block: `
      <variables>
        <variable id="listVar">fruits</variable>
        <variable id="itemVar">item</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="listVar">fruits</field>
        <value name="VALUE">
          <block type="dynamic_list_create">
            <mutation items="3"></mutation>
            <value name="ADD0">
              <block type="text">
                <field name="TEXT">apple</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="text">
                <field name="TEXT">banana</field>
              </block>
            </value>
            <value name="ADD2">
              <block type="text">
                <field name="TEXT">cherry</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="controls_forEach">
            <field name="VAR" id="itemVar">item</field>
            <value name="LIST">
              <block type="variables_get">
                <field name="VAR" id="listVar">fruits</field>
              </block>
            </value>
            <statement name="DO">
              <block type="text_print">
                <value name="TEXT">
                  <block type="variables_get">
                    <field name="VAR" id="itemVar">item</field>
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
    id: 'loop-list-step-3',
    block: `
      <variables>
        <variable id="listVar">fruits</variable>
        <variable id="itemVar">item</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="listVar">fruits</field>
        <value name="VALUE">
          <block type="dynamic_list_create">
            <mutation items="3"></mutation>
            <value name="ADD0">
              <block type="text">
                <field name="TEXT">apple</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="text">
                <field name="TEXT">banana</field>
              </block>
            </value>
            <value name="ADD2">
              <block type="text">
                <field name="TEXT">cherry</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="controls_forEach">
            <field name="VAR" id="itemVar">item</field>
            <value name="LIST">
              <block type="variables_get">
                <field name="VAR" id="listVar">fruits</field>
              </block>
            </value>
            <statement name="DO">
              <block type="text_print">
                <value name="TEXT">
                  <block type="dynamic_text_join">
                    <mutation items="2"></mutation>
                    <value name="ADD0">
                      <block type="text">
                        <field name="TEXT">I like </field>
                      </block>
                    </value>
                    <value name="ADD1">
                      <block type="variables_get">
                        <field name="VAR" id="itemVar">item</field>
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
  }
];

export default function LoopingListGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Looping Through a List</Typography>
      
      <Typography variant="body1" paragraph>
        {`In this guide, we'll learn how to loop through each item in a list. This is a fundamental technique for processing all elements in a list one by one.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Creating a List</Typography>
      <Typography variant="body1" paragraph>
        {`First, let's create a list of fruits and store it in a variable. This list contains three items: "apple", "banana", and "cherry".`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="loop-list-step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Looping Through the List</Typography>
      <Typography variant="body1" paragraph>
        {`Now, we'll use a "for each" loop to go through each item in our list. For each item, we'll print it to see the contents of our list.`}
      </Typography>
      <Typography variant="body1" paragraph>
        {`The "for each" block creates a temporary variable (we've named it "item") that takes on the value of each list element in turn.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="loop-list-step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Doing Something with Each Item</Typography>
      <Typography variant="body1" paragraph>
        {`Let's make our loop a bit more interesting. Instead of just printing each item, we'll create a sentence for each fruit.`}
      </Typography>
      <Typography variant="body1" paragraph>
        {`This example will print "I like apple", "I like banana", and "I like cherry" on separate lines.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="loop-list-step-3"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Great job! You've learned how to loop through a list and perform an action for each item. This technique is very powerful and is often used in programming to process collections of data. Try modifying the list or changing the action inside the loop to see what happens!`}
      </Typography>
    </Box>
  );
}