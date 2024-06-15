import React, { useState, useRef, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import PuzzleIcon from '@mui/icons-material/Extension';
import * as Blockly from 'blockly/core';
import { BlockColors } from '@/blocks/BlockColors';
import {
  xrpl_blocks, xaman_blocks, text_blocks, math_blocks,
  control_blocks, time_blocks, json_blocks, animation_blocks,
  logic_blocks, loop_blocks, lists_blocks
} from '@/blocks/BlockContents';

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

interface Block {
  height: number;
  block: string;
  title: string;
  description: string;
}

interface BlockTypesMap {
  [key: string]: Block[];
}

const initialBlockTypesMap: BlockTypesMap = {
  xrpl: xrpl_blocks,
  xaman: xaman_blocks,
  text: text_blocks,
  math: math_blocks,
  control: control_blocks,
  time: time_blocks,
  json: json_blocks,
  animation: animation_blocks,
  logic: logic_blocks,
  loop: loop_blocks,
  list: lists_blocks,
};

export default function BlocklySidebarTest() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const workspaceRefs = useRef<{ id: string, workspace: Blockly.WorkspaceSvg | null }[]>([]);
  const [blockTypesMap, setBlockTypesMap] = useState<BlockTypesMap>(initialBlockTypesMap);
  const [dynamicUpdated, setDynamicUpdated] = useState(false);

  const handleWorkspaceToggle = (type: string) => {
    setOpenMenu(prevOpenMenu => (prevOpenMenu === type ? null : type));
  };

  const handleBlockClick = useCallback(
    (workspaceId: string, event: any) => {
      const workspace = workspaceRefs.current.find(ws => ws.id === workspaceId)?.workspace;
      if (workspace && (event.type === 'selected' || event.type === 'click' || event.type === 'drag')) {
        const blockSvg = workspace.getBlockById(event.blockId);
        if (blockSvg) {
          let parentBlockSvg = blockSvg;
          let parent = parentBlockSvg.getSurroundParent();
          while (parent = parentBlockSvg.getSurroundParent()) {
            parentBlockSvg = parent;
          }
          const xml = Blockly.Xml.blockToDom(parentBlockSvg as Blockly.Block) as Element;
          const blockElement = parentBlockSvg.getSvgRoot();
          const rect = blockElement.getBoundingClientRect();
          let dummyEvent: any = {
            clientX: rect.left,
            clientY: rect.top
          };
          console.log('Block selected:', xml, event.type, dummyEvent);
        }
      }
    },
    []
  );

  useEffect(() => {
    console.log('useEffect');
    if (openMenu && !dynamicUpdated) {
      console.log('openMenu && !dynamicUpdated');
      const blocks = blockTypesMap[openMenu.toLowerCase()];
      setTimeout(() => {
        console.log('setTimeout');
        if (blocks && blocks.length > 0) {
          console.log('blocks && blocks.length > 0');
          blocks.forEach((item, i) => {
            const divId = `flyoutDiv_${i}`;
            console.log(divId);
            const container = document.getElementById(divId);
            if (container) {
              const existingWorkspace = workspaceRefs.current.find(ws => ws.id === divId)?.workspace;
              if (!existingWorkspace) {
                const workspace = Blockly.inject(divId, {
                  readOnly: false,
                  scrollbars: false,
                  zoom: {
                    controls: false,
                    wheel: false,
                    startScale: 0.7,
                  },
                });
                workspaceRefs.current.push({ id: divId, workspace });

                const blockDom = Blockly.utils.xml.textToDom(`<xml>${item.block}</xml>`);
                Blockly.Xml.clearWorkspaceAndLoadFromXml(blockDom, workspace);

                const block = workspace.getAllBlocks(false)[0];
                const blockSvg = block.getSvgRoot();
                if (blockSvg) {
                  const blockRect = blockSvg.getBoundingClientRect();
                  container.style.width = `${blockRect.width}px`;
                  container.style.height = `${blockRect.height}px`;
                }

                workspace.addChangeListener((event: any) => handleBlockClick(divId, event));
              }
            } else {
              console.error(`Container with id ${divId} not found`);
            }
          });
          setDynamicUpdated(true);
        }
      }, 0);
    }
  }, [openMenu, blockTypesMap, handleBlockClick, dynamicUpdated]);

  useEffect(() => {
    return () => {
      workspaceRefs.current.forEach(({ workspace }) => {
        workspace?.dispose();
      });
      workspaceRefs.current = [];
    };
  }, []);

  useEffect(() => {
    if (!openMenu) {
      setDynamicUpdated(false);
    }
  }, [openMenu]);

  const menuItems = [
    { type: 'item', label: 'XRPL', color: BlockColors.xrpl, blocks: xrpl_blocks },
    { type: 'item', label: 'Xaman', color: BlockColors.xaman, blocks: xaman_blocks },
    { type: 'item', label: 'Text', color: BlockColors.text, blocks: text_blocks },
    { type: 'item', label: 'Math', color: BlockColors.math, blocks: math_blocks },
    { type: 'item', label: 'Control', color: BlockColors.control, blocks: control_blocks },
    { type: 'item', label: 'Time', color: BlockColors.time, blocks: time_blocks },
    { type: 'item', label: 'JSON', color: BlockColors.json, blocks: json_blocks },
    { type: 'item', label: 'Animation', color: BlockColors.animation, blocks: animation_blocks },
    { type: 'item', label: 'Logic', color: BlockColors.logic, blocks: logic_blocks },
    { type: 'item', label: 'Loops', color: BlockColors.loop, blocks: loop_blocks },
    { type: 'item', label: 'Lists', color: BlockColors.list, blocks: lists_blocks },
    { type: 'item', label: 'Variables', color: BlockColors.variable, blocks: text_blocks },
    { type: 'item', label: 'Functions', color: BlockColors.function, blocks: text_blocks },
  ];

  function getGroupItem(item: any) {
    const isOpen = openMenu === item.label;
    return (
      <React.Fragment key={item.label}>
        <ListItemButton
          onClick={() => handleWorkspaceToggle(item.label)}
          sx={{
            px: 3,
            pt: 1,
            pb: isOpen ? 0 : 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, pr: 2 }}>
            <PuzzleIcon sx={{ color: item.color }} />
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: '20px',
              color: '#515757',
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              ml: 'auto',
              transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)',
              transition: '0.2s',
            }}
          />
        </ListItemButton>
        {isOpen && (
          <Box sx={{ pl: 4 }}>
            {item.blocks.map((block: Block, index: number) => (
              <Box key={index} mb={3}>
                <Box id={`flyoutDiv_${index}`} sx={{ width: '100%', height: block.height, mb: 2 }} />
              </Box>
            ))}
          </Box>
        )}
      </React.Fragment>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            primary: { main: 'rgb(102, 157, 246)' },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }}>
          <FireNav component="nav" disablePadding>
            <Box sx={{ pb: 0 }}>
              {menuItems.map((item, index) => (
                <div key={index}>
                  {getGroupItem(item)}
                </div>
              ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
