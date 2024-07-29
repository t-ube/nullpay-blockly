import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import * as Blockly from 'blockly/core';
import { Tabs, Tab, Box, Typography, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import PuzzleIcon from '@mui/icons-material/Extension';
import { BlockColors } from '@/blocks/BlockColors';
import { BlockIcons } from '@/blocks/BlockIcons';
import { initialBlockTypesMap } from '@/blocks/BlockContents';
import { IBaseBlock, XRPLSubCategories, translateSubCategory } from "@/interfaces/IBaseBlock";

interface IDrawerBlockTitleMap {
  [key: string]: string;
}

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
  system: 'System',
  form: 'Form',
  webapi: 'Web API',
  chart: 'Chart',
  supabase: 'Supabase',
  variable: 'Variables',
  function: 'Functions',
};

const VerticalTabs = styled(Tabs)({
  borderRight: `1px solid #e8e8e8`,
  '& .MuiTabs-indicator': {
    left: 0,
    right: 'auto',
    width: 3,
  },
  minWidth: '140px',
});

const VerticalTab = styled(Tab)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: '40px',
  padding: '8px 12px',
  textAlign: 'left',
  textTransform: 'none',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.selected,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface ISidebarProps {
  onBlockSelectedV2: (json: string, eventType: string, event: MouseEvent) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  mainWorkspace: Blockly.WorkspaceSvg;
}

