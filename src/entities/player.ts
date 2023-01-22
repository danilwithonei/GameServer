import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";

export class Player {
    uuid: string;
    ws: WebSocket;
    name: string;
    x: Number;
    y: Number;
    roomName: string;
    roomId: string;

    constructor(ws: WebSocket) {
        this.uuid = uuid();
        this.ws = ws;
    }

    sendSelf(msg: string) {
        this.ws.send(msg);
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
