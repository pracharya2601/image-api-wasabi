import HttpException from "@utils/Error";
import { NextFunction, Request, Response } from "express";

export const errorHandeler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    if (!error.statusCode) error.statusCode = 500;
    if (error.statusCode === 301) {
        return res.status(301).redirect('/not-found');
    }
    if (error.statusCode === 401) {
        const redirectUrl = req.originalUrl;
        return res.redirect(`/auth/login?redirectUrl=${encodeURIComponent(redirectUrl)}`)
    }
    // res.render('ui/error', error);
    return res.status(error.statusCode).json({error: error.toString()})
}