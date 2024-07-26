import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import * as Blockly from 'blockly/core';
import { Drawer, Box, Typography, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PuzzleIcon from '@mui/icons-material/Extension';
import { initialBlockTypesMap } from '@/blocks/BlockContents';
import { IBaseBlock, XRPLSubCategories, translateSubCategory } from "@/interfaces/IBaseBlock";
import { BlockColors } from '@/blocks/BlockColors';
import { BlockIcons } from '@/blocks/BlockIcons';

interface IDrawerBlockDrawerMap {
  [key: string]: number;
}

interface IDrawerBlockTitleMap {
  [key: string]: string;
}

interface IDrawerBlocklyDrawerProps {
  onBlockSelected: (xml: string, eventType: string, event: MouseEvent) => void;
  onBlockSelectedV2: (json: string, eventType: string, event: MouseEvent) => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  flyoutType: string | null;
  mainWorkspace: Blockly.WorkspaceSvg;
}

const initialBlockDrawerMap : IDrawerBlockDrawerMap = {
  xrpl: 350,
  xaman: 300,
  text: 300,
  math: 300,
  control: 300,
  table: 300,
  time: 320,
  json: 300,
  animation: 300,
  logic: 300,
  loop: 300,
  list: 320,
  form: 320,
  webapi: 320,
  chart: 320,
  supabase: 320,
  variable: 300,
  function: 300,
};

const initialBlockTitleMap : IDrawerBlockTitleMap = {
  xrpl: 'XRPL',
  xaman: 'Xaman',
  text: 'Text',
  math: 'Math',
  control: 'Control',
  table: 'Table',
  time: 'Time',
  json: 'JSON',
  animation: 'Animation',
  logic: 'Logic',
  loop: 'Loops',
  list: 'Lists',
  form: 'Form',
  webapi: 'Web API',
  chart: 'Chart',
  supabase: 'Supabase',
  variable: 'Variables',
  function: 'Functions',
};

const BlocklyDrawer = ({ onBlockSelected, onBlockSelectedV2, setOpen, open, flyoutType, mainWorkspace }: IDrawerBlocklyDrawerProps) => {
  const workspaceRefs = useRef<{ id: string, workspace: Blockly.WorkspaceSvg | null }[]>([]);
  const [dynamicUpdated, setDynamicUpdated] = useState(false);
  const [varDialogOpen, setVarDialogOpen] = useState(false);
  const [variableName, setVariableName] = useState("");
  const [categorizedBlocks, setCategorizedBlocks] = useState<{[key: string]: {[subCategory: string]: IBaseBlock[]}}>({});

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
          //const xml = Blockly.Xml.blockToDom(parentBlockSvg as Blockly.Block) as Element;
          //const xmlText = Blockly.Xml.domToText(xml);
          const json = Blockly.serialization.blocks.save(parentBlockSvg as Blockly.Block);
          const jsonText = JSON.stringify(json);
          const blockElement = parentBlockSvg.getSvgRoot();
          const rect = blockElement.getBoundingClientRect();
          let dummyEvent: any = {
            clientX: rect.left,
            clientY: rect.top
          };
          //onBlockSelected(xmlText, event.type, dummyEvent);
          onBlockSelectedV2(jsonText, event.type, dummyEvent)
          handleClose();
        }
      }
    },
    [/*onBlockSelected,*/onBlockSelectedV2, handleClose]
  );

  useEffect(() => {
    if (open && flyoutType && !dynamicUpdated) {
      let blocks : IBaseBlock[] = [];

      if (flyoutType === 'variable' || flyoutType === 'function') {
        const dynamicBlocks: IBaseBlock[] = [];
        if (flyoutType === 'variable') {
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
        } else if (flyoutType === 'function') {
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
        blocks = dynamicBlocks;
      } else {
        blocks = initialBlockTypesMap[flyoutType].filter(block => !block.categories?.includes('template'));
      }

      const categorized = blocks.reduce((acc, block) => {
        if (!acc[flyoutType]) {
          acc[flyoutType] = {};
        }
        if (block.subCategories && block.subCategories.length > 0) {
          block.subCategories.forEach(subCategory => {
            if (!acc[flyoutType][subCategory]) {
              acc[flyoutType][subCategory] = [];
            }
            acc[flyoutType][subCategory].push(block);
          });
        } else {
          if (!acc[flyoutType]['uncategorized']) {
            acc[flyoutType]['uncategorized'] = [];
          }
          acc[flyoutType]['uncategorized'].push(block);
        }
        return acc;
      }, {} as {[key: string]: {[subCategory: string]: IBaseBlock[]}});

      setCategorizedBlocks(categorized);
      setDynamicUpdated(true);

      setTimeout(() => {
        if (blocks && blocks.length > 0) {
          blocks.forEach((item, i) => {
            let divId: string;
            if (flyoutType !== 'variable' && flyoutType !== 'function') {
              divId = `flyoutDiv_${item.title.replace(/\s+/g, '_')}`;
            } else {
              divId = `flyoutDiv_${i}`;
            }
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
                block.contextMenu = false;
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
  }, [open, flyoutType, handleBlockClick, mainWorkspace, dynamicUpdated]);

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

  const handleVarDialogClose = () => {
    setVarDialogOpen(false);
    setVariableName("");
  };

  const handleVarDialogSubmit = () => {
    if (variableName) {
      mainWorkspace.createVariable(variableName);
      setDynamicUpdated(false);
      handleClose();
      setTimeout(() => setOpen(true), 0);
    }
    handleVarDialogClose();
  };

  function getIcon(icon: string | React.ElementType, color: string) {
    if (typeof icon === 'string') {
      return (
        <Box sx={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src={icon} alt="" width={22} height={22} style={{ borderRadius: '4px', objectFit: 'cover' }} />
        </Box>
      );
    } else {
      const IconComponent = icon as React.ElementType;
      return <IconComponent sx={{ width: 24, height: 24, color: color }} />;
    }
  }

  return (
    <>
      <Drawer
        open={open}
        onClose={handleClose}
        anchor="left"
      >
        <ThemeProvider
          theme={createTheme({
            typography: {
            fontFamily: [
              'Google Sans',
              'Noto Sans',
              'Noto Sans JP',
              'Noto Sans KR',
              'Noto Naskh Arabic',
              'Noto Sans Thai',
              'Noto Sans Hebrew',
              'Noto Sans Bengali',
              'sans-serif',
            ].join(','),
          },
          components: {
            MuiCssBaseline: {
              styleOverrides: `
                @font-face {
                  font-family: 'Google Sans';
                  font-style: normal;
                  font-weight: 400;
                  src: local('Google Sans Regular'), local('GoogleSans-Regular'), url(https://fonts.gstatic.com/s/googlesans/v16/4UaGrENHsxJlGDuGo1OIlL3Kwp5eKQtGBlc.woff2) format('woff2');
                }
                body {
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                }
              `,
            }}
          })}
        >
          <Box sx={{
            width: flyoutType ? initialBlockDrawerMap[flyoutType] : 300,
            maxHeight: '100vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            pl: 2,
            pb: 4,
            pt: 2,
            pr: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {flyoutType ? getIcon(BlockIcons[flyoutType], BlockColors[flyoutType]) : <PuzzleIcon sx={{ color: '#ccc' }} />}
              <Typography variant="subtitle1" px={1} sx={{ fontWeight: 'bold', color: '#333333', display: 'flex', alignItems: 'center' }}>
                {flyoutType ? initialBlockTitleMap[flyoutType] : 'unknown'} {'Blocks'}
              </Typography>
            </Box>
            <Divider />
            {flyoutType === 'variable' &&
              <Box pl={1} pt={2} pb={3}>
                <Button 
                  onClick={() => setVarDialogOpen(true)} 
                  sx={{fontSize: '0.675rem', backgroundColor: BlockColors.variable, color: '#FFFFFF', '&:hover': { backgroundColor: '#8F4D6D' } }}
                >
                  Add Variable
                </Button>
              </Box>
            }
            {flyoutType && categorizedBlocks[flyoutType] && Object.entries(categorizedBlocks[flyoutType]).map(([subCategory, blocks]) => (
              <Box key={subCategory}>
                {subCategory !== 'uncategorized' && (
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mt: 3, 
                      mb: 2, 
                      display: 'flex',
                      alignItems: 'center',
                      '&::after': {
                        content: '""',
                        flex: 1,
                        borderBottom: theme => `1px solid ${theme.palette.divider}`,
                        marginLeft: 1,
                      },
                    }}
                  >
                    {translateSubCategory(subCategory as XRPLSubCategories, 'en')}
                  </Typography>
                )}
                {blocks.map((item: IBaseBlock, index: number) => {
                  const key = flyoutType === 'variable' || flyoutType === 'function' 
                  ? `${flyoutType}_${index}`
                  : item.title;
                  return (
                    <Box key={key} mt={2} mb={3}>
                      <Box 
                        id={flyoutType !== 'variable' && flyoutType !== 'function' 
                          ? `flyoutDiv_${item.title.replace(/\s+/g, '_')}` 
                          : `flyoutDiv_${index}`} 
                        sx={{ width: '100%', height: item.height, mb: 2 }} 
                      />
                    </Box>
                  )
              })}
              </Box>
            ))}
          </Box>
        </ThemeProvider>
      </Drawer>
      {/* Variable Dialog */}
      <Dialog open={varDialogOpen} onClose={handleVarDialogClose}>
        <DialogTitle>Add Variable</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name for the new variable.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Variable Name"
            type="text"
            fullWidth
            value={variableName}
            onChange={(e) => setVariableName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleVarDialogClose}
            sx={{color: BlockColors.variable }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleVarDialogSubmit}
            sx={{backgroundColor: BlockColors.variable, color: '#FFFFFF', '&:hover': { backgroundColor: '#8F4D6D' } }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlocklyDrawer;
