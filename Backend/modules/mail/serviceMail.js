import sgMail from '@sendgrid/mail'
import 'dotenv/config'


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = async (recipient, subject, html)  =>{
    await sgMail.send({
        to: recipient, 
        from: process.env.SENDGRID_MAIL_SENDER,
        subject: subject, 
        html: html
    })
}