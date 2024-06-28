import { Wallet } from 'xrpl';

export interface IXRPLWalletMap {
  [key: string]: Wallet;
}

export const xrplWalletInstances : IXRPLWalletMap = {};
