'use client';

import UserForm from "@/components/UserForm";
import { sendEmail } from "@/helpers/mailer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function LoginPage() {
  
  const [user,setUser]=useState({
    email:'',
    password:'',
  })
  const [buttondisabled,setButtondisabled]=useState(false)
  const router=useRouter()
  useEffect(()=>{
    if(user.email.length >0 && user.password.length >0){
      setButtondisabled(false)
    }else{
      setButtondisabled(true)
    }
  },[user])
  const handlelogin=async()=>{
    try {
     const res=await axios.post('/api/users/login',user)
     console.log(res.data);
     
     router.push('/profile')
     
     
    } catch (error) {
      console.log(error);
      
    }

  }

  return (
    <>
    <UserForm
    islogin={true}
    />
    </>
  )
}

export default LoginPage