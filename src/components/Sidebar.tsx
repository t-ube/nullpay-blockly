// components/Sidebar.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import PuzzleIcon from '@mui/icons-material/Extension';
import { BlockColors } from '@/blocks/BlockColors';
import { BlockIcons } from '@/blocks/BlockIcons';


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

interface ISidebarProps {
  setOpen: (open: boolean) => void;
  setFlyoutType: (type: string | null) => void;
}

export function Sidebar ({ setOpen, setFlyoutType }: ISidebarProps) {
  const [openMenuName, setOpenMenuName] = useState<string>('');

  const handleFlyoutOpen = (type: string) => () => {
    setFlyoutType(type);
    setOpen(true);
  };

  const handleXamanClick = () => {
    console.log('Xaman menu clicked');
  };

  const menuItems = [
    { type: 'item', label: 'XRPL', color: BlockColors.xrpl, onClick: handleFlyoutOpen('xrpl'), icon: BlockIcons.xrpl },
    { type: 'item', label: 'Xaman', color: BlockColors.xaman, onClick: handleFlyoutOpen('xaman'), icon: BlockIcons.xaman },
    { type: 'item', label: 'Text', color: BlockColors.text, onClick: handleFlyoutOpen('text'), icon: BlockIcons.text },
    { type: 'item', label: 'Math', color: BlockColors.math, onClick: handleFlyoutOpen('math'), icon: BlockIcons.math },
    { type: 'item', label: 'Control', color: BlockColors.control, onClick: handleFlyoutOpen('control'), icon: BlockIcons.control },
    { type: 'item', label: 'Time', color: BlockColors.time, onClick: handleFlyoutOpen('time'), icon: BlockIcons.time },
    { type: 'item', label: 'JSON', color: BlockColors.json, onClick: handleFlyoutOpen('json'), icon: BlockIcons.json },
    { type: 'item', label: 'Table', color: BlockColors.table, onClick: handleFlyoutOpen('table'), icon: BlockIcons.table },
    { type: 'item', label: 'Animation', color: BlockColors.animation, onClick: handleFlyoutOpen('animation'), icon: BlockIcons.animation },
    { type: 'item', label: 'Logic', color: BlockColors.logic, onClick: handleFlyoutOpen('logic'), icon: BlockIcons.logic },
    { type: 'item', label: 'Loops', color: BlockColors.loop, onClick: handleFlyoutOpen('loop'), icon: BlockIcons.loop },
    { type: 'item', label: 'Lists', color: BlockColors.list, onClick: handleFlyoutOpen('list'), icon: BlockIcons.list },
    { type: 'item', label: 'Supabase', color: BlockColors.supabase, onClick: handleFlyoutOpen('supabase'), icon: BlockIcons.supabase },
    { type: 'item', label: 'Variables', color: BlockColors.variable, onClick: handleFlyoutOpen('variable'), icon: BlockIcons.variable },
    { type: 'item', label: 'Functions', color: BlockColors.function, onClick: handleFlyoutOpen('function'), icon: BlockIcons.function },
  ];

  function getIcon(icon: string | React.ElementType, color: string) {
    if (typeof icon === 'string') {
      return <Image width={22} height={22}  src={icon} alt="" style={{ borderRadius: '4px' }}/>;
    } else {
      const IconComponent = icon as React.ElementType;
      return <IconComponent sx={{ width: 24, height: 24, color: color }} />;
    }
  }

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
          <ListItemButton 
            key={item.label}
            sx={{ py: 0,
              minHeight: 36,
              transition: 'border-right-width 0.2s ease-in-out',
              '&::before': {
                content: '""',
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '10px',
                backgroundColor: item.color,
                transition: 'width 0.2s ease-in-out',
              },
              '&:hover::before': {
                width: '20px',
              }
            }}
            onClick={item.onClick}
          >
            <ListItemIcon>
              {getIcon(item.icon, item.color)}
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
                  <Box key={item.label}
                    sx={{ py: 0,
                      minHeight: 36,
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    {item.type === 'group' ? getGroupItem(item) : getItem(item)}
                  </Box>
                ))
              }
            </Box>
          </ListNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
