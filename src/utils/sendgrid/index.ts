import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const createMessage = (sendTo: string, firstName: string, token: string) => {
    return {
        to: sendTo, // Change to your recipient
        from: {
            email: 'noreply@prakashacharya.com',
            name:'API Mangaer'
        },
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `
        <body>
            Hello ${firstName}, Thanks for signing up to D&CS API. Please verify the account
            <a href="http://localhost:8080/auth/verify/${token}" target="_/blank">
                <button style="color:blue;padding-right:10px;padding-left:10px;padding-top:5px;padding-bottom:5px;">
                    Verify the account
                <button>
            <a>
        
        </body>
        `,
}
}

export const sendMail = async (message: any) => {
    try {
        await sgMail.send(message);
        return true;
    } catch (error) {
        console.log('error; happening on sendMail', error);
        return false;
    }
} 
