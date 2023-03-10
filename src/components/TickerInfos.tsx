import { Card, CardBody } from '@chakra-ui/card'
import { StackDivider, VStack } from '@chakra-ui/layout'
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat'
import { FC } from 'react'
import { Symbol, Ticker24Hr } from '../interfaces/BinanceAPI'

interface TickerInfosProps {
  ticker24HrData: Ticker24Hr
  symbolData: Symbol
}

const TickerInfos: FC<TickerInfosProps> = ({
  symbolData: { baseAsset, quoteAsset },
  ticker24HrData: {
    lastPrice,
    priceChange,
    priceChangePercent,
    highPrice,
    lowPrice,
    volume,
    quoteVolume,
  },
}) => {
  const formatNumber = (val: string) => {
    const num = parseFloat(val)
    return num > 1 || num === 0 ? num.toFixed(2) : num
  }

  const variationColor =
    parseFloat(priceChangePercent) > 0
      ? 'green'
      : parseFloat(priceChangePercent)
      ? 'red'
      : undefined

  return (
    <Card flex="1">
      <CardBody>
        <VStack divider={<StackDivider />} align="flex-start">
          <Stat>
            <StatLabel fontSize="xs">Ticker</StatLabel>
            <StatNumber fontSize="lg">
              {baseAsset}/{quoteAsset}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="xs">Price</StatLabel>
            <StatNumber fontSize="md">{formatNumber(lastPrice)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="xs">24h Change</StatLabel>
            <StatNumber fontSize="md">{formatNumber(priceChange)}</StatNumber>
            <StatNumber fontSize="md" color={variationColor}>
              {formatNumber(priceChangePercent)}%
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="xs">24h High</StatLabel>
            <StatNumber fontSize="md">{formatNumber(highPrice)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="xs">24h Low</StatLabel>
            <StatNumber fontSize="md">{formatNumber(lowPrice)}</StatNumber>
          </Stat>
          <Stat size="sm">
            <StatLabel fontSize="xs">24h Volume({baseAsset})</StatLabel>
            <StatNumber fontSize="md">{formatNumber(volume)}</StatNumber>
          </Stat>
          <Stat size="sm">
            <StatLabel fontSize="xs">24h Volume({quoteAsset})</StatLabel>
            <StatNumber fontSize="md">{formatNumber(quoteVolume)}</StatNumber>
          </Stat>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default TickerInfos
