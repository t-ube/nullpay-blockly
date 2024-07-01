import React, { useEffect, ForwardedRef } from 'react';
import ButtonGroup from '@/components/FooterButtons';
import { useMobile } from '@/contexts/MobileContext';
import { IFooterProps } from '@/interfaces/IFooterProps';


const Footer = React.forwardRef(({ playState, setPlayState, onSearchClick, onSaveClick, onLoadClick }: IFooterProps, ref: ForwardedRef<HTMLElement>) => {
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
