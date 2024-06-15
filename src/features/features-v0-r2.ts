import { ReleaseInfo } from '@/types/featureType';

export const releaseInfo : ReleaseInfo = {
  version: 'v0-r2',
  displayVersion: '0.2',
  features: [
    {
      title: 'Time Block Added',
      description: 'The Time Block controls time zones and time. It is a very important block.',
      image: '/feature/v0-r2/time-block.png'
    },
    {
      title: 'Block Search Feature Added',
      description: 'You can search for block descriptions and pre-built examples.',
      image: '/feature/v0-r2/search-blocks.png'
    }
  ]
};
