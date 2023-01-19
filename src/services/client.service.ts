import WebSocket from "ws";
import { Client } from "../entities/client";

class ClientService {
    private clients: Client[] = [];

    createClient(name: string) {
        const client = new Client(name);
        this.clients.push(client);
        return client;
    }

    getAll() {
        return this.clients;
    }

    getOneByWs(ws: WebSocket): Client {
        return this.clients.filter((c) => c.ws === ws)[0];
    }

    getOneById(id: string) {
        return this.clients.filter((c) => c.id == id)[0];
    }
}

export const clientService = new ClientService();
