'use client'
import EventCard from '@/components/EventCard'
import SearchEventForm from '@/components/SearchEventForm'
import { Box, Center, HStack, SimpleGrid, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Events() {
    const [events,setEvents]=useState(null)
    const [isloading,setIsloading]=useState(false)
    const [user,setUser]=useState(null)
     const getuser=async ()=>{
            const res=await axios.get('/api/users/me')
            setUser(res.data.data)
            
        }
        const load=async ()=>{
            setIsloading(true)
            const res=await axios.get('/api/events/allevents')
            
            
            setEvents(res.data.data)
            setIsloading(false)
        }
    
    useEffect(()=>{
      
      
        getuser()
        load()
    },[])
  
   
  
  return (
    <>
    <Center>
    <HStack>
    <SearchEventForm
   setEvents={setEvents}
   setIsloading={setIsloading}
   isLoading={isloading}
   />
   {
        isloading && <Spinner/>
    }
    </HStack>
  
    </Center>
    
    <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {
        events && events.map(item=>(
            <EventCard 
            key={item._id}
            data={item}
            user={user}
            />
        ))
    }
        </SimpleGrid>
    </Box>
    
    </>
  )
}

export default Events