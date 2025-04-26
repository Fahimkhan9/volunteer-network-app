'use client';


import ProfileCard from "@/components/ProfileCard";
import ProfileSidebar from "@/components/ProfileSidebar";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react";

function ProfilePage() {
  const router=useRouter()
  const [isLoading,setIsLoading]=useState(false)
  const [userData,setUserData]=useState({
    email:'',
    username:''
  })
 

  useEffect(()=>{
    const handleLoad=async ()=>{
      setIsLoading(true)
      const res=await axios.get('/api/users/me')
      
      setUserData(res.data.data)
     
      setIsLoading(false)
    }
    handleLoad()
  },[])



 
  
  return (
    <>
    <Flex>
      <Box>
        <ProfileSidebar/>
      </Box>
      <Box 
     
      p={4}>
<ProfileCard/>

      </Box>
    </Flex>
    </>
  )
}

export default ProfilePage