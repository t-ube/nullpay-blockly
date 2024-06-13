"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

const MobileContext = createContext<{
  isMobile: boolean;
  isPortrait: boolean;
  isLoaded: boolean;
}>({
  isMobile: false,
  isPortrait: true,
  isLoaded: false,
});

export const useMobile = () => useContext(MobileContext);

const checkIsMobile = () => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const mobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return mobile || window.innerWidth <= 600;
};

const checkIsPortrait = () => {
  return window.matchMedia("(orientation: portrait)").matches; //window.innerHeight > window.innerWidth;
};

export const MobileProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleResize = () => {
    setIsMobile(checkIsMobile());
    setIsPortrait(checkIsPortrait());
    setIsLoaded(true);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <MobileContext.Provider value={{ isMobile, isPortrait, isLoaded }}>
      {children}
    </MobileContext.Provider>
  );
};
