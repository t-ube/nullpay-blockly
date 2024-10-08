import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const XamanLogo: React.FC<Omit<SvgIconProps, 'color'>> = (props) => {
  return (
    <SvgIcon viewBox="0 0 512 512" {...props}>
      <rect width="512" height="512" rx="101" ry="101" fill="#2240f6"/>
      <g>
        <path d="M193.3,265.93l36.25,36.12c7.84,7.74,11.76,14.4,11.76,19.99s-3.92,11.93-11.76,19.67c-7.84,7.52-14.48,11.29-19.92,11.29s-12.08-3.87-19.92-11.61l-35.93-35.8-36.25,35.8c-7.84,7.74-14.48,11.61-19.92,11.61s-11.87-3.76-19.92-11.29c-7.84-7.74-11.76-14.3-11.76-19.67s3.92-12.25,11.76-19.99l36.25-36.12-36.25-36.12c-7.84-7.74-11.76-14.3-11.76-19.67s3.92-12.25,11.76-19.99c8.06-7.74,14.7-11.61,19.92-11.61s12.08,3.87,19.92,11.61l36.25,36.12,35.93-36.12c7.84-7.74,14.48-11.61,19.92-11.61s12.08,3.87,19.92,11.61c7.84,7.74,11.76,14.4,11.76,19.99s-3.92,11.93-11.76,19.67l-36.25,36.12Z" fill="#fff"/>
        <path d="M462.99,181.02c12.77,11.46,13.72,30.97,2.11,43.58l-105.81,115c-5.83,6.34-14.08,10-22.76,10.1-8.68.1-17.01-3.37-23-9.57l-56.81-58.9c-11.9-12.34-11.42-31.87,1.08-43.62,12.5-11.75,32.28-11.28,44.18,1.06l33.65,34.89,83.23-90.45c11.6-12.61,31.37-13.55,44.14-2.09Z" fill="#fff" fillRule="evenodd"/>
      </g>
    </SvgIcon>
  );
};

export default XamanLogo;