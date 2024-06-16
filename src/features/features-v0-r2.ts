import { ReleaseInfo } from '@/types/featureType';

export const releaseInfo : ReleaseInfo = {
  version: 'v0-r2',
  displayVersion: '0.2',
  features: [
    {
      title: 'Search for Blocks and Templates',
      description: 'You can search for blocks. By selecting templates, you can quickly complete your code.',
      image: '/feature/v0-r2/search-blocks.mp4'
    },
    {
      title: 'Subscribe Block Added',
      description: 'The powerful async "Subscribe" block has been added. It monitors XRPL transactions in real-time and allows the results to be used for condition evaluation.',
      image: '/feature/v0-r2/async-block.mp4',
    }
  ]
};
