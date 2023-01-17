import { Request, Response } from "express";
import { validationResult } from "express-validator";
import path from "path";
import { services } from "../server";

class AuthController {
    async createClient(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Input errors ", errors });
        }
        try {
            const client = services.createClient(req.body.username);
            res.cookie("id", client.id);
            res.sendFile(path.join(__dirname, "../../views/html/lobbiesPage.html"));
        } catch (error) {
            console.log(error);
            res.status(-1).json({ message: error });
        }
    }
}

export const authController = new AuthController();
