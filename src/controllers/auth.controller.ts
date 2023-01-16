import { Request, Response } from "express";
import path from "path";
import { services } from "../server";

export class AuthController {
    async createClient(req: Request, res: Response) {
        const client = services.createClient(req.body.name);
        res.cookie("id", client.id);
        res.sendFile(path.join(__dirname, "../../views/lobbiesPage.html"));
    }
}
