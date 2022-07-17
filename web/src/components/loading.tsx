import { Flex, FlexProps, Spinner, Text, SpinnerProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

export type LoadingProps = PropsWithChildren<FlexProps & SpinnerProps>
export const Loading = ({ size = 'md', ...rest }: LoadingProps) => (
  <Flex align='center' flexDirection='row' py='2' {...rest}>
    <Spinner size={size} color='gray.500' emptyColor='gray.100' speed='0.7s' />
    {rest.children && <Text ml={3}>{rest.children}</Text>}
  </Flex>
)
