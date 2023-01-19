import { Client } from "../entities/client";
import { Room } from "../entities/room";

export enum messageCase {
    clientsNames = "clientsNames",
    lobbiesNames = "lobbiesNames",
}

export interface IMessage {
    type: messageCase;
    data: any;
}

export interface IController {
    getAll(): Client[] | Room[];
    getOneById(): Client | Room;
}
