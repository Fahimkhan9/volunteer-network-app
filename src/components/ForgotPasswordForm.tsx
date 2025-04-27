'use client'

import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'

type ForgotPasswordFormInputs = {
  email: string
}

export default function ForgotPasswordForm() {
  const [email,setEmail]=useState('')
  const [isLoading,setIsLoading]=useState(false)
  const [emailSentSuccessfull,setEmailSentSuccessfull]=useState(false)
  const handleforgotpassword=async ()=>{
    if(email){
      try {
        setIsLoading(true)
        const res= await axios.post('/api/users/forgotpassword',{email})

      if(res.data.success) setEmailSentSuccessfull(true)
      } catch (error:any) {
        
      }finally{
        setIsLoading(false)
      }
    }else{
      alert('email value is required')
    }
     

  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot your password?
        </Heading>
        {emailSentSuccessfull&&  <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Email sent successfull.Check Email Inbox.
        </Text> }
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
          onClick={()=>handleforgotpassword()}
            bg={'blue.400'}
            color={'white'}
            isDisabled={isLoading}
            _hover={{
              bg: 'blue.500',
            }}>
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}