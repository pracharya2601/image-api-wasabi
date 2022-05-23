import { Request, Response } from "express";

export const resetPasswordGet = async (req: Request, res: Response) => {
    if(req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('auth/resetpassword', {
        email: '',
        error: '',
    })
}

export const resetPasswordPost = async (req: Request, res: Response) => {
    try {
        const {email} = req.body;
        res.redirect('/auth/login')
        //message is sent please check your email
    } catch (error) {
        return res.render('auth/resetpassword', {
            ...req.body,
            error: 'Something went wrong. Please try again later',
        })
        
    }
}