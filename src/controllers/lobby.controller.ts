import { Request, Response } from "express";
import { validationResult } from "express-validator";
import path from "path";
import { Room } from "../entities/room";
import { services } from "../server";

class LobbyController {
    async createLobby(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Input errors ", errors });
        }
        try {
            const room = new Room(req.body.lobbyName);
            services.rooms.push(room);
            const client = services.getClientById(req.body.userId);
            client.setRoom(room.name, room.uuid);
            console.log(
                `client [${client.name}] with id: [${client.id}]\ncreated and join to lobby [${room.name}] with id [${room.uuid}]`,
            );
            res.sendFile(path.join(__dirname, "../../views/html/gamePage.html"));
        } catch (error) {
            console.log(error);
            res.status(-1).json({ message: error });
        }
    }
    async getAllLobbies(req: Request, res: Response) {
        const roomNames = services.getRoomsNames();
        res.send(JSON.stringify({ roomNames }));
    }
}

export const lobbyController = new LobbyController();
