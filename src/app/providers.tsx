'use client'
import { UserContextProvider } from '@/context/context'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

function Providers({children}) {
  return (
   <UserContextProvider>
     <ChakraProvider>
        {children}
    </ChakraProvider>
   </UserContextProvider>
  )
}

export default Providers