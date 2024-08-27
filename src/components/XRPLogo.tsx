import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const XRPLogo: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 143.29 112.31" {...props}>
      <path d="M122.37,0h20.72l-43.18,40.47c-7.75,7.01-17.82,10.89-28.27,10.89s-20.52-3.88-28.27-10.89L.19,0h20.72l32.72,30.59c4.89,4.48,11.28,6.97,17.91,6.97s13.02-2.49,17.91-6.97L122.37,0Z" fill="#000"/>
      <path d="M20.72,112.31H0l43.37-40.66c7.7-7.1,17.79-11.03,28.27-11.03s20.57,3.94,28.27,11.03l43.37,40.66h-20.72l-32.92-30.98c-4.89-4.49-11.28-6.97-17.91-6.97s-13.02,2.49-17.91,6.97l-33.11,30.98Z" fill="#000"/>
    </SvgIcon>
  );
};

export default XRPLogo;