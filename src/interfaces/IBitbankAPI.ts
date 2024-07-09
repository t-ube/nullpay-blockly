// @/interfaces/IBitbankAPI.ts
export interface IBitbankDepthResponce {
  success: number,
  data: IBitbankDepth
}

export interface IBitbankDepth {
  asks: [string, string][];
  bids: [string, string][];
  asks_over: string;
  bids_under: string;
  asks_under: string;
  bids_over: string;
  timestamp: number;
  sequenceId: string;
}
