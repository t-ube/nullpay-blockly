import { Client } from 'xrpl';
import { EventTypes } from 'xrpl/dist/npm/models/methods/subscribe';

export interface IXRPLClientMap {
  [key: string]: Client;
}

export interface IXRPLClientEventListener {
  type: EventTypes;
  listener: (data: any) => void;
}

export interface IXRPLClientEventListenMap {
  [id: string]: IXRPLClientEventListener[];
}

export const xrplClientInstances : IXRPLClientMap = {};
export const xrplClientEventListeners: IXRPLClientEventListenMap = {};
