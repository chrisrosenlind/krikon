import 'dotenv/config'
import { getKrakenTicker } from './api/ticker/get-kraken-ticker.js'

const main = async () => {
  console.log('Running program')
  const data = await getKrakenTicker('BTC', 'USD')
  console.log(data)
}

main()
