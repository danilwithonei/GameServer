import { NextFunction, Request, Response } from "express";
import path from "path";
import { services } from "../server";

export async function isAuth(req: Request, res: Response, next: NextFunction) {
    try {
        next();
    } catch (error) {
        console.log(error);
        res.status(-1).send(error);
    }
}
