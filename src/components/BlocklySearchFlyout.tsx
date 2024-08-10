import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Blockly from 'blockly/core';
import { Box, Modal, TextField, Typography, InputAdornment, Chip, Stack, IconButton, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import { MagnifyingGlassIcon, XCircleIcon, ArrowLeftCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import { initialBlockTypesMap } from '@/blocks/BlockContents';
import { IBaseBlock, IBlockTypesMap } from "@/interfaces/IBaseBlock";
import { BlockColors } from '@/blocks/BlockColors';
import { FlyoutTheme } from '@/blocks/BlocklyTheme';
import { useMobile } from '@/contexts/MobileContext';

interface IFlyoutModalProps {
  onBlockSelected: (xml: string, eventType: string, event: MouseEvent) => void;
  onBlockSelectedV2: (json: string, eventType: string, event: MouseEvent) => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  mainWorkspace: Blockly.WorkspaceSvg;
}

const BlocklySearchFlyout = ({ onBlockSelected, onBlockSelectedV2, setOpen, open, mainWorkspace }: IFlyoutModalProps) => {
  const { isMobile, isLoaded } = useMobile();
  const workspaceRefs = useRef<{ id: string, workspace: Blockly.WorkspaceSvg | null }[]>([]);
  const [blockTypesMap, setBlockTypesMap] = useState<IBlockTypesMap<IBaseBlock>>(initialBlockTypesMap);
  const [dynamicUpdated, setDynamicUpdated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          //const xml = Blockly.Xml.blockToDom(blockSvg as Blockly.Block) as Element;
          //const xmlText = Blockly.Xml.domToText(xml);
          const json = Blockly.serialization.blocks.save(blockSvg as Blockly.Block);
          const jsonText = JSON.stringify(json);
          const blockElement = blockSvg.getSvgRoot();
          const rect = blockElement.getBoundingClientRect();
          let dummyEvent: any = {
            clientX: rect.left,
            clientY: rect.top
          };
          //onBlockSelected(xmlText, event.type, dummyEvent);
          onBlockSelectedV2(jsonText, event.type, dummyEvent);
          handleClose();
        }
      }
    },
    [/*onBlockSelected,*/onBlockSelectedV2, handleClose]
  );

  const handleAddBlock = useCallback((workspaceId: string, blockId: string) => {
    const workspace = workspaceRefs.current.find(ws => ws.id === workspaceId)?.workspace;
    if (workspace) {
      const blockSvgs = workspace.getTopBlocks();
      if (blockSvgs && blockSvgs.length) {
        const blockSvg = blockSvgs[0];
        if (blockSvg) {
          //const xml = Blockly.Xml.blockToDom(blockSvg as Blockly.Block) as Element;
          //const xmlText = Blockly.Xml.domToText(xml);
          const json = Blockly.serialization.blocks.save(blockSvg as Blockly.Block);
          const jsonText = JSON.stringify(json);
          const blockElement = blockSvg.getSvgRoot();
          const rect = blockElement.getBoundingClientRect();
          let dummyEvent: any = {
            clientX: rect.left,
            clientY: rect.top
          };
          //onBlockSelected(xmlText, 'click', dummyEvent);
          onBlockSelectedV2(jsonText, 'click', dummyEvent);
          handleClose();
        }
      }
    }
  }, [mainWorkspace]);

  const disposeWorkspaces = useCallback(() => {
    workspaceRefs.current.forEach(({ workspace }) => {
      if (workspace) {
        workspace.clear();
        workspace.dispose();
      }
    });
    workspaceRefs.current = [];
  }, []);

  const createWorkspaces = useCallback((blocks: IBaseBlock[]) => {
    if (blocks && blocks.length > 0) {
      blocks.forEach((item, i) => {
        const divId = `flyoutDiv_${i}`;
        const container = document.getElementById(divId);
        if (container) {
          const existingWorkspace = workspaceRefs.current.find(ws => ws.id === divId)?.workspace;
          if (!existingWorkspace) {
            const workspace = Blockly.inject(divId, {
              theme: FlyoutTheme,
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

            const allBlocks = workspace.getAllBlocks(false);
            allBlocks.forEach(block => {
              block.contextMenu = false;
            });

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

  const rankBlocks = (blocks: IBaseBlock[], term: string): IBaseBlock[] => {
    const terms = term.toLowerCase().split(' ').filter(t => t);
    return blocks.map(block => {
      const titleMatchCount = terms.filter(t => block.title.toLowerCase().includes(t)).length;
      const descriptionMatchCount = terms.filter(t => block.description.toLowerCase().includes(t)).length;
      const categoryMatchCount = terms.filter(t => block.categories.some(category => category.toLowerCase().includes(t))).length;
      const categoryMatchBonus = categoryMatchCount > 0 ? 2 : 0;
      const exampleBonus = block.categories.includes('template') ? 1 : 0; // 'template' カテゴリのブロックにボーナスを追加
      const score = titleMatchCount + descriptionMatchCount + categoryMatchCount + categoryMatchBonus + exampleBonus;
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
            placeholder="Search for Blocks and Templates"
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
              {['template', 'xrpl', 'xaman', 'text', 'math', 'time', 'animation', 'json', 'logic', 'loop', 'list'
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
        {filteredBlocks.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            No blocks found. Please try different keywords.
          </Typography>
        )}
        <Box px={2}>
        {filteredBlocks.map((item: IBaseBlock, index: number) => (
          <Box
            key={index} mt={3} mb={5}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Divider />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                {item.title}
              </Typography>
              <Box sx={{ visibility: hoveredIndex === index ? 'visible' : 'hidden' }}>
                <Tooltip title="Add to workspace" placement="top">
                  <IconButton onClick={() => handleAddBlock(`flyoutDiv_${index}`, item.block)}>
                    <PlusIcon className="h-5 w-5" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
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
            <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} overflow="auto">
              <Box 
                id={`flyoutDiv_${index}`}
                className="custom-cursor"
                sx={{ width: '100%', height: item.height }}
              />
            </Box>
          </Box>
        ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default BlocklySearchFlyout;
