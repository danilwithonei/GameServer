import { Client } from "../entities/client";
import { IController } from "../interfaces";

class ClientController implements IController {
    getAll(): Client[] {
        return [];
    }

    getOneById(): Client {
        return;
    }
}

export const clientController = new ClientController();
