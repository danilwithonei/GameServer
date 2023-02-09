import { v4 as uuid } from "uuid";
import { clientController } from "../controllers/client.controller";
import { messageCase, PlayerBase } from "../interfaces";

export class Room {
    uuid: string;
    name: string;
    playersIds: string[];

    constructor(roomName: string) {
        this.uuid = uuid();
        this.name = roomName;
        this.playersIds = [];
    }

    getAllPos() {
        const allPos: PlayerBase[] = [];
        for (const clientId of this.playersIds) {
            const client = clientController.getOneById(clientId);
            allPos.push({ id: client.id, name: client.name, position: client.position });
        }
        return allPos;
    }
    deletePlayerById(playerId: string): void {
        this.playersIds = this.playersIds.filter((id) => id !== playerId);
    }

    sendAll() {
        for (const clientId of this.playersIds) {
            const client = clientController.getOneById(clientId);
            client.sendSelf({ type: messageCase.playersPos, data: this.getAllPos() });
        }
    }
    resetClientId(fromId: string, toId: string) {
        for (let index = 0; index < this.playersIds.length; index++) {
            if (this.playersIds[index] === fromId) {
                this.playersIds[index] = toId;
            }
        }
    }
}
