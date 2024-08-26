// @/blocks/chart/ChartDataHelper.ts
import { IOrderBookData, IOrderBookDataPoint } from '@/interfaces/IOrderBook';
import { IBitbankDepthResponce, IBitbankDepth } from '@/interfaces/IBitbankAPI';
import { IBitrueDepthResponce } from '@/interfaces/IBitrueAPI';
import { ICoinbaseProBookResponce } from '@/interfaces/ICoinbaseProAPI';

export function convertBitbankDepthToOrderBookData(bitbankDepth: IBitbankDepthResponce): IOrderBookData {
  const convertToDataPoints = (data: [string, string][]): IOrderBookDataPoint[] => {
    return data.map(([price, amount], index) => ({
      x: index,
      y: parseFloat(amount),
      price: parseFloat(price)
    }));
  };

  return {
    bids: convertToDataPoints(bitbankDepth.data.bids),
    asks: convertToDataPoints(bitbankDepth.data.asks)
  };
}

export function convertBitrueDepthToOrderBookData(bitrueDepth: IBitrueDepthResponce): IOrderBookData {
  const convertToDataPoints = (data: [string, string, any[]][]): IOrderBookDataPoint[] => {
    return data.map(([price, quantity], index) => ({
      x: index,
      y: parseFloat(quantity),
      price: parseFloat(price)
    }));
  };

  return {
    bids: convertToDataPoints(bitrueDepth.bids),
    asks: convertToDataPoints(bitrueDepth.asks)
  };
}

export function convertCoinbaseProBookToOrderBookData(coinbaseOrder: ICoinbaseProBookResponce): IOrderBookData {
  const convertToDataPoints = (data: [string, string, any[]][]): IOrderBookDataPoint[] => {
    return data.map(([price, quantity], index) => ({
      x: index,
      y: parseFloat(quantity),
      price: parseFloat(price)
    }));
  };

  return {
    bids: convertToDataPoints(coinbaseOrder.bids),
    asks: convertToDataPoints(coinbaseOrder.asks)
  };
}

export function extractBalancedOrderBook(orderBook: IOrderBookData, limit: number = 5): IOrderBookData {
  const sortedBids = [...orderBook.bids].sort((a, b) => b.price - a.price);
  const sortedAsks = [...orderBook.asks].sort((a, b) => a.price - b.price);

  const maxBidPrice = sortedBids[0]?.price || 0;
  const minAskPrice = sortedAsks[0]?.price || Infinity;

  const topBids = sortedBids
    .filter(bid => bid.price <= minAskPrice)
    .slice(0, limit)
    .map((bid, index) => ({ ...bid, x: index }));

  const topAsks = sortedAsks
    .filter(ask => ask.price >= maxBidPrice)
    .slice(0, limit)
    .map((ask, index) => ({ ...ask, x: index }));

  return {
    bids: topBids,
    asks: topAsks
  };
}

function getRandomNumber(min:number, max:number) {
  return Math.round(Math.random() * (max - min)) + min;
}

export function generateBidAndAskData(n:number):IOrderBookData {
  const data: IOrderBookData = { bids: [], asks: [] };
  let bidPrice = getRandomNumber(29000, 30000),
      askPrice = bidPrice + 0.5;
  for (let i = 0; i < n; i++) {
    bidPrice -= ((i * getRandomNumber(8, 10)));
    askPrice += ((i * getRandomNumber(8, 10)));
    data.bids.push({
      x: i,
      y: (i + 1) * getRandomNumber(70000, 110000),
      price: bidPrice
    });

    data.asks.push({
      x: i,
      y: (i + 1) * getRandomNumber(70000, 110000),
      price: askPrice
    });
  }
  return data;
}

const tradingData : IBitbankDepth = {
  "asks": [
    ["67.820", "374.8329"],
    ["67.821", "1410.4580"],
    ["67.824", "28.7115"],
    ["67.833", "220.4780"],
    ["67.834", "8823.5943"],
    ["67.857", "50.0000"],
    ["67.879", "1466.0000"]
  ],
  "bids": [
    ["67.804", "11835.7097"],
    ["67.799", "11043.4022"],
    ["67.795", "8823.5942"],
    ["67.791", "815.2579"],
    ["67.780", "3869.9200"],
    ["67.779", "7071.2885"],
    ["67.775", "334.8310"]
  ],
  "asks_over": "29165543.6673",
  "bids_under": "14140695.1080",
  "asks_under": "0.0000",
  "bids_over": "0.0000",
  "timestamp": 1720422555365,
  "sequenceId": "19234380107"
};

const bitrueData : IBitrueDepthResponce = {
  "lastUpdateId": 1720512822700,
  "currentSeqId": 38021684,
  "bids": [
      [
          "0.4344",
          "675715",
          []
      ],
      [
          "0.4343",
          "642990",
          []
      ],
      [
          "0.4342",
          "361685",
          []
      ],
      [
          "0.4341",
          "762950",
          []
      ],
      [
          "0.434",
          "347750",
          []
      ],
      [
          "0.4339",
          "371050",
          []
      ],
      [
          "0.4338",
          "294365",
          []
      ]
  ],
  "asks": [
      [
          "0.4345",
          "123470.1",
          []
      ],
      [
          "0.4346",
          "8380",
          []
      ],
      [
          "0.4347",
          "1473.9",
          []
      ],
      [
          "0.4348",
          "23653.8",
          []
      ],
      [
          "0.4349",
          "13265",
          []
      ],
      [
          "0.435",
          "107680",
          []
      ],
      [
          "0.4351",
          "89985",
          []
      ]
  ]
}