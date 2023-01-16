import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";

export class Client {
    ws: WebSocket;
    name: string;
    id: string;

    constructor(name: string) {
        this.name = name;
        this.id = uuid();
    }

    sendSelf(msg: string) {
        this.ws.send(msg);
    }
}
