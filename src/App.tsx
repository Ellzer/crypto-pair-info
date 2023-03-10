import { FC, useEffect, useState } from 'react'
import { VStack, Container, Divider, useQuery } from '@chakra-ui/react'
import ColorModeSwitcher from './components/ColorModeSwitcher'
import SelectPair from './components/SelectPair'
import { useQueries } from 'react-query'
import { Ticker24h, TickerPrice, Trade } from './interfaces/BinanceAPI'
import axios, { AxiosResponse } from 'axios'
import TradesTable from './components/TradesTable'

const App: FC = () => {
  const [symbol, setSymbol] = useState<string>('')

  // const params = { symbol }

  // const queryList = [
  //   { queryKey: 'tickerPrice', endpoint: 'ticker/price', params },
  //   { queryKey: 'ticker24h', endpoint: 'ticker/24hr', params },
  //   { queryKey: 'trades', endpoint: 'trades', params: { limit: 10, ...params } },
  // ]

  // const queries = useQueries(
  //   queryList.map(({ queryKey, endpoint, params }) => ({
  //     queryKey,
  //     queryFn: () =>
  //       axios.get<Ticker24h | TickerPrice | Trade>(`https://data.binance.com/api/v3/${endpoint}`, {
  //         params,
  //       }),
  //     enabled: !!symbol,
  //   }))
  // )

  const [tickerPriceQuery, ticker24hQuery, tradesQuery] = useQueries([
    {
      queryKey: 'tickerPrice',
      queryFn: () =>
        axios.get<TickerPrice>('https://data.binance.com/api/v3/ticker/price', {
          params: { symbol },
        }),
      enabled: !!symbol,
    },
    {
      queryKey: 'ticker24h',
      queryFn: () =>
        axios.get<Ticker24h>('https://data.binance.com/api/v3/ticker/24hr', {
          params: { symbol },
        }),
      enabled: !!symbol,
    },
    {
      queryKey: 'trades',
      queryFn: () =>
        axios.get<Trade[]>('https://data.binance.com/api/v3/trades', {
          params: { limit: 10, symbol },
        }),
      select: (data: AxiosResponse<Trade[], any>) => data?.data,
      enabled: !!symbol,
    },
  ])

  // useEffect(() => {
  //   console.log('tradesQuery', tradesQuery.data)
  // }, [tradesQuery])

  return (
    <VStack minH="100vh">
      <ColorModeSwitcher ml="auto" />
      <Container maxW="xl" centerContent>
        <SelectPair onSubmit={setSymbol} />
        <Divider my="10" />
        {tradesQuery.data && <TradesTable trades={tradesQuery.data} />}
      </Container>
    </VStack>
  )
}

export default App
