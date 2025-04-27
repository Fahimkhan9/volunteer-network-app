'use client'

import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Icon,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react'
import axios from 'axios'

import { useState } from 'react'

export default function SearchEventForm({setEvents,setIsloading,isLoading}) {
  const [searchtext,setSearchText]=useState('')
  const handlesearch=async ()=>{
    if(searchtext){
      try {
        const data={
          title:searchtext
        }
        setIsloading(true)
        const res=await axios.post('/api/events/search',data)
      
        setEvents(res.data.data)
        setIsloading(false)
      } catch (error) {
        console.log(error);
        
      }
    }else{
      alert('required')
    }
   
    
    

  }
  return (
    <Flex
      
      align={'center'}
      justify={'center'}
      py={12}
      >
      <Stack
        boxShadow={'2xl'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        p={10}
        spacing={8}
        align={'center'}>
       
     
        <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
          <Input
          value={searchtext}
          onChange={(e)=>setSearchText(e.target.value)}
            type={'text'}
            placeholder={'Event Name'}
            color={useColorModeValue('gray.800', 'gray.200')}
            bg={useColorModeValue('gray.100', 'gray.600')}
            rounded={'full'}
            border={0}
            _focus={{
              bg: useColorModeValue('gray.200', 'gray.800'),
              outline: 'none',
            }}
          />
          <Button
          onClick={()=>handlesearch()}
            bg={'purple.400'}
            isDisabled={isLoading}
            rounded={'full'}
            color={'white'}
            flex={'1 0 auto'}
            _hover={{ bg: 'blue.500' }}
            _focus={{ bg: 'blue.500' }}>
            Search
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

