import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Text,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Card,
  CardBody,
} from '@chakra-ui/react'

import { FC, useMemo } from 'react'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { Trade } from '../interfaces/BinanceAPI'
import { useTable, useSortBy, Column, CellProps } from 'react-table'

interface TradesTableProps {
  trades: Trade[]
}

const TradesTable: FC<TradesTableProps> = ({ trades }) => {
  const data = useMemo(() => trades, [trades])
  const columns = useMemo<Column<Trade>[]>(
    () => [
      {
        Header: 'Time',
        accessor: 'time',
        Cell: ({ value }: CellProps<Trade>) => (
          <Text>{new Date(value).toLocaleString('fr-FR')}</Text>
        ),
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ value }: CellProps<Trade>) => <Text>{parseFloat(value)}</Text>,
      },
      {
        Header: 'Quantity',
        accessor: 'qty',
        Cell: ({ value }: CellProps<Trade>) => <Text>{parseFloat(value)}</Text>,
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'time',
            desc: true,
          },
        ],
      },
    },
    useSortBy
  )

  return (
    <Card shadow="xl" flex="3">
      <CardBody>
        <Heading pb="5" fontSize="lg" mr="auto">
          Recent trades
        </Heading>
        {trades.length > 0 ? (
          <TableContainer>
            <Table {...getTableProps()} size="sm">
              <Thead>
                {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <Th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        isNumeric={column.id === 'qty'}
                      >
                        <Flex display="inline-flex" align="center">
                          {column.render('Header')}
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaSortDown />
                            ) : (
                              <FaSortUp />
                            )
                          ) : (
                            <FaSort />
                          )}
                        </Flex>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row)
                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <Td {...cell.getCellProps()} isNumeric={cell.column.id === 'qty'}>
                          {cell.render('Cell')}
                        </Td>
                      ))}
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Text>There are no trades to display</Text>
        )}
      </CardBody>
    </Card>
  )
}

export default TradesTable
