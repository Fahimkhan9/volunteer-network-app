import { User } from '@/models/userModel'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

export const sendEmail=async ({email,emailType,userId}:any)=>{
    try {
      const hashedToken=await  bcrypt.hash(userId.toString(),10)
      if(emailType==='VERIFY'){
        await User.findByIdAndUpdate(userId,{
            verifyToken:hashedToken,
            verifyTokenExpiry:Date.now() +3600000
          })
      }else if(emailType==='RESET'){
        await User.findByIdAndUpdate(userId,{
            forgotPasswordToken:hashedToken,
            forgotPasswordExpiry:Date.now() +3600000
          })
      }
      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "25293f2d9c8856",
          pass: "8a3cceb6588ef6"
        }
      });
      const htmlink=emailType ==='VERIFY' ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`:`${process.env.DOMAIN}/forgotpassword/tokenverify?token=${hashedToken}`
      const emailOptions={
        from:'fahimalif077@gmail.com',
        to:email,
        subject:emailType ==='VERIFY' ? 'Verify your email':'Reset your password',
        html:`<p>Click <a href=${htmlink}>here</a> to ${emailType ==='VERIFY' ? 'Verify your email':'Reset your password'}</p>`
      }
      const mailresponse=await transport.sendMail(emailOptions)
      return mailresponse
    } catch (error) {
        console.log(error);
        
        
    }
}