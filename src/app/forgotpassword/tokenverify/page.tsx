'use client';
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Token() {
  const [token, setToken] = useState("");
const [password,setPassword]=useState('')
const router=useRouter()
 useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);
const handlereset=async ()=>{
    const res=await axios.post(`/api/users/forgotpassword/tokenverify`,{
        token,
        password
    })
    console.log(res.data);
    
    if(res.data.success){
        router.push('/login')
    }
}
  return (
    <div>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
  
  <button onClick={handlereset}>Reset password</button>
    </div>
  )
}

export default Token