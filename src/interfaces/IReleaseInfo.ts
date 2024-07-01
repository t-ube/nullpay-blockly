import { IFeature } from '@/interfaces/IFeature';

export interface IReleaseInfo {
  version: string;
  displayVersion: string;
  features: IFeature[];
}
