import { IReleaseInfo } from '@/interfaces/IReleaseInfo';

export const releaseInfo: IReleaseInfo = {
  version: 'v0-r6',
  displayVersion: '0.6',
  features: [
    {
      "title": "Guide Feature Added",
      "description": "A beginner-friendly guide has been added. Users can follow the instructions to build blocks step by step.",
      "image": "/feature/v0-r6/guide.mp4"
    },
    {
      "title": "AI Generation Feature Added",
      "description": "An AI-powered block generation feature has been added. Users can instruct the AI via chat to generate blocks.",
      "image": "/feature/v0-r6/ai.mp4"
    }
  ]
};
