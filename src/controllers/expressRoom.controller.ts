import { Request, Response } from "express";
import { validationResult } from "express-validator";
import path from "path";
import { messageCase } from "../interfaces";
import { clientService } from "../services/client.service";
import { clientController } from "./client.controller";
import { roomService } from "../services/room.service";
import { roomController as serverRoomController } from "./room.controller";
class RoomController {
    async createRoom(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Input errors ", errors });
        }
        try {
            const room = roomService.createRoom(req.body.roomName);

            const client = clientService.getOneById(req.body.userId);
            client.setRoom(room.name, room.uuid);
            console.log(
                `client [${client.name}] with id: [${client.id}]\ncreated and join to room [${room.name}] with id [${room.uuid}]`,
            );
            res.sendFile(path.join(__dirname, "../../views/html/gamePage.html"));

            clientController.sendAll({
                type: messageCase.roomsNames,
                data: serverRoomController.getRoomsNamesAndId,
            });
        } catch (error) {
            console.log(error);
            res.status(-1).json({ message: error });
        }
    }

    async getAllRooms(req: Request, res: Response) {
        const roomNames = serverRoomController.getRoomsNamesAndId();
        res.send(JSON.stringify({ roomNames }));
    }
}

export const roomController = new RoomController();
