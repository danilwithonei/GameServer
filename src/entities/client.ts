import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";
import { IMessage, whereClient } from "../interfaces";

export class Client {
    ws: WebSocket;
    name: string;
    id: string;
    roomName: string;
    roomId: string;
    x: number;
    y: number;
    where: whereClient;

    constructor(name: string) {
        this.name = name;
        this.id = uuid();
        this.x = 0;
        this.y = 0;
        this.where = whereClient.inRoomCreating;
    }

    sendSelf(msg: IMessage) {
        this.ws.send(JSON.stringify(msg));
    }

    setRoom(roomName: string, roomId: string) {
        this.roomName = roomName;
        this.roomId = roomId;
    }

    setName(name: string) {
        this.name = name;
    }
    setXY(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
