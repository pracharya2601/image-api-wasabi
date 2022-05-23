import express from 'express';
import { Request, Response } from "express";

const uiRouter = express.Router();

uiRouter.get("/success", (req: Request, res: Response) => {
    console.log('success', global.message);
    const message = global.message || 'Success';
    global.message = "";
    try {
        res.render("success/index", {
            message
        });
    } catch(error) {
        res.redirect('/ui/error');
    }
});

uiRouter.get('/error',async (req:Request, res: Response) => {
    const data = {
        message: 'Error Happened right now',
    }
    res.render("error/index", data);
})

export default uiRouter;