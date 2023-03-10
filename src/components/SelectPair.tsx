import { Card, CardBody, Stack, CardFooter, Button } from '@chakra-ui/react'

import axios from 'axios'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import { ExchangeInfo } from '../interfaces/BinanceAPI'
import Autocomplete from './Autocomplete'

interface SelectPairProps {
  onSubmit: (s: string) => void
}

const SelectPair: FC<SelectPairProps> = ({ onSubmit }) => {
  const [pair, setPair] = useState<string>('')

  const {
    isLoading,
    error,
    data: pairList,
  } = useQuery({
    queryKey: 'exchangeInfo',
    queryFn: () => axios.get<ExchangeInfo>('https://data.binance.com/api/v3/exchangeInfo'),
    select: (data) => data?.data.symbols.map(({ symbol }) => symbol),
  })

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(pair)
  }

  return (
    <Card shadow="xl" w="full">
      <form onSubmit={handleOnSubmit}>
        <CardBody>
          <Stack w="sm" mx="auto">
            <Autocomplete options={pairList} value={pair} onChange={setPair} />
          </Stack>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            // isDisabled={!isConnected || !sendTransaction || !to || !amount}
            // isLoading={isLoading}
            colorScheme="orange"
            size="lg"
            w="sm"
            mx="auto"
          >
            Search
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default SelectPair

{
  /* <FormControl>
    <FormLabel htmlFor="pair">Select cryptocurrency pair</FormLabel>
    <Input
      name="pair"
      type="text"
      list="pairs"
      fontSize="sm"
      onChange={handleOnChange}
      value={symbol}
    />
    <datalist id="pairs">
      {data?.map((symbol) => (
        <option key={symbol} value={symbol} />
      ))}
    </datalist>
  </FormControl> */
}
