export type KrakenTickerResponse = {
  error: string[]
  result: Record<
    string,
    {
      a: [string, string, string] // ask [price, whole lot volume, lot volume]
      b: [string, string, string] // bid
      c: [string, string] // last trade [price, volume]
      v: [string, string] // volume [today, last 24h]
      p: [string, string] // volume weighted avg price [today, last 24h]
      t: [number, number] // number of trades [today, last 24h]
      l: [string, string] // low price [today, last 24h]
      h: [string, string] // high price [today, last 24h]
      o: string // opening price
    }
  >
}

export type TickerInfo = {
  pair: string
  lastPrice: number
  bid: number
  ask: number
  volume: number
}
