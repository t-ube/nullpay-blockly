// @/interfaces/ICoinbaseProAPI.ts
export interface ICoinbaseProBookResponce {
  bids: [string, string, number[]][]; // PRICE "4.00000000", QTY "431.00000000", ORDER COUNT, 1
  asks: [string, string, number[]][];
  sequence: number;
  auction_mode: boolean;
  auction: any;
  time: string;
}