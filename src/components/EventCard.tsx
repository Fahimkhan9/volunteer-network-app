'use client'

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'
import Image from 'next/image'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import img from '@/helpers/heroimg.jpg'



function EventCard({data,user}) {
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState('')
  const router=useRouter()
  console.log(data);
  console.log(user);
  
  
  const checkExistingRegistered = ()=>{
    user.event.map(item=>{
      if(item.id===data._id){
        console.log(data.name);
        
        return true
      }else{
        return false
      }
    })
  }
  const handleRegister=async (eventId,userId)=>{
    try {

      setIsLoading(true)
      const data={
        eventId,userId
      }
      const res=await axios.post('/api/events/registerforevent',data)
      setIsLoading(false)
      router.push('/profile')
    } catch (error) {
      setError(error)
    }
  }
  
  const registerbutton=()=>{
    
    
    if(!user?._id){
      return <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
      Login to register for this event
    </Box>
    }else if(data?.ownerId == user?._id){
      return <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
      See Profile
    </Box>
    }else if(checkExistingRegistered()===true){
      return <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
      Already registered
    </Box>
    }
    else{
      return <Button
      onClick={()=>handleRegister(data._id,user?._id)}
      size='lg' isDisabled={isLoading} colorScheme='purple'>Register for this</Button>
    }
  }
  
  
  
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image
            src={img}
            width={200}
            height={200}
            alt="Example"
          />
        </Box>
        <Stack>
         
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {data.name}
          </Heading>
          <Text color={'gray.500'}>
            {data.description}
          </Text>
          <Text
            
            fontWeight={800}
            // fontSize={'sm'}
            // letterSpacing={1.1}
            >
            Location:{data.location}
          </Text>
          <Text
            
            fontWeight={800}
            // fontSize={'sm'}
            // letterSpacing={1.1}
            >
            Date & time:{data.date} {data.time}
          </Text>
        </Stack>
        <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            Event Organizer
          </Text>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar name={user.username} 
          src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} 
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{user.email}</Text>
            <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}

export default EventCard