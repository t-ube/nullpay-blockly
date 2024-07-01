import { IReleaseInfo } from '@/interfaces/IReleaseInfo';

export const releaseInfo : IReleaseInfo = {
  version: 'v0-r3',
  displayVersion: '0.3',
  features: [
    {
      "title": "CSV Table Block Added",
      "description": "Support for reading and writing CSV files has been added. You can now execute programs using local off-chain information.",
      "image": "/feature/v0-r3/load-csv.mp4"
    },
    {
      "title": "Supabase Block Added",
      "description": "Reading and writing to Supabase is now possible. Connect to a relational database to handle larger datasets.",
      "image": "/feature/v0-r3/supabase-logo.png"
    },
    {
      "title": "Xaman Variable Block Added",
      "description": "Save variables to Xaman Wallet. Ideal for storing highly confidential information such as API tokens.",
      "image": "/feature/v0-r3/xaman-variable.mp4"
    },
    {
      "title": "New Template Added",
      "description": "A new template has been added. You can now check the flow from token creation to sales and purchases, and more easily analyze transactions. Give it a try!",
      "image": "/feature/v0-r3/new-template.png"
    }
  ]
};
