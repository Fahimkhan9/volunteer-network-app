'use client'
import ProfileSidebar from '@/components/ProfileSidebar'
import { Box, Flex,Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {DeleteIcon}from '@chakra-ui/icons'
function RegisteredEvent() {
  const [eventsParticipated,SetEventsParticipated]=useState([])
  useEffect(()=>{
    const load=async ()=>{
      try {
         const res=await axios.get('/api/users/me')
         SetEventsParticipated(res.data.data.event)
      } catch (error) {
        
      }
    }
    load()
  },[])
  return (
    <>
   <Flex>
    <Box>
      <ProfileSidebar/>
    </Box>
    <Box p={4}>
    <TableContainer>
  <Table variant='striped' size='lg' colorScheme='purple'>
    <TableCaption>All registerd events by you</TableCaption>
    <Thead>
      <Tr>
        <Th>Title</Th>
        <Th>Description</Th>
        <Th>Location</Th>
        <Th>Date</Th>
        <Th>Time</Th>
        <Th>Action</Th>



      </Tr>
    </Thead>
    <Tbody>
    {
        eventsParticipated?.length>0 && eventsParticipated?.map(item=>(
          <Tr key={item._id}>
          <Td>{item.name}</Td>
          <Td>{item.description}</Td>
          <Td>{item.location}</Td>
          <Td>{item.date}</Td>
          <Td>{item.time}</Td>
          <Td>
            <DeleteIcon/>
            
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

export default RegisteredEvent