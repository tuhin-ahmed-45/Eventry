'use server'

import EmailTemplate from "@/components/payment/EmailTemplate";
import { createUser, foundUserByCredentials, getEventById, updateGoing, updateInterested } from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

async function registerUser(formData) {
    const user = Object.fromEntries(formData)
    const created = await createUser(user)
    redirect('/login')
}

async function performLogin(formData) {

    try {
        const credential = {};
        credential.email = formData.get('email')
        credential.password = formData.get('password')
        const found = await foundUserByCredentials(credential)

        return found
    } catch (error) {
        throw error
    }
}

async function addInterestedEvent(eventId, authId) {
    try {
        await updateInterested(eventId, authId)
    } catch (error) {
        throw error
    }
    revalidatePath('/')
}

async function addGoingEvent(eventId, user) {
    try {
        await updateGoing(eventId, user?.id)
        await sendEmail(eventId, user)
    } catch (error) {
        throw error
    }
    revalidatePath('/')
    redirect('/')
}

async function sendEmail(eventId, user) {

    try {
        const event = getEventById(eventId)
        const resend = new Resend(process.env.RESEND_APY_KEY)
        const message = `
        Dear ${user?.name},
        
        Thank you for choosing ${event?.name}. We are pleased to inform you that your payment ticket has been successfully processed. Below, you will find the details of your transaction for your reference:
        
        **Payment Details:**
        - **Transaction ID:**
        - **Amount Paid:** [Amount Paid]
        - **Payment Date:** [Payment Date]
        - **Payment Method:** [Payment Method]
        - **Service/Product:** [Service/Product Name]
        
        We appreciate your prompt payment and continued trust in our services. If you have any questions or need further assistance, please do not hesitate to contact our support team. We are here to help!
        
        You can reach us via:
        - **Email:** [Support Email Address]
        - **Phone:** [Support Phone Number]
        - **Live Chat:** [Live Chat URL] (available during business hours)
        
        Thank you once again for your business. We look forward to serving you in the future.
        
        Note: This is an automated email. Please do not reply to this message.
        
        ---
        
        [Include any additional disclaimers or company policies here, if necessary.]
        
        ---
        
        This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the sender immediately and delete this email from your system.
        
        ---
        
        Feel free to customize the placeholders with your company's specific details and policies. If you need further adjustments or have any specific requests, please let me know!`

        const sent = await resend.emails.send({
            from: "noreply.event.support.io",
            to: user?.email,
            subject: "Your Payment Ticket has been Successfully Processed!",
            react: EmailTemplate({ message })
        })

    } catch (error) {
        throw error
    }
}

export {
    addGoingEvent,
    addInterestedEvent,
    performLogin,
    registerUser,
    sendEmail
};

