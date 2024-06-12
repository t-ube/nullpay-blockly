export interface Feature {
  title: string;
  description: string;
  image: string;
}

export interface ReleaseInfo {
  version: string;
  displayVersion: string;
  features: Feature[];
}
