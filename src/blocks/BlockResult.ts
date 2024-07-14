// @/blocks/BlockResult.ts
import { IBlockResult } from '@/interfaces/IBlockResult';

export function getBlockSuccess () {
  return {
    success: true,
    message: 'success'
  } as IBlockResult;
}

export function getBlockError (message: string) {
  return {
    success: false,
    message: message
  } as IBlockResult;
}
