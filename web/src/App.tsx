import {
  Text,
  Box,
  ChakraProvider,
  Container,
  Heading,
  Badge,
  Flex,
  Divider,
} from '@chakra-ui/react'
import React from 'react'
import { config } from './config'
import { MintTo } from './views/mintTo'

const App = () => {
  return (
    <ChakraProvider>
      <Container maxW='520px' p={3}>
        <Box border='1px' borderColor='gray.200' p={4} borderRadius={'xl'}>
          <Heading as='h1' fontSize={'xl'} mb={3}>
            💰 SPL Token Faucet
          </Heading>
          <Flex align='center'>
            <Badge>API</Badge>
            <Text fontSize='sm' ml={2}>
              {config.faucet}
            </Text>
          </Flex>
          <Divider my={4} />
          <MintTo />
        </Box>
      </Container>
    </ChakraProvider>
  )
}

export default App
