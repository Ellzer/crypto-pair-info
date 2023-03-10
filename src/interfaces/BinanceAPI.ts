export interface Symbol {
  symbol: string
  status: string
  baseAsset: string
  baseAssetPrecision: number
  quoteAsset: string
  quotePrecision: number
  quoteAssetPrecision: number
  orderTypes: string[]
  icebergAllowed: boolean
  ocoAllowed: boolean
  quoteOrderQtyMarketAllowed: boolean
  baseCommissionPrecision: number
  quoteCommissionPrecision: number
  allowTrailingStop: boolean
  cancelReplaceAllowed: boolean
  isSpotTradingAllowed: boolean
  isMarginTradingAllowed: boolean
  filters: {
    filterType?: string
    minPrice?: string
    maxPrice?: string
    tickSize?: string
    multiplierUp?: string
    multiplierDown?: string
    avgPriceMins?: number
    minQty?: string
    maxQty?: string
    stepSize?: string
    minNotional?: string
    limit?: number
  }[]
  permissions: string[]
  defaultSelfTradePreventionMode: string
  allowedSelfTradePreventionModes: string[]
}

export interface ExchangeInfo {
  timezone: string
  serverTime: number
  rateLimits: {
    rateLimitType?: string
    interval?: string
    intervalNum?: number
    limit?: number
  }[]
  exchangeFilters: {
    filterType?: string
    minNotional?: string
    limit?: number
  }[]
  symbols: Symbol[]
}

export interface TickerPrice {
  symbol: string
  price: string
}

export interface Ticker24h {
  symbol: string
  priceChange: string
  priceChangePercent: string
  weightedAvgPrice: string
  prevClosePrice: string
  lastPrice: string
  lastQty: string
  bidPrice: string
  bidQty: string
  askPrice: string
  askQty: string
  openPrice: string
  highPrice: string
  lowPrice: string
  volume: string
  quoteVolume: string
  openTime: number
  closeTime: number
  firstId: number
  lastId: number
  count: number
}

export interface Trade {
  id: number
  price: string
  qty: string
  quoteQty: string
  time: number
  isBuyerMaker: boolean
  isBestMatch: boolean
}
