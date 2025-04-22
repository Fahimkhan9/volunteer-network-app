'use client'

import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Button,
} from '@chakra-ui/react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';




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
  
  console.log(checkExistingRegistered());
  
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative">
       

        <Image src='https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80' alt={`Picture of ${data.name}`} roundedTop="lg" />

        <Box p="6">
          
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated>
              {data.name} 
            </Box>
           
          </Flex>

          
            
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              {data.description}
            </Box>
           
          
          <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              {data.location}
            </Box>
          <Flex justifyContent="space-between" alignContent="center">
            
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              {data.date}
            </Box>
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              {data.time}
            </Box>
          </Flex>
         {
          checkExistingRegistered() ? <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
          Already registerd
        </Box>:registerbutton()
        }
          
          
        </Box>
        
      </Box>
    </Flex>
  )
}

export default EventCard