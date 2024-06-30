// @/blocks/AsyncBlockResult.ts
import { IAsyncBlockResult } from '@/interfaces/IAsyncBlockResult';

export function getAsyncSuccess (responce: any) {
  return {
    success: true,
    message: 'success',
    responce: responce
  } as IAsyncBlockResult;
}

export function getAsyncError (message: string) {
  return {
    success: false,
    message: message,
    responce: null
  } as IAsyncBlockResult;
}
