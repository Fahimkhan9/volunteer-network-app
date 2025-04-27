import { User } from '@/models/userModel'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import mailersend from 'mailersend'
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10)
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      })
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000
      })
    }
    // const transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: process.env.NODEMAILER_USER,
    //     pass: process.env.NODEMAILER_PASS
    //   }
    // });
    // const htmlink=emailType ==='VERIFY' ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`:`${process.env.DOMAIN}/forgotpassword/tokenverify?token=${hashedToken}`
    // const emailOptions={
    //   from:'fahimalif077@gmail.com',
    //   to:email,
    //   subject:emailType ==='VERIFY' ? 'Verify your email':'Reset your password',
    //   html:`<p>Click <a href=${htmlink}>here</a> to ${emailType ==='VERIFY' ? 'Verify your email':'Reset your password'}</p>`
    // }

    // const mailresponse=await transport.sendMail(emailOptions)
    // return mailresponse

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILER_SEND_TOKEN || '',
    });

    const sentFrom = new Sender("MS_oZ1rnk@test-3m5jgroo130gdpyo.mlsender.net", "Fahim from Volunteer Network");

    const recipients = [
      new Recipient(email, email)
    ];
const htmlink=emailType ==='VERIFY' ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`:`${process.env.DOMAIN}/forgotpassword/tokenverify?token=${hashedToken}`
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(emailType ==='VERIFY' ? 'Verify your email':'Reset your password')
      .setHtml(`<p>Click <a href=${htmlink}>here</a> to ${emailType ==='VERIFY' ? 'Verify your email':'Reset your password'}</p>`)
      .setText(emailType ==='VERIFY' ? 'Verify your email':'Reset your password');

    const emailres = await mailerSend.email.send(emailParams);

    return emailres;

  } catch (error) {
    console.log(error);


  }
}