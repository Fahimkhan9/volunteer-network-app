
'use client';
import axios from 'axios';
import { useState } from 'react';


function Forgotpasswordpage() {
    const [email,setEmail]=useState('')
    const [emailSentSuccessfull,setEmailSentSuccessfull]=useState(false)
    const handleforgotpassword=async ()=>{
       const res= await axios.post('/api/users/forgotpassword',{email})
console.log(res.data);
        if(res.data.success) setEmailSentSuccessfull(true)

    }
    return (
        <div>
<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
<button onClick={handleforgotpassword}>Send</button>
{emailSentSuccessfull && <h6>Check your email</h6>}
        </div>
    )
}

export default Forgotpasswordpage