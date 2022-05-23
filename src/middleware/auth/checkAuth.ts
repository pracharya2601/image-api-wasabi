import { NextFunction, Request, Response } from "express";
import {HttpException} from '@utils/Error';
import { decrypt } from "@utils/crypto";
import { User } from "src/types/User";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.authenticated = req.session.user ? true : false;
    next();
}

export const validateAuth = async(req: Request, res: Response, next: NextFunction) => {
    if(!req.session.user) {
        res.locals.authenticated = false;
        res.locals.userData = null;
        let error = new HttpException(401, 'Not Authorized.');
        return next(error);
    }
    const tokenstring =  req.session.user as string;
    const user = decrypt<User>(tokenstring);
    req.user = user;
    res.locals.userData = user;
    res.locals.authenticated = true;
    next();
}