import { Client } from "../entities/client";

class ClientService {
    clients: Client[];

    createClient(name: string) {
        const client = new Client(name);
        this.clients.push(client);
        return client;
    }
}

export const clientService = new ClientService();
