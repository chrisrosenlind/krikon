import axios from 'axios'
import type { KrakenTickerResponse, TickerInfo } from './types.js'
import { ASSET_MAPPING } from 'src/utils/kraken-asset-mapping.js'

const TICKER_URL = process.env.KRAKEN_BASE_URL + '/public/Ticker'

export const getKrakenTicker = async (
  baseAsset: string,
  quoteAsset: string
): Promise<TickerInfo | undefined> => {
  try {
    const base =
      ASSET_MAPPING[baseAsset.toUpperCase()] || baseAsset.toUpperCase()
    const quote =
      ASSET_MAPPING[quoteAsset.toUpperCase()] || quoteAsset.toUpperCase()
    const pairCode = base + quote

    const { data } = await axios.get<KrakenTickerResponse>(
      `${TICKER_URL}?pair=${pairCode}`
    )

    if (data.error.length) {
      console.error('Kraken API returned errors:', data.error)
      return undefined
    }

    const tickerData = data.result[pairCode]
    if (!tickerData) {
      console.error('No data for ticker:', pairCode)
      return undefined
    }

    return {
      pair: pairCode,
      lastPrice: parseFloat(tickerData.c[0]),
      bid: parseFloat(tickerData.b[0]),
      ask: parseFloat(tickerData.a[0]),
      volume: parseFloat(tickerData.v[1]),
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Could not get data', err.message)
    } else {
      console.error('Could not get data', err)
    }
    return undefined
  }
}
