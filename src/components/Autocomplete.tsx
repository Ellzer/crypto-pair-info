import {
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputRightElement,
  Card,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC, useMemo, useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

interface AutocompleteProps {
  options: string[] | undefined
  value: string
  onChange: (value: string) => void
}

const Autocomplete: FC<AutocompleteProps> = ({ options, value, onChange }) => {
  const colorMode = useColorModeValue('dark', 'light')
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const filteredOptions = useMemo(
    () => options?.filter((option) => option.includes(value)),
    [options, value]
  )

  const isOpen = useMemo(
    () =>
      isFocused &&
      value &&
      !options?.includes(value) &&
      filteredOptions &&
      filteredOptions.length > 0,
    [isFocused, value, options, filteredOptions]
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value.trim().toUpperCase())
  }

  const handleOptionClick = (option: string) => {
    onChange(option)
  }

  const handleClearClick = () => {
    onChange('')
  }

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} />
        </InputLeftElement>
        <Input
          name="pair"
          value={value}
          placeholder="Search..."
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        />
        {value && (
          <InputRightElement>
            <Icon boxSize="3" as={FaTimes} cursor="pointer" onClick={handleClearClick} />
          </InputRightElement>
        )}
      </InputGroup>
      {isOpen && filteredOptions && (
        <Card variant="outline" position="absolute" w="full" zIndex="1">
          <List mt={2}>
            {filteredOptions.map((option) => (
              <ListItem
                key={option}
                px={4}
                py={2}
                _hover={{ background: colorMode === 'dark' ? 'gray.100' : 'gray.900' }}
                onClick={() => handleOptionClick(option)}
                cursor="pointer"
              >
                <Text>{option}</Text>
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </>
  )
}

export default Autocomplete
