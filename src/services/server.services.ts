import { Player } from "../entities/player";
import { Room } from "../entities/room";
import WebSocket from "ws";
import { Client } from "../entities/client";
import { IMessage } from "../interfaces";

export class ServerServices {
    private server: WebSocket.Server<WebSocket.WebSocket>;
    clients: Client[] = [];
    players: Player[] = [];
    rooms: Room[] = [];

    constructor(server: WebSocket.Server<WebSocket.WebSocket>) {
        this.server = server;
    }

    createClient(name: string) {
        const client = new Client(name);
        this.clients.push(client);
        return client;
    }

    sendAll(msg: IMessage) {
        this.server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(msg));
        });
    }

    getOneByWs(ws: WebSocket): Player {
        return this.players.filter((c) => c.ws === ws)[0];
    }

    getClientByWs(ws: WebSocket): Client {
        return this.clients.filter((c) => c.ws === ws)[0];
    }

    getRoomsNames() {
        return this.rooms.map((room) => {
            return { name: room.name, id: room.uuid };
        });
    }

    getClientsNames() {
        return this.clients.map((client) => client.name);
    }

    setWs(ws: WebSocket, id: string) {
        const client = this.getClientById(id);
        client.ws = ws;
        return client;
    }

    getRoomByName(name: string): Room {
        return this.rooms.filter((r) => r.name === name)[0];
    }

    getClientById(id: string) {
        return this.clients.filter((c) => c.id == id)[0];
    }
}