export function NewSidebar({ onBlockSelectedV2, open, setOpen, mainWorkspace }: ISidebarProps) {
  const workspaceRefs = useRef<{ id: string, workspace: Blockly.WorkspaceSvg | null }[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [hoverTab, setHoverTab] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [varDialogOpen, setVarDialogOpen] = useState(false);
  const [categorizedBlocks, setCategorizedBlocks] = useState<{[key: string]: {[subCategory: string]: IBaseBlock[]}}>({});
  const [variableName, setVariableName] = useState("");
  const [flyoutType, setFlyoutType] = useState<string | null>(null);

  const clearWorkspaces = useCallback(() => {
    workspaceRefs.current.forEach(({ workspace }) => {
      if (workspace) {
        workspace.clear();
        workspace.dispose();
      }
    });
    workspaceRefs.current = [];
  }, []);

  const forceSidebarClose = useCallback(() => {
    setOpen(false);
    setHoverTab(null);
    setFlyoutType(null);
    clearWorkspaces();
    
  }, [setOpen, clearWorkspaces, setHoverTab, setFlyoutType]);

  const handleClose = useCallback(() => {
    clearWorkspaces();
    setOpen(false);
  }, [setOpen, clearWorkspaces]);

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
          const json = Blockly.serialization.blocks.save(parentBlockSvg as Blockly.Block);
          const jsonText = JSON.stringify(json);
          const blockElement = parentBlockSvg.getSvgRoot();
          const rect = blockElement.getBoundingClientRect();
          let dummyEvent: any = {
            clientX: rect.left,
            clientY: rect.top
          };
          onBlockSelectedV2(jsonText, event.type, dummyEvent);
          forceSidebarClose();
        }
      }
    },
    [onBlockSelectedV2, forceSidebarClose]
  );

  useEffect(() => {
    if (open && flyoutType) {
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
      }, 200);
    }
  }, [open, flyoutType, handleBlockClick, mainWorkspace]);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleVarDialogClose = () => {
    setVarDialogOpen(false);
    setVariableName("");
  };

  const handleVarDialogSubmit = () => {
    if (variableName) {
      mainWorkspace.createVariable(variableName);
      handleClose();
      setTimeout(() => setOpen(true), 0);
    }
    handleVarDialogClose();
  };

  const handleTabHover = useCallback((type: string | null, index: number, pos: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (flyoutType !== type) {
        setTabValue(index);
        setHoverTab(type);
        setOpen(!!type);
        setFlyoutType(type);
        clearWorkspaces();
      }
    }, 200);
  }, [flyoutType, clearWorkspaces, setFlyoutType, setOpen]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      handleClose();
      setHoverTab(null);
      setFlyoutType(null);
    }, 200);
  }, [handleClose]);

  const menuItems = [
    { label: 'XRPL', color: BlockColors.xrpl, type:'xrpl', icon: BlockIcons.xrpl },
    { label: 'Xaman', color: BlockColors.xaman, type:'xaman', icon: BlockIcons.xaman },
    { label: 'Text', color: BlockColors.text, type:'text', icon: BlockIcons.text },
    { label: 'Math', color: BlockColors.math, type:'math', icon: BlockIcons.math },
    { label: 'Control', color: BlockColors.control, type:'control', icon: BlockIcons.control },
    { label: 'Time', color: BlockColors.time, type:'time', icon: BlockIcons.time },
    { label: 'JSON', color: BlockColors.json, type:'json', icon: BlockIcons.json },
    { label: 'Table', color: BlockColors.table, type:'table', icon: BlockIcons.table },
    { label: 'Animation', color: BlockColors.animation, type:'animation', icon: BlockIcons.animation },
    { label: 'Logic', color: BlockColors.logic, type:'logic', icon: BlockIcons.logic },
    { label: 'Loops', color: BlockColors.loop, type:'loop', icon: BlockIcons.loop },
    { label: 'Lists', color: BlockColors.list, type:'list', icon: BlockIcons.list },
    { label: 'Form', color: BlockColors.form, type:'form', icon: BlockIcons.form },
    { label: 'Web API', color: BlockColors.webapi, type:'webapi', icon: BlockIcons.webapi },
    { label: 'Chart', color: BlockColors.chart, type:'chart', icon: BlockIcons.chart },
    { label: 'Supabase', color: BlockColors.supabase, type:'supabase', icon: BlockIcons.supabase },
    { label: 'Variables', color: BlockColors.variable, type:'variable', icon: BlockIcons.variable },
    { label: 'Functions', color: BlockColors.function, type:'function', icon: BlockIcons.function },
    { label: 'System', color: BlockColors.system, type:'system', icon: BlockIcons.system },
  ];

  function getIcon(icon: string | React.ElementType, color: string) {
    const iconSize = 20;
    const iconColor = color;
    if (typeof icon === 'string') {
      return <Image width={iconSize} height={iconSize} src={icon} alt="" style={{ borderRadius: '4px' }} />;
    } else {
      const IconComponent = icon as React.ElementType;
      return <IconComponent sx={{ width: iconSize, height: iconSize, color: iconColor }} />;
    }
  }

  return (
    <Box 
      sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}
      onMouseLeave={handleMouseLeave}
    >
      <VerticalTabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider', flexShrink: 0 }}
      >
        {menuItems.map((item, index) => (
          <VerticalTab
            key={item.label}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {getIcon(item.icon, item.color)}
                <Typography 
                  sx={{ 
                    ml: 1.5,
                    fontSize: '0.9rem',
                    lineHeight: 1.2,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    flexGrow: 1,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            }
            onMouseEnter={() => handleTabHover(item.type, index, 'a')}
          />
        ))}
      </VerticalTabs>
      <Box 
        sx={{ 
          flexGrow: 1, 
          p: 2,
          display: hoverTab ? 'block' : 'none',
          width: 330,
          overflowY: 'auto',
          maxHeight: '100%',
        }}
        onMouseEnter={() => handleTabHover(hoverTab, tabValue, 'b')}
      >
        {/* ここにブロックを表示するコンポーネントを配置 */}
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {flyoutType ? getIcon(BlockIcons[flyoutType], BlockColors[flyoutType]) : <PuzzleIcon sx={{ color: '#ccc' }} />}
            <Typography variant="subtitle2" px={1} sx={{ fontWeight: 'bold', color: '#333333', display: 'flex', alignItems: 'center' }}>
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
        </ThemeProvider>
      </Box>
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
    </Box>
  );
}

