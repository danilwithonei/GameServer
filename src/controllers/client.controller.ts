import WebSocket from "ws";
import { Client } from "../entities/client";
import { IClientController, IMessage } from "../interfaces";
import { clientService } from "../services/client.service";
import { roomService } from "../services/room.service";
import { messageCase } from "../interfaces/index";
import { roomController } from "./room.controller";

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
            if (client.ws?.readyState === WebSocket.OPEN) client.sendSelf(msg);
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

    disconnect(ws: WebSocket) {
        const client = clientService.getOneByWs(ws);
        if (client) {
            const room = roomService.getOneById(client.roomId);
            room?.playersIds.filter((clientId) => clientId !== client.id);
            if (room?.playersIds.length == 0) roomService.deleteRoom(room.uuid);
        }
        console.log(`Server | disconnected client with id: ${client.id}`);
        clientService.deleteClient(client.id);

        this.sendAll({ type: messageCase.roomsNames, data: roomController.getRoomsNamesAndId() });
    }
}

export const clientController = new ClientController();
