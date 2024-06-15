import React, { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import * as Blockly from 'blockly/core';
import { Box, Modal, TextField, Typography, InputAdornment, Chip, Stack, IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import { MagnifyingGlassIcon, XCircleIcon, ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import {
  xrpl_blocks, xaman_blocks, text_blocks, math_blocks,
  control_blocks, time_blocks, json_blocks, animation_blocks,
  logic_blocks, loops_blocks, lists_blocks
} from '@/blocks/BlockContents';
import { BlockColors } from '@/blocks/BlockColors';
import { useMobile } from '@/contexts/MobileContext';

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

interface FlyoutModalProps {
  onBlockSelected: (xml: string, eventType: string, event: MouseEvent) => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  mainWorkspace: Blockly.WorkspaceSvg;
}

const BlocklySearchFlyout = ({ onBlockSelected, setOpen, open, mainWorkspace }: FlyoutModalProps) => {
  const { isMobile, isLoaded } = useMobile();
  const workspaceRefs = useRef<{ id: string, workspace: Blockly.WorkspaceSvg | null }[]>([]);
  const [blockTypesMap, setBlockTypesMap] = useState<BlockTypesMap>(initialBlockTypesMap);
  const [dynamicUpdated, setDynamicUpdated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
          const xml = Blockly.Xml.blockToDom(blockSvg as Blockly.Block) as Element;
          const xmlText = Blockly.Xml.domToText(xml);
          const blockElement = blockSvg.getSvgRoot();
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

  const disposeWorkspaces = useCallback(() => {
    workspaceRefs.current.forEach(({ workspace }) => {
      if (workspace) {
        workspace.clear();
        workspace.dispose();
      }
    });
    workspaceRefs.current = [];
  }, []);

  const createWorkspaces = useCallback((blocks: Block[]) => {
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
                startScale: isMobile ? 0.5 : 0.8,
              },
            });
            workspaceRefs.current.push({ id: divId, workspace });

            const blockDom = Blockly.utils.xml.textToDom(`<xml>${item.block}</xml>`);
            Blockly.Xml.clearWorkspaceAndLoadFromXml(blockDom, workspace);

            const block = workspace.getAllBlocks(false)[0];
            if (block) {
              const blockSvg = block.getSvgRoot();
              if (blockSvg) {
                const blockRect = blockSvg.getBoundingClientRect();
                container.style.width = `${blockRect.width}px`;
                container.style.height = `${blockRect.height}px`;
                workspace.resize();
              }
            }

            workspace.addChangeListener((event: any) => handleBlockClick(divId, event));
          }
        } else {
          // console.log(`Container with id ${divId} not found`);
        }
      });
    }
  }, [handleBlockClick, isMobile]);

  const rankBlocks = (blocks: Block[], term: string): Block[] => {
    const terms = term.toLowerCase().split(' ').filter(t => t);
    return blocks.map(block => {
      const titleMatchCount = terms.filter(t => block.title.toLowerCase().includes(t)).length;
      const descriptionMatchCount = terms.filter(t => block.description.toLowerCase().includes(t)).length;
      const categoryMatchCount = terms.filter(t => block.categories.some(category => category.toLowerCase().includes(t))).length;
      const sampleBonus = block.categories.includes('sample') ? 1 : 0; // 'sample' カテゴリのブロックにボーナスを追加
      const score = titleMatchCount + descriptionMatchCount + categoryMatchCount + sampleBonus;
      return { ...block, score };
    }).sort((a, b) => b.score - a.score);
  };

  const handleChipClick = (category: string) => {
    setSearchTerm(prevTerm => `${prevTerm} ${category}`.trim());
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    if (open && !dynamicUpdated) {
      const allBlocks = Object.values(blockTypesMap).flat();
      let filteredBlocks = rankBlocks(allBlocks, searchTerm).slice(0, 20);

      setTimeout(() => {
        disposeWorkspaces();
        createWorkspaces(filteredBlocks);
      }, 0);
    }
  }, [open, handleBlockClick, blockTypesMap, mainWorkspace, dynamicUpdated, disposeWorkspaces, createWorkspaces, searchTerm]);

  useEffect(() => {
    return () => {
      disposeWorkspaces();
    };
  }, [disposeWorkspaces]);

  useEffect(() => {
    if (!open) {
      setDynamicUpdated(false);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const allBlocks = Object.values(blockTypesMap).flat();
      const filteredBlocks = rankBlocks(allBlocks, searchTerm).slice(0, 20);
      disposeWorkspaces();
      createWorkspaces(filteredBlocks);
    }
  }, [searchTerm, blockTypesMap, disposeWorkspaces, createWorkspaces, open]);

  useEffect(() => {
    if (open) {
      document.getElementById('search-input')?.focus();
    }
  }, [open]);

  const allBlocks = Object.values(blockTypesMap).flat();
  const filteredBlocks = rankBlocks(allBlocks, searchTerm).slice(0, 20);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="flyout-modal-title"
      aria-describedby="flyout-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '0px',
        left: isMobile ? '0%' : '50%',
        transform: isMobile ? 'translate(0, 0)' : 'translate(-50%, 0)',
        width: 800,
        maxWidth: isMobile ? '100vw' : '80vw',
        height: isMobile ? '100vh' : '90vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        boxShadow: isMobile ? 0 : 24,
        p: isMobile ? 0 : 4,
        pt: 0,
      }}>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.paper', py: 0.8, px: 1 }}>
          {isMobile && (
            <IconButton onClick={handleClose} size="small">
              <ArrowLeftCircleIcon className="h-5 w-5"/>
            </IconButton>
          )}
          <TextField
            id="search-input"
            variant="outlined"
            placeholder="Search for Blocks and Samples"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus={!isMobile}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </InputAdornment>
              ),
              endAdornment: searchTerm ? (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} size="small">
                    <XCircleIcon className="h-5 w-5" />
                  </IconButton>
                </InputAdornment>
              ) : null,
              style: { backgroundColor: '#f5f5f5', borderRadius: '4px', height: '30px' },
            }}
          />
          <Box sx={{ overflowX: 'auto', mt: 1 }}>
            <Stack direction="row" spacing={1}>
              {['payment', 'xrpl', 'xaman', 'text', 'math', 'time',
               ].map((category) => (
                <Chip
                  key={category}
                  label={category}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: BlockColors[category] || 'primary.main',
                    color: BlockColors[category] || 'primary.main',
                  }}
                  onClick={() => handleChipClick(category)}
                />
              ))}
            </Stack>
          </Box>
        </Box>
        <Divider />
        {filteredBlocks.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            No blocks found. Please try different keywords.
          </Typography>
        )}
        <Box px={2}>
        {filteredBlocks.map((item: Block, index: number) => (
          <Box key={index} mt={3} mb={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {item.description}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              {item.categories.map((category, catIndex) => (
                <Chip
                  key={catIndex}
                  label={category}
                  variant="outlined"
                  size='small'
                  sx={{
                    borderColor: BlockColors[category] || 'primary.main',
                    color: BlockColors[category] || 'primary.main'
                  }}
                  onClick={() => handleChipClick(category)}
                />
              ))}
            </Stack>
            <Box id={`flyoutDiv_${index}`} className="custom-cursor" sx={{ width: '100%', height: item.height, mb: 2 }} />
          </Box>
        ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default BlocklySearchFlyout;
