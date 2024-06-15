import { Wallet } from 'xrpl';

export interface XRPLWalletMap {
  [key: string]: Wallet;
}

export const xrplWalletInstances : XRPLWalletMap = {};
