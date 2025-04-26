'use client'

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
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
  
  
  const checkExistingRegistered = () => {
    if (data?.participants?.length > 0) {
      for (let item of data?.participants) { // Use a for...of loop for better control
        if (item?.id === user?._id) {
          return true; // Return true as soon as a match is found
        }
      }
      // If the loop finishes without finding a match, return false
      return false;
    }
    // If there are no participants, return false
    return false;
  };
  
  const handleRegister=async (eventId,userId)=>{
    try {

      setIsLoading(true)
      const data={
        eventId,userId
      }
      const res=await axios.post('/api/events/registerforevent',data)
      setIsLoading(false)
      router.push('/profile/registered')
    } catch (error) {
      setError(error)
    }
  }
  
  const registerbutton=()=>{
    let isregistered=checkExistingRegistered()
    console.log(isregistered);
    
    if(!user?._id){
      return <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
      Login to register for this event
    </Box>
    }else if(data?.ownerId == user?._id){
      return <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
      See Profile
    </Box>
    }else if(isregistered){
      return <Box fontSize="2xl"  color={useColorModeValue('gray.800', 'white')}>
    Already registered.
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
            src={data.image}
            width={200}
            height={200}
            alt="event image"
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
        
        <Stack mt={6} direction={'column'} spacing={4} align={'center'}>
          {/* <Avatar name={user.username} 
          src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} 
          /> */}
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            Event Organizer
          </Text>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>
              <a href={`mailto:${data?.owneremail}`}> {data?.owneremail}</a>
             
              </Text>
              {registerbutton()}
          </Stack>
        </Stack>
     
      
      </Box>
    </Center>
  )
}

export default EventCard