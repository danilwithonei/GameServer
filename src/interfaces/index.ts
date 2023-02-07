import { Client } from "../entities/client";
import { Room } from "../entities/room";

export interface RoomBase {
    name: string;
    id: string;
    playersCount: number;
}

export enum messageCase {
    clientsNames = "clientsNames",
    roomsNames = "roomsNames",
    playersPos = "playersPos",
}

export interface IMessage {
    type: messageCase;
    data: any;
}

export interface IController {
    getAll(): Client[] | Room[];
    getOneById(id: string): Client | Room;
}

export interface IClientController extends IController {
    createClient(name: string): Client;
}
