import { Request, Response } from "express";
import path from "path";
import { services } from "../server";

class AuthController {
    async createClient(req: Request, res: Response) {
        try {
            const client = services.createClient(req.body.name);
            res.cookie("id", client.id);
            res.sendFile(path.join(__dirname, "../../views/lobbiesPage.html"));
        } catch (error) {
            console.log(error);
            res.status(-1).json({ message: error });
        }
    }
}

export const authController = new AuthController();
