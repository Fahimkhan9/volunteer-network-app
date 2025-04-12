'use client';


import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

function ProfilePage() {
  const router=useRouter()
  const [userData,setUserData]=useState({
    email:'',
    username:''
  })
  const handlelogout=async ()=>{
    try {
      const res =await axios.get('/api/users/logout')
      console.log(res.data);
      router.push('/login')
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    const handleLoad=async ()=>{
      const res=await axios.get('/api/users/me')
      console.log(res.data);
      setUserData(res.data.data)
      
    }
    handleLoad()
  },[])
 
  return (
    <div>
      {userData && <h2>{userData?.email}</h2>}
      {/* <button  onClick={handleLoad}>Load User Data</button> */}
      <button onClick={handlelogout}>Logout</button>
    </div>
  )
}

export default ProfilePage