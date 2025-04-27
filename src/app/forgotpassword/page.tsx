
'use client';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import axios from 'axios';
import { useState } from 'react';


function Forgotpasswordpage() {
   
    return (
        <div>
{/* <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
<button onClick={handleforgotpassword}>Send</button>
{emailSentSuccessfull && <h6>Check your email</h6>} */}
<ForgotPasswordForm

/>
        </div>
    )
}

export default Forgotpasswordpage
