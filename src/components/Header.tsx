import React, { useEffect, forwardRef, ForwardedRef } from 'react';
import Image from 'next/image';
import { PlayIcon, PauseIcon, StopIcon, FolderOpenIcon, DocumentArrowDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ButtonGroup, { PlayState } from '@/components/HeaderButtons';
import { TextField, InputAdornment } from '@mui/material';

interface HeaderProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
  onSearchClick: () => void;
}

const Header = React.forwardRef(({ playState, setPlayState, onSearchClick }: HeaderProps, ref: ForwardedRef<HTMLElement>) => {
  useEffect(() => {
    const headerHeight = ref && 'current' in ref && ref.current ? ref.current.offsetHeight : 0;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  }, [ref]);

  return (
    <header ref={ref} className="relative flex-none py-1 bg-white px-4 shadow flex items-center">
      <div className="flex items-center">
        <Image
          src="/nullpay-256.png"
          alt="nullpay Logo"
          width={30}
          height={30}
        />
        <h1 className="px-4" style={{ fontWeight: 'bold', userSelect: 'none' }}>null pay</h1>
      </div>
      <div className="flex items-center space-x-2">
        <ButtonGroup playState={playState} setPlayState={setPlayState} />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <TextField
          variant="outlined"
          placeholder="Search for Blocks and Samples"
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
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
