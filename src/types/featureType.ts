export interface Feature {
  title: string;
  description: string;
  image: string;
  onDemoEvent?: () => void;
}

export interface ReleaseInfo {
  version: string;
  displayVersion: string;
  features: Feature[];
}
