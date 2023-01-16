import { Player } from "../entities/player";
import { Room } from "../entities/room";
import WebSocket from "ws";
import { Client } from "../entities/client";

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

    getOnline(): number {
        return this.players.length;
    }
    getAllXYExept(ws: WebSocket): string {
        const allXY: string[] = [];
        // исправить что бы цикл был по uuid players у комнаты

        for (const client of this.players) {
            if (client.ws !== ws && this.getOneByWs(ws).roomUuid == client.roomUuid)
                allXY.push(`${client.x} ${client.y}`);
        }

        return allXY.toString();
    }

    sendAll(msg: string) {
        this.server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) client.send(msg);
        });
    }
    sendAllExept(ws: WebSocket) {
        const allXY = this.getAllXYExept(ws);
        this.getOneByWs(ws).ws.send(allXY);
    }

    getOneByWs(ws: WebSocket): Player {
        return this.players.filter((c) => c.ws === ws)[0];
    }

    getClientByWs(ws: WebSocket): Client {
        return this.clients.filter((c) => c.ws === ws)[0];
    }

    getRoomsNames() {
        const roomNames: string[] = [];
        this.rooms.forEach((room) => {
            roomNames.push(room.name);
        });
        return roomNames;
    }

    getClients(ws: WebSocket) {
        return this.clients.map((client) => {
            if (client.ws !== ws) return client.name;
        });
    }

    getRoomByName(name: string): Room {
        return this.rooms.filter((r) => r.name === name)[0];
    }
}
