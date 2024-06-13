import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Blockly from 'blockly/core';
import { Drawer, Box, Typography, Divider } from '@mui/material';
import PuzzleIcon from '@mui/icons-material/Extension';
import { 
  xrpl_blocks, xaman_blocks, text_blocks, math_blocks,
  control_blocks, time_blocks, json_blocks, animation_blocks,
  logic_blocks, loops_blocks, lists_blocks
} from '@/blocks/flyoutContents';
import { BlockColors } from '@/blocks/BlockColors';

interface Block {
  height: number;
  block: string;
  title: string;
  description: string;
  categories: string[];
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
  loops: loops_blocks,
  lists: lists_blocks,
};

interface BlockDrawerMap {
  [key: string]: number;
}

const initialBlockDrawerMap : BlockDrawerMap = {
  xrpl: 350,
  xaman: 300,
  text: 300,
  math: 300,
  control: 300,
  time: 320,
  json: 300,
  animation: 300,
  logic: 300,
  loops: 300,
  lists: 300,
  variables: 300,
  functions: 300,
};

interface BlockTitleMap {
  [key: string]: string;
}

const initialBlockTitleMap : BlockTitleMap = {
  xrpl: 'XRPL',
  xaman: 'Xaman',
  text: 'Text',
  math: 'Math',
  control: 'Control',
  time: 'Time',
  json: 'JSON',
  animation: 'Animation',
  logic: 'Logic',
  loops: 'Loops',
  lists: 'Lists',
  variables: 'Variables',
  functions: 'Functions',
};


interface BlocklyDrawerProps {
  onBlockSelected: (xml: string, eventType: string, event: MouseEvent) => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  flyoutType: string | null;
  mainWorkspace: Blockly.WorkspaceSvg;
}

const toolbox = `
<xml id="toolbox" style={{ display: 'none' }}>
</xml>`;

const BlocklyDrawer = ({ onBlockSelected, setOpen, open, flyoutType, mainWorkspace }: BlocklyDrawerProps) => {
  const workspaceRefs = useRef<{ id: string, workspace: Blockly.WorkspaceSvg | null }[]>([]);
  const [blockTypesMap, setBlockTypesMap] = useState<BlockTypesMap>(initialBlockTypesMap);
  const [dynamicUpdated, setDynamicUpdated] = useState(false);

  const handleClose = useCallback(() => {
    workspaceRefs.current.forEach(({ workspace }) => {
      if (workspace) {
        workspace.clear();
        workspace.dispose();
      }
    });
    workspaceRefs.current = [];
    setOpen(false);
  }, [setOpen]);

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
          const xmlText = Blockly.Xml.domToText(xml);
          const blockElement = parentBlockSvg.getSvgRoot();
          const rect = blockElement.getBoundingClientRect();
          let dummyEvent: any = {
            clientX: rect.left,
            clientY: rect.top
          };
          onBlockSelected(xmlText, event.type, dummyEvent);
          handleClose();
        }
      }
    },
    [onBlockSelected, handleClose]
  );

  useEffect(() => {
    if (open && flyoutType && !dynamicUpdated) {
      let blocks : Block[] = [];

      if (flyoutType === 'variables' || flyoutType === 'functions') {
        const dynamicBlocks: Block[] = [];
        if (flyoutType === 'variables') {
          const elements = Blockly.Variables.flyoutCategoryBlocks(mainWorkspace);
          elements.forEach(xml => {
            dynamicBlocks.push({
              height: 40,
              block: Blockly.Xml.domToPrettyText(xml),
              title: '',
              description: '',
              categories: [],
            });
          });
        } else if (flyoutType === 'functions') {
          const elements = Blockly.Procedures.flyoutCategory(mainWorkspace);
          elements.forEach((xml, index) => {
            dynamicBlocks.push({
              height: index === 0 ? 60 : index === 1 ? 65 : index === 2 ? 30 : 100,
              block: Blockly.Xml.domToPrettyText(xml),
              title: '',
              description: '',
              categories: [],
            });
          });
        }
        setBlockTypesMap(prevMap => ({ ...prevMap, [flyoutType]: dynamicBlocks }));
        blocks = dynamicBlocks;
        setDynamicUpdated(true);
      } else {
        const dynamicBlocks: Block[] = blockTypesMap[flyoutType].filter(block => !block.categories?.includes('sample'));
        blocks = dynamicBlocks;
        setBlockTypesMap(prevMap => ({ ...prevMap, [flyoutType]: dynamicBlocks }));
        setDynamicUpdated(true);
      }

      setTimeout(() => {
        if (blocks && blocks.length > 0) {
          blocks.forEach((item, i) => {
            const divId = `flyoutDiv_${i}`;
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
                    startScale: 0.75, 
                  },
                });
                workspaceRefs.current.push({ id: divId, workspace });

                const blockDom = Blockly.utils.xml.textToDom(`<xml>${item.block}</xml>`);
                Blockly.Xml.clearWorkspaceAndLoadFromXml(blockDom, workspace);

                const block = workspace.getAllBlocks(false)[0];
                if (flyoutType !== 'variables' && flyoutType !== 'functions') {
                  const blockSvg = block.getSvgRoot();
                  if (blockSvg) {
                    const blockRect = blockSvg.getBoundingClientRect();
                    container.style.width = `${blockRect.width}px`;
                    container.style.height = `${blockRect.height}px`;
                  }
                }

                workspace.addChangeListener((event: any) => handleBlockClick(divId, event));
              }
            } else {
              console.error(`Container with id ${divId} not found`);
            }
          });
        }
      }, 0);
    }
  }, [open, flyoutType, handleBlockClick, blockTypesMap, mainWorkspace, dynamicUpdated]);

  useEffect(() => {
    return () => {
      workspaceRefs.current.forEach(({ workspace }) => {
        workspace?.dispose();
      });
      workspaceRefs.current = [];
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setDynamicUpdated(false);
    }
  }, [open]);

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="left"
    >
      <Box sx={{
        width: flyoutType ? initialBlockDrawerMap[flyoutType] : 300,
        maxHeight: '100vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        p: 4,
        pt: 2,
        pr: 2
      }}>
        <Box sx={{display: 'flex'}}>
          <PuzzleIcon sx={{color: flyoutType ? BlockColors[flyoutType] : '#ccc' }} />
          <Typography variant="subtitle1" px={1} sx={{ fontWeight: 'bold', color: '#333333' }}>
            {flyoutType ? initialBlockTitleMap[flyoutType] : 'unknown'} {'Blocks'}
          </Typography>
        </Box>
        <Divider />
        {flyoutType && blockTypesMap[flyoutType]?.map((item: Block, index: number) => (
          <Box key={index} mt={2} mb={3}>
            <Box id={`flyoutDiv_${index}`} sx={{ width: '100%', height: item.height, mb: 2 }} />
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default BlocklyDrawer;
