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
  TableContainer,
  Button,
  Spinner, } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {DeleteIcon}from '@chakra-ui/icons'
function RegisteredEvent() {
  const [eventsParticipated,SetEventsParticipated]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [userid,setUserid]=useState('')
  useEffect(()=>{
    const load=async ()=>{
      try {
        setIsLoading(true)
         const res=await axios.get('/api/users/me')
         SetEventsParticipated(res.data.data.event)
         setUserid(res.data.data._id)
        setIsLoading(false)

      } catch (error) {
        console.log(error);
        // setIsLoading(false)
      }
    }
    load()
  },[])
  const handledeleteregistration=async (id)=>{
    try {
      const data={id,userid}
      console.log(data);
      
      const res=await axios.post('/api/events/deleteregistration',data)
      const update=eventsParticipated.filter(i=>i._id !=id)
      SetEventsParticipated(()=>update)
      console.log(res);
      
    } catch (error) {
      
    }
  }
  return (
    <>
   <Flex>
    <Box>
      <ProfileSidebar/>
    </Box>
    <Box p={4}>

    <TableContainer>
  <Table variant='striped' size='lg' colorScheme='purple'>
    <TableCaption>Events you have registered for.</TableCaption>
    {/* {isLoading && <Spinner/>} */}
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
            <Button onClick={()=>handledeleteregistration(item?.id)} >
            <DeleteIcon color={'red'} />
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

export default RegisteredEvent