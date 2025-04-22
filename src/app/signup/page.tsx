'use client';

import UserForm from "@/components/UserForm";
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
    <>
    <UserForm islogin={false}/>
    </>
  )
}

export default SignupPage