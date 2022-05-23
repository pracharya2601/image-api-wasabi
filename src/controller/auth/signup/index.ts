import { encrypt, passHash } from "@utils/crypto";
import { createMessage, sendMail } from "@utils/sendgrid";
import { Request, Response } from "express";

export const userSignupGet = async (req: Request, res: Response) => {
    if(req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('auth/signup', {
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        confirmPassword: '',
        error: '',
    })
}

export const userSignupPost = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, password, confirmPassword} = req.body;
        const pass = await passHash(password);
        const token = encrypt({
            firstName, lastName, email, password: pass, createdAt: new Date().toISOString(),
        })
        const message = createMessage(email, firstName, token);
        await sendMail(message)
        return res.redirect(`/ui/success?redirectUrl=${encodeURIComponent("/auth/login")}`);
        
    } catch(error) {
        return res.render('auth/signup', {
            ...req.body,
            error: "Something went wrong. Please try agian later."
        })
    }
}