import { connectToDB } from "@mongo/index";
import { encrypt } from "@utils/crypto";
import { Request, Response } from "express";

export const userLoginGet = async (req: Request, res: Response) => {
    const db = await connectToDB();
    if(req.session.user) {
        return res.redirect(req.query?.redirectUrl as string ? req.query?.redirectUrl as string : '/dashboard');
    }
    res.render('auth/login', {
        email: '',
        password: '',
        error: "",
        redirectUrl: req.query?.redirectUrl ? req.query?.redirectUrl : "/dashboard",
    })
}

export const userLoginPost = async (req: Request, res: Response) => {
    let redirectUrl = req.query?.redirectUrl as string;
    try {
        const {email, password} = req.body;
        //senitize email and password
        let data = {
            _id: 'thisisuserid',
            email,
            name: 'Random Name'
        }
        req.session.user = encrypt(data);
        res.redirect(redirectUrl || '/dashboard');

    } catch(error) {
        console.log('error');
        return res.render('auth/login', {
            ...req.body,
            error: 'Something went wrong please try agina later.'
        })
    }
}