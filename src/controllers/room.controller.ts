import { Room } from "../entities/room";
import { IController } from "../interfaces";
import { RoomService } from "../services/room.service";

export class RoomController implements IController {
    roomService = new RoomService();
    getAll(): Room[] {
        return this.roomService.getAll();
    }
    createRoom(name: string) {
        this.roomService.createRoom(name);
    }

    getOneById(id: string): Room {
        return this.roomService.getOneById(id);
    }
    getRoomsNamesAndId() {
        return this.roomService.getAll().map((room) => {
            return { name: room.name, id: room.uuid };
        });
    }
    getRoomByName(name: string): Room {
        return this.roomService.getRoomByName(name);
    }
}
