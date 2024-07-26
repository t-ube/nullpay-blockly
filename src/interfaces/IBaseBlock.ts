export interface IBaseBlock {
  height: number;
  block: string;
  title: string;
  description: string;
  categories: string[];
  blockType?: string;
  subCategories?: XRPLSubCategories[];
}

export interface IBlockTypesMap<T extends IBaseBlock> {
  [key: string]: T[];
}

export enum XRPLSubCategories {
  BASIC_OPERATIONS = "basic operations",
  FUNDING_OPERATIONS = "funding operations",
  ACCOUNT_INFORMATION = "account information",
  MONITORING = "monitoring",
  TRANSACTIONS = "transactions",
  TIME_OPERATIONS = "time operations",
  TOKEN_OPERATIONS = "token operations",
  NFT_OPERATIONS = "nft operations",
  TRUST_LINE_OPERATIONS = "trust line operations",
  DEX_OPERATIONS = "dex operations"
}

export const SubCategoriesTranslations = {
  en: {
    [XRPLSubCategories.BASIC_OPERATIONS]: "Basic Operations",
    [XRPLSubCategories.FUNDING_OPERATIONS]: "Funding Operations",
    [XRPLSubCategories.ACCOUNT_INFORMATION]: "Account Information",
    [XRPLSubCategories.MONITORING]: "Monitoring",
    [XRPLSubCategories.TRANSACTIONS]: "Transactions",
    [XRPLSubCategories.TIME_OPERATIONS]: "Time Operations",
    [XRPLSubCategories.TOKEN_OPERATIONS]: "Token Operations",
    [XRPLSubCategories.NFT_OPERATIONS]: "NFT Operations",
    [XRPLSubCategories.TRUST_LINE_OPERATIONS]: "Trust Line Operations",
    [XRPLSubCategories.DEX_OPERATIONS]: "DEX Operations"
  },
  ja: {
    [XRPLSubCategories.BASIC_OPERATIONS]: "基本操作",
    [XRPLSubCategories.FUNDING_OPERATIONS]: "資金操作",
    [XRPLSubCategories.ACCOUNT_INFORMATION]: "アカウント情報",
    [XRPLSubCategories.MONITORING]: "モニタリング",
    [XRPLSubCategories.TRANSACTIONS]: "トランザクション",
    [XRPLSubCategories.TIME_OPERATIONS]: "時間操作",
    [XRPLSubCategories.TOKEN_OPERATIONS]: "トークン操作",
    [XRPLSubCategories.NFT_OPERATIONS]: "NFT操作",
    [XRPLSubCategories.TRUST_LINE_OPERATIONS]: "トラストライン操作",
    [XRPLSubCategories.DEX_OPERATIONS]: "DEX操作"
  }
};

export function translateSubCategory(category: XRPLSubCategories, language: 'en' | 'ja' = 'en'): string {
  return SubCategoriesTranslations[language][category] || category;
}

// サブカテゴリーの定義
const subCategoryDefinitions = {
  [XRPLSubCategories.BASIC_OPERATIONS]: "基本的なXRPL操作。ウォレットの生成、ネットワーク選択、クライアント初期化など、XRPLとの基本的なインタラクションを含む。",
  [XRPLSubCategories.FUNDING_OPERATIONS]: "資金関連の操作。XRPの送受信、faucetリクエスト、XRPとdropsの変換など、資金の移動や管理に関する操作を含む。",
  [XRPLSubCategories.ACCOUNT_INFORMATION]: "アカウント情報の取得と管理。アカウントの残高、設定、履歴などの情報を取得する操作を含む。",
  [XRPLSubCategories.MONITORING]: "XRPLのトランザクションやイベントのリアルタイム監視。特定のアカウントや全体のトランザクションの購読/購読解除を含む。",
  [XRPLSubCategories.TRANSACTIONS]: "XRPLトランザクションの作成、署名、送信、および取得。様々なタイプのトランザクションの処理と管理を含む。",
  [XRPLSubCategories.TIME_OPERATIONS]: "XRPL特有の時間操作。Rippleエポック時間と通常の日時との変換を含む。",
  [XRPLSubCategories.TOKEN_OPERATIONS]: "XRPLでのトークン操作。トークンの作成、送信、金額の設定や計算など、カスタムトークンに関する操作を含む。",
  [XRPLSubCategories.NFT_OPERATIONS]: "Non-Fungible Token (NFT) に関する操作。NFTの情報取得、購入オファーの作成などを含む。",
  [XRPLSubCategories.TRUST_LINE_OPERATIONS]: "信頼線（トラストライン）の操作。信頼線の設定、取得、リップリングの設定など、アカウント間の信頼関係に関する操作を含む。",
  [XRPLSubCategories.DEX_OPERATIONS]: "分散型取引所（DEX）関連の操作。オファーの作成、取得、処理など、XRPLのDEX機能に関連する操作を含む。"
};
