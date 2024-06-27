// @/blocks/AsyncBlockResult.ts

export interface AsyncBlockResult {
  success: boolean,
  message: string,
  responce: any
};

export function getAsyncSuccess (responce: any) {
  return {
    success: true,
    message: 'success',
    responce: responce
  } as AsyncBlockResult;
}

export function getAsyncError (message: string) {
  return {
    success: false,
    message: message,
    responce: null
  } as AsyncBlockResult;
}
