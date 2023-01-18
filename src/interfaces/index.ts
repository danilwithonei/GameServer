export enum messageCase {
    clientsNames = "clientsNames",
    lobbiesNames = "lobbiesNames",
}

export interface IMessage {
    type: messageCase;
    data: any;
}
