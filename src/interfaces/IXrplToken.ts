// @/interfaces/IXrplToken.ts
export interface IXrplToken {
  issuer: string;            // Issuer address
  total_supply: string;      // Total supply
  currency_code: string;     // Currency code
};

export interface IXrplTokenAmount {
  currency: string;          // Currency code
  issuer: string;            // Issuer address
  value: string;             // Value
};
