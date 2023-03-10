import { FC, useEffect, useMemo, useState } from 'react'
import { VStack, Container, Divider, Spinner, Flex } from '@chakra-ui/react'
import ColorModeSwitcher from './components/ColorModeSwitcher'
import SelectTicker from './components/SelectTicker'
import { useQueries } from 'react-query'
import { ExchangeInfo, Ticker24Hr, Trade } from './interfaces/BinanceAPI'
import axios, { AxiosResponse } from 'axios'
import TradesTable from './components/TradesTable'
import TickerInfos from './components/TickerInfos'

const App: FC = () => {
  const [symbol, setSymbol] = useState<string>('')

  const [exchangeInfoQuery, ticker24HrQuery, tradesQuery] = useQueries([
    {
      queryKey: `exchangeInfo-${symbol}`,
      queryFn: () =>
        axios.get<ExchangeInfo>(`https://data.binance.com/api/v3/exchangeInfo?symbol=${symbol}`),
      select: (data: AxiosResponse<ExchangeInfo, any>) => data?.data.symbols[0],
      enabled: !!symbol,
    },
    {
      queryKey: `ticker24Hr-${symbol}`,
      queryFn: () =>
        axios.get<Ticker24Hr>(`https://data.binance.com/api/v3/ticker/24hr?symbol=${symbol}`),
      select: (data: AxiosResponse<Ticker24Hr, any>) => data?.data,
      enabled: !!symbol,
    },
    {
      queryKey: `trades-${symbol}`,
      queryFn: () =>
        axios.get<Trade[]>(`https://data.binance.com/api/v3/trades?symbol=${symbol}&limit=${10}`),
      select: (data: AxiosResponse<Trade[], any>) => data?.data,
      enabled: !!symbol,
    },
  ])

  const isLoading = useMemo(
    () => exchangeInfoQuery.isLoading || ticker24HrQuery.isLoading || tradesQuery.isLoading,
    [exchangeInfoQuery, ticker24HrQuery, tradesQuery]
  )

  useEffect(() => {
    console.log('data', exchangeInfoQuery.data)
  }, [exchangeInfoQuery])

  return (
    <VStack minH="100vh">
      <ColorModeSwitcher ml="auto" />
      <Container maxW="3xl" centerContent>
        <SelectTicker onSubmit={setSymbol} />
        <Divider my="10" />
        {isLoading ? (
          <Spinner size="lg" color="purple" />
        ) : (
          <Flex direction="row" w="full" gap="5">
            {ticker24HrQuery.data && exchangeInfoQuery.data && (
              <TickerInfos
                symbolData={exchangeInfoQuery.data}
                ticker24HrData={ticker24HrQuery.data}
              />
            )}
            {tradesQuery.data && <TradesTable trades={tradesQuery.data} />}
          </Flex>
        )}
      </Container>
    </VStack>
  )
}

export default App
