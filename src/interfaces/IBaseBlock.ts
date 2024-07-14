export interface IBaseBlock {
  height: number;
  block: string;
  title: string;
  description: string;
  categories: string[];
}

export interface IBlockTypesMap<T extends IBaseBlock> {
  [key: string]: T[];
}
