
'use client'
import ProfileSidebar from '@/components/ProfileSidebar'
import { Box, Flex, SimpleGrid,useColorModeValue,Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  Center,
  Text,
  Button, } from '@chakra-ui/react'
  import {DeleteIcon, ViewIcon}from '@chakra-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

function CreatedEvent() {
  const [eventsCreatedByMe,setEventsCreatedByMe]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
    const handleLoad=async ()=>{
      setIsLoading(true)
      const res=await axios.get('/api/users/me')
      
      
      
      
      if(res.data.data._id){
        const data={
          ownerId:res.data.data._id
        }
        
        
        const events=await axios.post('/api/events/getcreatedevent',data)
        
        
        setEventsCreatedByMe(events.data.data)
        setIsLoading(false)
      }
      
    }
    handleLoad()
  },[])
  const handledeleteEvent=async  (id)=>{
    try {
      const data={id}
      const res=await axios.post('/api/events/deletevent',data)
    
      let update=eventsCreatedByMe.filter(item=>item?._id!=id)
      setEventsCreatedByMe(()=>update)
      
    } catch (error) {
      
    }
  }
  return (
    <>
    <Flex>
      <Box>
      <ProfileSidebar/>
      </Box>
    <Box  px={4}>
    <TableContainer>
  <Table variant='striped' size='lg' colorScheme='purple'>
    <TableCaption>Events created by you</TableCaption>
    <Thead>
      <Tr>
        <Th>Title</Th>
        <Th>Description</Th>
        <Th>Location</Th>
        <Th>Date</Th>
        <Th>Time</Th>
        <Th>See</Th>
        <Th>Delete</Th>




      </Tr>
    </Thead>
    <Tbody>
    <Center>
    {isLoading&& <Spinner/>}
  
    </Center>
      {
        eventsCreatedByMe?.length>0 && eventsCreatedByMe.map(item=>(
          <Tr key={item?._id}>
          <Td>{item?.name}</Td>
          <Td>{item?.description}</Td>
          <Td>{item?.location}</Td>
          <Td>{item?.date}</Td>
          <Td>{item?.time}</Td>
          <Td>
            <Link href={`/profile/created/${item?._id}`} >
            <Button> <ViewIcon/></Button>
           
            </Link>  
            </Td>
            <Td >
              <Button onClick={()=>handledeleteEvent(item?._id)}>
              <DeleteIcon/>
              </Button>
              
            </Td>
        </Tr>
        ))
      }
    
     
    </Tbody>
  
  </Table>
</TableContainer>
    </Box>
    </Flex>
   
  
    </>
  )
}

export default CreatedEvent