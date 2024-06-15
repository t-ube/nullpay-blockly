import { Client } from 'xrpl';
import { EventTypes } from 'xrpl/dist/npm/models/methods/subscribe';

export interface XRPLClientMap {
  [key: string]: Client;
}

export interface XRPLClientEventListener {
  type: EventTypes;
  listener: (data: any) => void;
}

export interface XRPLClientEventListenMap {
  [id: string]: XRPLClientEventListener[];
}

export const xrplClientInstances : XRPLClientMap = {};
export const xrplClientEventListeners: XRPLClientEventListenMap = {};
