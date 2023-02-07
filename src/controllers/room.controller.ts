import { Client } from "../entities/client";
import { Room } from "../entities/room";
import { IController, RoomBase } from "../interfaces";
import { roomService } from "../services/room.service";

export class RoomController implements IController {
    getAll(): Room[] {
        return roomService.getAll();
    }
    createRoom(name: string) {
        return roomService.createRoom(name);
    }

    getOneById(id: string): Room {
        return roomService.getOneById(id);
    }

    getRoomsBases(): RoomBase[] {
        return roomService.getAll().map((room) => {
            return { name: room.name, id: room.uuid, playersCount: room.playersIds.length };
        });
    }

    getRoomByName(name: string): Room {
        return roomService.getRoomByName(name);
    }
}

export const roomController = new RoomController();
