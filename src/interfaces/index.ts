export enum messageCase {
    clientsNames = "clientsNames",
}

export interface IMessage {
    type: messageCase;
    data: any;
}
