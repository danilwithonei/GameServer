import WebSocket from "ws";
import { Client } from "../entities/client";
import { IClientController, IMessage } from "../interfaces";
import { clientService } from "../services/client.service";

class ClientController implements IClientController {
    createClient(name: string) {
        return clientService.createClient(name);
    }

    getAll(): Client[] {
        return clientService.getAll();
    }

    getOneById(id: string): Client {
        return clientService.getOneById(id);
    }

    getOneByWs(ws: WebSocket): Client {
        return clientService.getOneByWs(ws);
    }

    sendAll(msg: IMessage) {
        this.getAll().forEach((client) => {
            if (client.ws.readyState === WebSocket.OPEN) client.sendSelf(msg);
        });
    }

    getClientsNames() {
        return this.getAll().map((client) => client.name);
    }

    setWs(ws: WebSocket, id: string) {
        const client = clientService.getOneById(id);
        client.ws = ws;
        return client;
    }
}

export const clientController = new ClientController();
