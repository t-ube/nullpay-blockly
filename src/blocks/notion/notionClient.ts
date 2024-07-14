export interface NotionClientMap {
  [key: string]: any;
}

export const notionClientInstances : NotionClientMap = {};

export function getNotionClient(variable:any) : any {
  return notionClientInstances[variable];
}
