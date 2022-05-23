import express from 'express';
import { Request, Response } from "express";

const staticRouter = express.Router();

staticRouter.get("/", (req: Request, res: Response) => {
    try {
        res.render('index');
    } catch(error) {
        res.render('index');
    }
});

staticRouter.post('/contact',async (req:Request, res: Response) => {
    const {email, message} = req.body;
    res.status(200).json({
        status: "OK",
        message: 'Message has been sent.'
    })
})

staticRouter.get('/privacy',async (req:Request, res: Response) => {
    res.render('privacy');
})

export default staticRouter;