import { Room } from "../entities/room";
import { IController } from "../interfaces";

class RoomController implements IController {
    getAll(): Room[] {
        return [];
    }

    getOneById(): Room {
        return;
    }
}

export const clientController = new RoomController();
