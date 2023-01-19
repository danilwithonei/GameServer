import { Room } from "../entities/room";

export class RoomService {
    private rooms: Room[];

    getAll(): Room[] {
        return this.rooms;
    }
    createRoom(name: string) {
        this.rooms.push(new Room(name));
    }

    getOneById(id: string): Room {
        return this.getAll().filter((room) => room.uuid === id)[0];
    }
    getRoomByName(name: string): Room {
        return this.getAll().filter((room) => room.name === name)[0];
    }
}
