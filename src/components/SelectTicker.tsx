import { Card, CardBody, Stack, Button, FormControl, FormLabel } from '@chakra-ui/react'

import axios, { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import { ExchangeInfo } from '../interfaces/BinanceAPI'
import Autocomplete from './Autocomplete'

interface SelectTickerProps {
  onSubmit: (s: string) => void
}

const SelectTicker: FC<SelectTickerProps> = ({ onSubmit }) => {
  const [ticker, setTicker] = useState<string>('')

  const { data: tickerList } = useQuery({
    queryKey: 'exchangeInfo',
    queryFn: () => axios.get<ExchangeInfo>('https://data.binance.com/api/v3/exchangeInfo'),
    select: (data) =>
      data?.data.symbols.map(({ baseAsset, quoteAsset }) => `${baseAsset}/${quoteAsset}`),
  })

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(ticker.replace('/', ''))
  }

  return (
    <Card shadow="xl" w="full">
      <form onSubmit={handleOnSubmit}>
        <CardBody>
          <Stack w="sm" mx="auto" spacing="5">
            <FormControl>
              <FormLabel htmlFor="ticker">Select cryptocurrency ticker</FormLabel>
              <Autocomplete options={tickerList} value={ticker} onChange={setTicker} />
            </FormControl>
            <Button
              type="submit"
              isDisabled={!tickerList?.includes(ticker)}
              colorScheme="purple"
              w="sm"
              mx="auto"
            >
              Search
            </Button>
          </Stack>
        </CardBody>
      </form>
    </Card>
  )
}

export default SelectTicker
