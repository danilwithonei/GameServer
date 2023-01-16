import { v4 as uuid } from "uuid";

export class Room {
    uuid: string;
    name: string;
    players_uuids: string[];

    constructor(roomName: string) {
        this.uuid = uuid();
        this.name = roomName;
        this.players_uuids = [];
    }
}
