'use client'
import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext=createContext()

export function UserContextProvider({children}){
    const [user,setUser]=useState(null)
    useEffect(()=>{
        const load=async ()=>{
            const res=await axios.get('/api/users/me')
            setUser(res.data.data)
          
            
        }
        load()
    },[])
return (
    <UserContext.Provider value={{user,setUser}}>
{children}
    </UserContext.Provider>
)
}