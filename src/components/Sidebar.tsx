// components/Sidebar.tsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import PuzzleIcon from '@mui/icons-material/Extension';
import { BlockColors } from '@/blocks/blockColors';


const ListNav = styled(List)<{ component?: React.ElementType }>({
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

const ColoredCircle = styled('div')(({ color }: { color: string }) => ({
  width: 10,
  height: 10,
  backgroundColor: color,
  borderRadius: '50%',
}));

interface SidebarProps {
  setOpen: (open: boolean) => void;
  setFlyoutType: (type: string | null) => void;
}

export function Sidebar ({ setOpen, setFlyoutType }: SidebarProps) {
  const [openMenuName, setOpenMenuName] = useState<string>('');

  const handleFlyoutOpen = (type: string) => () => {
    setFlyoutType(type);
    setOpen(true);
  };

  const handleXamanClick = () => {
    console.log('Xaman menu clicked');
  };

  const menuItems = [
    /*
    { type: 'group', label: 'XRPL', color: BlockColors.xrpl,
      children:
      [
        { label: 'Authentication', color: '#aaa', onClick: handleFlyoutOpen('authentication') },
        { label: 'Database', color: '#aaa', onClick: handleFlyoutOpen('database') },
        { label: 'Storage', color: '#aaa', onClick: handleFlyoutOpen('storage') },
        { label: 'Hosting', color: '#aaa', onClick: handleFlyoutOpen('hosting') },
      ]
    },*/
    { type: 'item', label: 'XRPL', color: BlockColors.xrpl, onClick: handleFlyoutOpen('xrpl') },
    { type: 'item', label: 'Xaman', color: BlockColors.xaman, onClick: handleFlyoutOpen('xaman') },
    { type: 'item', label: 'Text', color: BlockColors.text, onClick: handleFlyoutOpen('text') },
    { type: 'item', label: 'Math', color: BlockColors.math, onClick: handleFlyoutOpen('math') },
    { type: 'item', label: 'Control', color: BlockColors.control, onClick: handleFlyoutOpen('control') },
    { type: 'item', label: 'Time', color: BlockColors.time, onClick: handleFlyoutOpen('time') },
    { type: 'item', label: 'JSON', color: BlockColors.json, onClick: handleFlyoutOpen('json') },
    { type: 'item', label: 'Animation', color: BlockColors.animation, onClick: handleFlyoutOpen('animation') },
    { type: 'item', label: 'Logic', color: BlockColors.logic, onClick: handleFlyoutOpen('logic') },
    { type: 'item', label: 'Loops', color: BlockColors.loops, onClick: handleFlyoutOpen('loops') },
    { type: 'item', label: 'Lists', color: BlockColors.lists, onClick: handleFlyoutOpen('lists') },
    { type: 'item', label: 'Variables', color: BlockColors.variables, onClick: handleFlyoutOpen('variables') },
    { type: 'item', label: 'Functions', color: BlockColors.functions, onClick: handleFlyoutOpen('functions') },
  ];

  function getGroupItem (item:any) {
    return (
      <>
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setOpenMenuName(openMenuName === item.label ? '' : item.label)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: openMenuName === item.label ? 0 : 2.5,
          }}
        >
          <ListItemIcon>
            <PuzzleIcon sx={{ color: BlockColors.xrpl }} />
          </ListItemIcon>
          <ListItemText
            primary="XRPL"
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: '20px',
              mb: '2px',
              color: '#515757'
            }}
            secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: '16px',
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              opacity: 0,
              transform: openMenuName === item.label ? 'rotate(-180deg)' : 'rotate(0)',
              transition: '0.2s',
            }}
          />
        </ListItemButton>
        {
          openMenuName === item.label &&
          item.children.map((child:any, index:number) => (
            <ListItemButton
              key={child.label}
              sx={{ py: 0, minHeight: 32 }}
              onClick={child.onClick}
            >
              <ListItemIcon sx={{paddingLeft: 1}}>
                <ColoredCircle color={'#aaa'} />
              </ListItemIcon>
              <ListItemText
                primary={child.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
              />
            </ListItemButton>
          ))
        }
      </>
    );
  }

  function getItem (item:any) {
    return (
      <>
        {
          <ListItemButton key={item.label} sx={{ py: 0, minHeight: 32 }} onClick={item.onClick}>
            <ListItemIcon>
              <PuzzleIcon sx={{ color: item.color }} />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: '20px',
                mb: '2px',
                color: '#515757'
              }}
            />
          </ListItemButton>
        }
      </>
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
          <ListNav component="nav" disablePadding>
            <Box sx={{pb: 0}}>
              {
                menuItems.map((item, index) => (
                  <div key={item.label}>
                    {item.type === 'group' ? getGroupItem(item) : getItem(item)}
                  </div>
                ))
              }
            </Box>
          </ListNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
