import { Room } from "../entities/room";

class RoomService {
    private rooms: Room[] = [];

    getAll(): Room[] {
        return this.rooms;
    }
    createRoom(name: string) {
        const room = new Room(name);
        this.rooms.push(room);
        return room;
    }

    getOneById(id: string): Room {
        return this.getAll().filter((room) => room.uuid === id)[0];
    }

    getRoomByName(name: string): Room {
        return this.getAll().filter((room) => room.name === name)[0];
    }

    deleteRoom(id: string) {
        console.log(`Server | delete room with id: ${id}`);
        return (this.rooms = this.rooms.filter((room) => room.uuid != id));
    }
}

export const roomService = new RoomService();
