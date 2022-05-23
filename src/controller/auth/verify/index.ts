import { Request, Response } from "express";
import { decrypt } from "@utils/crypto";

export const userVerify = async (req:Request, res: Response) => {
    const {verificationToken} = req.params;
    try {
        const dv = decrypt<{
            firstName: string, 
            lastName: string; 
            email: string;
            password: string;
            createdAt: string;
        }>(verificationToken);
        //update this data to mongodb
        global.message = "Successfully verified",
        console.log('decrypt data', {
            ...dv,
            verifiedAt: new Date().toISOString(),
        })
        res.redirect(`/ui/success?redirectUrl=${encodeURIComponent("/auth/login")}`)

    } catch (error) {
        global.error = "Something went wrong please try again later";
        res.redirect(`/ui/error?redirectUrl=${encodeURIComponent(`/auth/verify/${verificationToken}`)}/`)
    }
}