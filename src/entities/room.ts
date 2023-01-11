import { v4 as uuid } from "uuid";

export class Room {
    uuid: string;
    name: string;
    clients_uuids: string[];

    constructor(roomName: string) {
        this.uuid = uuid();
        this.name = roomName;
        this.clients_uuids = [];
    }
}
