// @/interfaces/IOrderBook.ts
export interface IOrderBookDataPoint {
  x: number;      // Data point order / index
  y: number;      // Volume
  price: number;  // Price
}

export interface IOrderBookData {
  bids: IOrderBookDataPoint[];
  asks: IOrderBookDataPoint[];
}
