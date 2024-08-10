'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { IGuideProps, useWorkspaceManager } from '@/components/GuideUtils';

const workspaces = [
  {
    id: 'list-step-1',
    block: `<block type="dynamic_list_create" x="0" y="0">
      <value name="ADD0">
        <block type="text">
          <field name="TEXT">apple</field>
        </block>
      </value>
    </block>`
  },
  {
    id: 'list-step-2',
    block: `<block type="variables_set" x="0" y="0">
      <field name="VAR" id="listVar">fruits</field>
      <value name="VALUE">
        <block type="dynamic_list_create">
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
    </block>`
  },
  {
    id: 'list-step-3',
    block: `
      <variables>
        <variable id="listVar">fruits</variable>
      </variables>
      <block type="variables_set" x="0" y="0">
        <field name="VAR">fruits</field>
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
          <block type="text_print">
            <value name="TEXT">
              <block type="lists_getIndex">
                <mutation statement="false" at="true"></mutation>
                <field name="MODE">GET</field>
                <field name="WHERE">FROM_START</field>
                <value name="VALUE">
                  <block type="variables_get">
                    <field name="VAR" id="listVar">fruits</field>
                  </block>
                </value>
                <value name="AT">
                  <block type="math_number">
                    <field name="NUM">2</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </next>
      </block>
    `
  }
];

export default function CreatingListGuide({ onBlockSelectedV2, onClose }: IGuideProps) {
  useWorkspaceManager(workspaces, onBlockSelectedV2, onClose);

  return (
    <Box>
      <Typography variant="h4">Creating a List</Typography>
      
      <Typography variant="body1" paragraph>
        {`In this guide, we'll learn how to create and work with lists. Lists are useful for storing multiple items in a single variable.`}
      </Typography>

      <Typography variant="h6" mt={4}>Step 1: Creating a Simple List</Typography>
      <Typography variant="body1" paragraph>
        {`Let's start by creating a simple list. The block below creates a list that starts with one item: "apple". You can easily add more items by dragging text blocks or other value blocks directly into this list block. Try adding "banana" and "cherry" to your list!`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="list-step-1"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 2: Storing a List in a Variable</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's store our list in a variable called "fruits". This allows us to reuse the list later in our program. We've created a list with three items: "apple", "banana", and "cherry". Remember, you can add or remove items simply by dragging blocks in or out of the list.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="list-step-2"/>
      </Box>

      <Typography variant="h6" mt={4}>Step 3: Creating, Storing, and Accessing List Items</Typography>
      <Typography variant="body1" paragraph>
        {`Now, let's put it all together. In this example, we'll create a list of fruits, store it in a variable, and then access and print a specific item from the list.`}
      </Typography>
      <Typography variant="body1" paragraph>
        {`First, we create a list with two fruits: "apple" and "banana", and store it in a variable called "fruits". Then, we print the second item in the list. Remember, list indexing typically starts at 0, so to get the second item, we use index 2.`}
      </Typography>
      <Typography variant="body1" paragraph>
        {`When you run this code, it will print "banana" because that's the second item in our list.`}
      </Typography>
      <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} marginBottom={'20px'} overflow="auto">
        <div id="list-step-3"/>
      </Box>

      <Typography variant="body1" paragraph>
        {`Great job! You've learned how to create a list, store it in a variable, and access its items. This example demonstrates a common pattern in programming: creating data structures, storing them for later use, and then retrieving specific information when needed. Try modifying the list items or accessing different elements to see how it works!`}
      </Typography>
    </Box>
  );
}