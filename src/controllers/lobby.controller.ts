import { Request, Response } from "express";
import { validationResult } from "express-validator";
import path from "path";
import { services } from "../server";

class LobbyController {
    async createLobby(req: Request, res: Response) {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Input errors ", errors });
        }
        try {
            const client = services.createClient(req.body.username);

            res.cookie("id", client.id);
            res.sendFile(path.join(__dirname, "../../views/html/gamePage.html"));
        } catch (error) {
            console.log(error);
            res.status(-1).json({ message: error });
        }
    }
}

export const lobbyController = new LobbyController();
