import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";
import { IMessage } from "../interfaces";

export class Client {
    ws: WebSocket;
    name: string;
    id: string;
    roomName: string;
    roomId: string;
    x: Number;
    y: Number;

    constructor(name: string) {
        this.name = name;
        this.id = uuid();
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
    setXY(x: Number, y: Number) {
        this.x = x;
        this.y = y;
    }
}
