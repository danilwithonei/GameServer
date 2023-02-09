import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";
import { IMessage, whereClient, Point } from "../interfaces";

export class Client {
    ws: WebSocket;
    name: string;
    id: string;
    roomName: string;
    roomId: string;
    position: Point;
    where: whereClient;

    constructor(name: string) {
        this.name = name;
        this.id = uuid();
        this.position = { x: 33, y: 33 };
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
    setXY(position: Point) {
        this.position.x = position.x;
        this.position.y = position.y;
    }
}
