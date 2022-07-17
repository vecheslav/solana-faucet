import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useClipboard,
} from '@chakra-ui/react'
import { PublicKey } from '@solana/web3.js'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loading } from '../components/loading'
import useFetch from 'use-http'
import { config } from '../config'

type FormData = {
  mint: string
  to: string
  amount: number
}

export const MintTo = () => {
  const [mints, setMints] = useState<PublicKey[]>([
    new PublicKey('CoaLsx42C2sDqNEfxrtVgxoLcuw73QgWXa7YWdUVppGS'),
  ])

  const {
    handleSubmit,
    register,
    watch,
    formState: { isSubmitting },
  } = useForm<FormData>()
  const { post, response, loading } = useFetch(config.faucet)
  const selectedMint = watch('mint')
  const { hasCopied, onCopy } = useClipboard(selectedMint)

  const onMint = handleSubmit(async ({ mint, to, amount }) => {
    console.log('Minting...')

    const res = await post('/mint', { mint, to, amount })
    console.log(res)
  })

  if (!mints) {
    return <Loading>Loading mints...</Loading>
  }

  if (response.ok) {
    return (
      <Alert status='success' borderRadius='lg'>
        <AlertIcon />
        Success!
      </Alert>
    )
  }

  return (
    <>
      <form onSubmit={onMint}>
        <FormControl>
          <FormLabel>Mint</FormLabel>
          <Flex>
            <Select placeholder='Select option' {...register('mint', { required: true })}>
              {mints.map((pubkey) => {
                const pk = pubkey.toString()
                return (
                  <option value={pk} key={pk}>
                    {pk}
                  </option>
                )
              })}
            </Select>
            {selectedMint && (
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? 'Copied' : 'Copy'}
              </Button>
            )}
          </Flex>
        </FormControl>
        <FormControl mt={3}>
          <FormLabel>To</FormLabel>
          <Input placeholder='Pubkey' {...register('to', { required: true })} />
        </FormControl>
        <FormControl mt={3}>
          <FormLabel>Amount (lamports)</FormLabel>
          <Input placeholder='1000' {...register('amount', { required: true })} />
        </FormControl>
        <Button type='submit' size='lg' width='100%' mt={4} isLoading={isSubmitting || loading}>
          Mint
        </Button>
      </form>
    </>
  )
}
