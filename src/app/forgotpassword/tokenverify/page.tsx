'use client';
import { Flex, useColorModeValue, Stack, Heading, FormControl, Input, Button, Text } from '@chakra-ui/react';
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Token() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState('')
  const [isLoading,setIsLoading]=useState(false)
  const router = useRouter()
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  const handlereset = async () => {
   try {
    if(password){
      setIsLoading(true)
      const res = await axios.post(`/api/users/forgotpassword/tokenverify`, {
        token,
        password
      })
  
  
      if (res.data.success) {
        router.push('/login')
      }
    }else{
      alert("password cant be empty")
    }
   } catch (error) {
    
   }finally{
    setIsLoading(false)
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
         Reset your password!
        </Heading>

        
        <FormControl id="email">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Set new password"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
          isDisabled={isLoading}
            onClick={() => handlereset()}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
           Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default Token
