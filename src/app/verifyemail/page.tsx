'use client'

import { Center, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"

function Verifyemailpage() {
    
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.reponse.data.msg);
            
        }

    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);
    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);
   
  return (
    
         <Flex
               minH={'100vh'}
               align={'center'}
               justify={'center'}
               bg={useColorModeValue('gray.50', 'gray.800')}>
               <Stack
                 spacing={4}
                 w={'full'}
                 maxW={'md'}
                 bg={useColorModeValue('white', 'gray.700')}
                 rounded={'xl'}
                 boxShadow={'lg'}
                 p={6}
                 my={12}>
                 {
                    verified && <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                  Email Verification Successfull
                    </Heading>
                 }
                 {
                    error && <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                   {error}
                    </Heading>
                 }
                
                
               </Stack>
             </Flex>





  )
}

export default Verifyemailpage
