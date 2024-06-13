import React, { useEffect, forwardRef, ForwardedRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { PlayIcon, PauseIcon, StopIcon, FolderOpenIcon, DocumentArrowDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ButtonGroup, { PlayState } from '@/components/HeaderButtons';
import { TextField, InputAdornment } from '@mui/material';
import { useMobile } from '@/contexts/MobileContext';

interface HeaderProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
  onSearchClick: () => void;
  onSaveClick: () => void;
  onLoadClick: () => void;
}

const Header = React.forwardRef(({ playState, setPlayState, onSearchClick, onSaveClick, onLoadClick }: HeaderProps, ref: ForwardedRef<HTMLElement>) => {
  const { isMobile, isPortrait, isLoaded } = useMobile();

  useEffect(() => {
    const headerHeight = ref && 'current' in ref && ref.current ? ref.current.offsetHeight : 0;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  }, [ref]);

  if (!isLoaded) {
    return <div></div>;
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
        <ButtonGroup playState={playState} setPlayState={setPlayState} onSaveClick={onSaveClick} onLoadClick={onLoadClick}/>
      ) : !isPortrait &&
        (
          <ButtonGroup playState={playState} setPlayState={setPlayState} onSaveClick={onSaveClick} onLoadClick={onLoadClick}/>
        )
      }
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
