'use client';

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SignupPage() {
  const [user,setUser]=useState({
    email:'',
    password:'',
    username:''
  })
  const [buttondisabled,setButtondisabled]=useState(false)
  const router=useRouter()
  useEffect(()=>{
    if(user.email.length >0 && user.password.length >0 && user.username.length >0){
      setButtondisabled(false)
    }else{
      setButtondisabled(true)
    }
  },[user])
  const handlesignup=async()=>{
    try {
     const res=await axios.post('/api/users/signup',user)
     console.log(res);
     router.push('/')
     
    } catch (error) {
      console.log(error);
      
    }

  }
  return (
    <div>
      <input type="text" placeholder="username" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} />
      <br />
      <input type="text" placeholder="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
      <br />
      <input type="text" placeholder="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} />
      <br />
      <button disabled={buttondisabled} onClick={handlesignup} >Signup</button>
      <br />
      <Link
      href='/login'
      >GO to login</Link>
    </div>
  )
}

export default SignupPage