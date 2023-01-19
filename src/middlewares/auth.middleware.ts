import { NextFunction, Request, Response } from "express";

export async function isAuth(req: Request, res: Response, next: NextFunction) {
    try {
        next();
    } catch (error) {
        console.log(error);
        res.status(-1).send(error);
    }
}
