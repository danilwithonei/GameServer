import { Request, Response } from "express";
import { validationResult } from "express-validator";
import path from "path";
import { clientService } from "../services/client.service";
import { SOCKET_PORT, SOCKET_URL } from "../utils/envar";

class AuthController {
    createClient(req: Request, res: Response) {
        console.log(`new user with name ${req.body.username}`);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Input errors ", errors });
        }
        try {
            const client = clientService.createClient(req.body.username);
            res.cookie("id", client.id);
            res.sendFile(path.join(__dirname, "../../views/html/roomsPage.html"));
        } catch (error) {
            console.log(error);
            res.status(-1).json({ message: error });
        }
    }

    getSocketUrl(req: Request, res: Response) {
        try {
            res.send(`wss://${SOCKET_URL}:${SOCKET_PORT}`);
        } catch (error) {
            console.log(error);
            res.status(-1).json({ message: error });
        }
    }
}

export const authController = new AuthController();
