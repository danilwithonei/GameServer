import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";
import { IMessage } from "../interfaces";

export class Client {
    ws: WebSocket;
    name: string;
    id: string;

    constructor(name: string) {
        this.name = name;
        this.id = uuid();
    }

    sendSelf(msg: IMessage) {
        this.ws.send(JSON.stringify(msg));
    }
}
