'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'add-list-step-1',
    block: `
      <variables>
        <variable id="listVar">fruits</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="listVar">fruits</field>
        <value name="VALUE">
          <block type="dynamic_list_create">
            <mutation items="2"></mutation>
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
          </block>
        </value>
      </block>
    `
  },
  {
    id: 'add-list-step-2',
    block: `
      <variables>
        <variable id="listVar">fruits</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="listVar">fruits</field>
        <value name="VALUE">
          <block type="dynamic_list_create">
            <mutation items="2"></mutation>
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
          </block>
        </value>
        <next>
          <block type="lists_append">
            <value name="LIST">
              <block type="variables_get">
                <field name="VAR" id="listVar">fruits</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    `
  },
  {
    id: 'add-list-step-3',
    block: `
      <variables>
        <variable id="listVar">fruits</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR" id="listVar">fruits</field>
        <value name="VALUE">
          <block type="dynamic_list_create">
            <mutation items="2"></mutation>
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
          </block>
        </value>
        <next>
          <block type="lists_append">
            <value name="LIST">
              <block type="variables_get">
                <field name="VAR" id="listVar">fruits</field>
              </block>
            </value>
            <value name="ITEM">
              <block type="text">
                <field name="TEXT">cherry</field>
              </block>
            </value>
            <next>
              <block type="text_print">
                <value name="TEXT">
                  <block type="variables_get">
                    <field name="VAR" id="listVar">fruits</field>
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

export default function AddingToListGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Adding Items to a List</Typography>
      
      <Typography variant="body1" paragraph>
        {`In this guide, we'll learn how to add new items to an existing list. This is a common operation when working with lists in programming.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Creating an Initial List</Typography>
      <Typography variant="body1" paragraph>
        {`Let's start by creating a list of fruits and storing it in a variable. This list initially contains two items: "apple" and "banana".`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="add-list-step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Adding a New Item to the List</Typography>
        <Typography variant="body1" paragraph>
        {`Now, let's add a new item to our list. We'll use the "append to list" block to add "cherry" to our fruits list. This block adds the new item to the end of the list.`}
        </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="add-list-step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Displaying the Updated List</Typography>
      <Typography variant="body1" paragraph>
        {`Finally, let's print our updated list to see the result. We'll create the initial list, add "cherry" to it, and then print the entire list.`}
      </Typography>
      <Typography variant="body1" paragraph>
        {`When you run this code, it will print the entire list, which should now contain three items: ["apple", "banana", "cherry"].`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="add-list-step-3"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Great job! You've learned how to add new items to an existing list. This skill is crucial when working with dynamic data in your programs. Try adding different items or multiple items to the list to see how it works!`}
      </Typography>
    </Box>
  );
}