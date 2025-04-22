'use client';


import { Spinner } from "@chakra-ui/react";
import axios from "axios"
import { useRouter } from "next/navigation"
import { log } from "node:console";
import { useEffect, useState } from "react";

function ProfilePage() {
  const router=useRouter()
  const [isLoading,setIsLoading]=useState(false)
  const [userData,setUserData]=useState({
    email:'',
    username:''
  })
  const [eventsCreatedByMe,setEventsCreatedByMe]=useState([])
  const [eventsParticipated,SetEventsParticipated]=useState([])
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
      setIsLoading(true)
      const res=await axios.get('/api/users/me')
      
      setUserData(res.data.data)
      SetEventsParticipated(res.data.data.event)
      
      
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
// console.log('created',eventsCreatedByMe);
console.log('parti',eventsParticipated);


 
  return (
    <div>
      {isLoading && <Spinner/>}
      {userData&& <h2>{userData.email}</h2>}
      <h1>My created events</h1>
      {eventsCreatedByMe?.length>0 && eventsCreatedByMe.map(item=><p>{item.name}</p>)}
      <h1>My participated events</h1>
      {eventsParticipated?.length>0 && eventsParticipated.map(item=><p>{item.name}</p>)}
      {/* <button onClick={handlelogout}>Logout</button> */}
    </div>
  )
}

export default ProfilePage