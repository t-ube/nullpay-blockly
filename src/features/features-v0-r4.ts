import { IReleaseInfo } from '@/interfaces/IReleaseInfo';

export const releaseInfo : IReleaseInfo = {
  version: 'v0-r4',
  displayVersion: '0.4',
  features: [
    {
      "title": "Web API Block Added",
      "description": "Support for executing Web APIs has been added. This enables integration with centralized exchanges that provide public APIs.",
      "image": "/feature/v0-r4/request-webapi.mp4"
    },
    {
      "title": "Chart Block Added",
      "description": "The ability to display charts has been added. Users can now visually inspect real-time transaction information.",
      "image": "/feature/v0-r4/chart.mp4"
    },
    {
      "title": "Form Block Added",
      "description": "The capability to create input forms for variables has been added. The created forms will be automatically displayed, prompting the user to enter values.",
      "image": "/feature/v0-r4/form.mp4"
    },
    {
      "title": "'Semi-Automatic Bid' Template Added",
      "description": "This template monitors the bid price of an NFT and automatically adjusts the bid amount to maintain the highest price. The user is required to sign the transaction using the Xaman wallet to execute the bid.",
      "image": "/feature/v0-r4/semi-auto.mp4"
    }
  ]
};
