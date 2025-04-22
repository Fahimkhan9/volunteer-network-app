'use client'
import { UserContextProvider } from '@/context/context'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import React from 'react'

function Providers({children}) {
  return (
   <UserContextProvider>
    <CacheProvider>
    <ChakraProvider>
        {children}
    </ChakraProvider>
    </CacheProvider>
     
   </UserContextProvider>
  )
}

export default Providers