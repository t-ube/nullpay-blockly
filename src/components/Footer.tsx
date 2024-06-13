import React, { useEffect, forwardRef, ForwardedRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { PlayIcon, PauseIcon, StopIcon, FolderOpenIcon, DocumentArrowDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ButtonGroup, { PlayState } from '@/components/FooterButtons';
import { TextField, InputAdornment } from '@mui/material';
import { useMobile } from '@/contexts/MobileContext';

interface FooterProps {
  playState: PlayState;
  setPlayState: React.Dispatch<React.SetStateAction<PlayState>>;
  onSearchClick: () => void;
  onSaveClick: () => void;
  onLoadClick: () => void;
}

const Footer = React.forwardRef(({ playState, setPlayState, onSearchClick, onSaveClick, onLoadClick }: FooterProps, ref: ForwardedRef<HTMLElement>) => {
  const { isMobile, isPortrait, isLoaded } = useMobile();

  useEffect(() => {
    const footerHeight = ref && 'current' in ref && ref.current ? ref.current.offsetHeight : 0;
    document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
  }, [ref]);

  return (
    <>
    {isLoaded && (
      isMobile ? 
      isPortrait ?
        <footer
          ref={ref}
          style={{position: 'sticky', 'bottom': 0, zIndex: 1, height: '58px'}}
          className="flex-none bg-white text-gray-800 p-1 text-center w-full border-t"
        >
          <ButtonGroup playState={playState} setPlayState={setPlayState} onSaveClick={onSaveClick} onLoadClick={onLoadClick} />
        </footer>
      : (
        <footer ref={ref}>
        </footer>
      )
      : (
        <footer ref={ref} className="flex-none bg-white text-gray-800 p-1 text-center w-full border-t">
          <p style={{ fontSize: '12px' }}>© 2024 null pay - All Rights Reserved</p>
        </footer>
      )
    )
    }
    </>
  );
});

Footer.displayName = 'Footer';

export default Footer;
