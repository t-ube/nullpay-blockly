import React, { useEffect, useState, ForwardedRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { MagnifyingGlassIcon, WalletIcon } from '@heroicons/react/24/solid';
import { Box, TextField, InputAdornment, Menu, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ButtonGroup from '@/components/HeaderButtons';
import { formatAddress } from '@/utils/TextFormatter';
import { XamanVariablesModal } from '@/components/XamanVariablesModal';
import { useMobile } from '@/contexts/MobileContext';
import { useAccount } from '@/contexts/AccountContext';
import { IHeaderProps } from '@/interfaces/IHeaderProps';


const XamanButton = styled('button')(({ theme }) => ({
  fontSize: '14px',
  backgroundColor: '#0130CC',
  color: 'white',
  '&:hover': {
    background: '#0130CC',
    color: 'white',
  },
}));

const MyMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '14px',
}));

const Header = React.forwardRef(({ playState, setPlayState, onSearchClick, onSaveClick, onLoadClick, onSaveMLClick }: IHeaderProps, ref: ForwardedRef<HTMLElement>) => {
  const { isMobile, isPortrait, isLoaded } = useMobile();
  const { loggedIn, userAccount, userName, userPicture, signIn, logout } = useAccount();
  const [isSmall, setIsSmall] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setIsSmall(isMobile && !isPortrait);
  }, [isMobile, isPortrait, isLoaded]);

  useEffect(() => {
    const headerHeight = ref && 'current' in ref && ref.current ? ref.current.offsetHeight : 0;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  }, [ref]);

  if (!isLoaded) {
    return <div></div>;
  }

  const handleSignInXaman = async () => {
    signIn();
  };

  const handleLogoutXaman = async () => {
    logout();
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getAccountMenu = () => {
    return (
      <Menu
        sx={{ 
          mt: '25px',
          py: isMobile && isPortrait ? 0 : 1
        }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        disableScrollLock={true}
      >
        <MyMenuItem
          sx={{
            minHeight: isMobile && isPortrait ? '32px' : '48px'
          }}
          onClick={() => { setDrawerVisible(true); handleMenuClose(); }}
        >
          <Typography
            textAlign="center"
            variant="body2"
            color="textPrimary"
          >
            {'Settings'}
          </Typography>
        </MyMenuItem>
        <MyMenuItem
          sx={{
            minHeight: isMobile && isPortrait ? '32px' : '48px'
          }}
          onClick={handleLogoutXaman}
        >
          <Typography
            textAlign="center"
            variant="body2"
            color="textPrimary"
          >
            {'Logout'}
          </Typography>
        </MyMenuItem>
      </Menu>
    )
  }

  return (
    <header
      ref={ref}
      className={classNames('relative flex-none bg-white shadow flex items-center py-1', {
        'px-4': !isMobile,
        'px-1': isMobile,
      })}
    >
      <div className="flex items-center">
        <Image
          src="/nullpay-256.png"
          alt="nullpay Logo"
          width={30}
          height={30}
        />
        <h1 className="px-4" style={{ display: isMobile ? 'none' : 'block', fontWeight: 'bold', userSelect: 'none' }}>null pay</h1>
      </div>
      <div className="flex items-center space-x-2">
      {!isMobile ? (
        <ButtonGroup playState={playState} setPlayState={setPlayState} onSaveClick={onSaveClick} onLoadClick={onLoadClick} onSaveMLClick={onSaveMLClick}/>
      ) : !isPortrait &&
        (
          <ButtonGroup playState={playState} setPlayState={setPlayState} onSaveClick={onSaveClick} onLoadClick={onLoadClick} onSaveMLClick={onSaveMLClick}/>
        )
      }
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <TextField
          variant="outlined"
          placeholder="Search for Blocks and Templates"
          size="small"
          onClick={onSearchClick}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </InputAdornment>
            ),
            readOnly: true,
            style: { backgroundColor: '#f5f5f5', borderRadius: '4px', height: '30px', cursor: 'pointer' },
            inputProps: {
              style: { caretColor: 'transparent' }
            }
          }}
          style={{ width: '300px' }}
        />
      </div>

      {loggedIn ? (
        <>
          <XamanButton
            color="inherit"
            className='flex items-center px-1 py-1 text-xs rounded shadow transition duration-200 ml-auto font-bold'
            onClick={handleMenuClick}
          >
            <Box
              component="img"
              src="/icons/xaman-logo.jpg"
              alt="Xaman Icon"
              sx={{
                height: 20,
                width: 20,
                marginRight: isMobile ? 0 : 1,
              }}
            />
            {!isMobile && formatAddress(userAccount)}
          </XamanButton>
          {getAccountMenu()}
        </>
      ) : (
        <button
          color="inherit"
          className='flex items-center px-2 py-1 text-sm rounded shadow text-white bg-gray-500 hover:bg-gray-700 transition duration-200 ml-auto'
          onClick={handleSignInXaman}
        >
          <WalletIcon className="h-4 w-4 mr-1" />{!isMobile && "Connect"}
        </button>
      )}
      <XamanVariablesModal visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
