'use client'

import ProfileSidebar from '@/components/ProfileSidebar'
import { Box, Flex, Text,  Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center, } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function EventCreatedDetails({params}:any) {
  const [allregistereduserforanevent,setAllregistereduserforanevent]=useState([])
  useEffect(()=>{
    const load=async()=>{
      try {
        const res=await axios.post('/api/events/getallregistereduserforanevent',{
          id:params.id
        })
        
        
        setAllregistereduserforanevent(res.data.data.participants)
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
        <Box p={10}>
      <Center>
      <TableContainer>
  <Table variant='striped' colorScheme='purple'>
    <TableCaption>All registered persons</TableCaption>
    <Thead>
      <Tr>
        <Th>Username</Th>
        <Th>Email</Th>
        
      </Tr>
    </Thead>
    <Tbody>
      {
        allregistereduserforanevent?.length>0 && allregistereduserforanevent?.map(item=>(
          <>
          <Tr>
            <Td>{item.username}</Td>
            <Td>{item.email}</Td>

          </Tr>
          </>
        ))
      }
    </Tbody>
   
  </Table>
</TableContainer>
      </Center>
        </Box>
    </Flex>
    </>
  )
}

export default EventCreatedDetails