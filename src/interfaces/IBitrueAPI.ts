// @/interfaces/IBitrueAPI.ts
export interface IBitrueDepthResponce {
  lastUpdateId: number;
  currentSeqId: number,
  bids: [string, string, any[]][]; // PRICE "4.00000000", QTY "431.00000000", Ignore.
  asks: [string, string, any[]][];
}
