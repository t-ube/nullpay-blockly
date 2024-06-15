import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Blockly from 'blockly/core';
import { Modal, Box, Typography } from '@mui/material';
import { 
  xrpl_blocks, xaman_blocks, text_blocks, math_blocks,
  control_blocks, time_blocks, json_blocks, animation_blocks,
  logic_blocks, loop_blocks, lists_blocks
} from '@/blocks/BlockContents';
import '@/components/BlocklyFlyoutModal.css';

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

interface FlyoutModalProps {
  onBlockSelected: (xml: Element, eventType: string, event: MouseEvent) => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  flyoutType: string | null;
  mainWorkspace: Blockly.WorkspaceSvg;
}

const toolbox = `
<xml id="toolbox" style={{ display: 'none' }}>
</xml>`;

const BlocklyFlyoutModal = ({ onBlockSelected, setOpen, open, flyoutType, mainWorkspace }: FlyoutModalProps) => {
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
      console.log(event.type);
      if (workspace && (event.type === 'selected' || event.type === 'click')) {
        const blockSvg = workspace.getBlockById(event.blockId);
        if (blockSvg) {
          let parentBlockSvg = blockSvg;
          let parent = parentBlockSvg.getSurroundParent();
          console.log(`parent:${parent}`);
          while (parent = parentBlockSvg.getSurroundParent()) {
            parentBlockSvg = parent;
          }
          const xml = Blockly.Xml.blockToDom(parentBlockSvg as Blockly.Block) as Element;
          const blockElement = parentBlockSvg.getSvgRoot();
          const rect = blockElement.getBoundingClientRect();
          console.log(`event:${JSON.stringify(rect)}`);
          const position = { x: rect.left, y: rect.top };
          console.log(`Bounding Rect: ${position}`);
          let dummyEvent: any = {
            clientX: rect.left,
            clientY: rect.top
          };
          onBlockSelected(xml, event.type, dummyEvent);
          handleClose();
        }
      }
    },
    [onBlockSelected, handleClose]
  );

  useEffect(() => {
    if (open && flyoutType && !dynamicUpdated) {
      let blocks = blockTypesMap[flyoutType];
      if (flyoutType === 'variable' || flyoutType === 'function') {
        const dynamicBlocks: Block[] = [];
        if (flyoutType === 'variable') {
          const elements = Blockly.Variables.flyoutCategoryBlocks(mainWorkspace);
          elements.forEach(xml => {
            dynamicBlocks.push({
              height: 40,
              block: Blockly.Xml.domToPrettyText(xml),
              title: '',
              description: '',
            });
          });
        } else if (flyoutType === 'function') {
          const elements = Blockly.Procedures.flyoutCategory(mainWorkspace);
          elements.forEach((xml, index) => {
            console.log(Blockly.Xml.domToPrettyText(xml));
            dynamicBlocks.push({
              height: index === 0 ? 90 : index === 1 ? 100 : 50,
              block: Blockly.Xml.domToPrettyText(xml),
              title: '',
              description: '',
            });
          });
        }
        setBlockTypesMap(prevMap => ({ ...prevMap, [flyoutType]: dynamicBlocks }));
        blocks = dynamicBlocks;
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
                });
                workspaceRefs.current.push({ id: divId, workspace });

                const blockDom = Blockly.utils.xml.textToDom(`<xml>${item.block}</xml>`);
                Blockly.Xml.clearWorkspaceAndLoadFromXml(blockDom, workspace);
                workspace.getAllBlocks().forEach(block => block.setMovable(false));

                const block = workspace.getAllBlocks(false)[0];
                if (flyoutType !== 'variable' && flyoutType !== 'function') {
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="flyout-modal-title"
      aria-describedby="flyout-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        maxHeight: '80vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        {flyoutType && blockTypesMap[flyoutType]?.map((item: Block, index: number) => (
          <Box key={index} mb={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {item.description}
            </Typography>
            <Box id={`flyoutDiv_${index}`} className="custom-cursor" sx={{ width: '100%', height: item.height, mb: 2 }} />
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default BlocklyFlyoutModal;