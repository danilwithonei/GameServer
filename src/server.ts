import WebSocket from "ws";
import "dotenv/config";
import { ServerServices } from "./services/server.services";
import { app } from "./expressServer";
import { messageCase } from "./interfaces";

const expressPort = process.env.EXPRESS_PORT;
const socketPort = process.env.SOCKET_PORT;

const server = new WebSocket.Server({ port: +socketPort }, () => {
    console.log(`### Server started on port! ${socketPort} ###`);
});

export const services = new ServerServices(server);

server.on("connection", (ws) => {
    console.log(`Server | new client connected`);

    ws.on("message", (msg) => {
        const command = msg.toString("utf-8").split("_")[0];
        const data = msg.toString("utf-8").split("_")[1];

        switch (command) {
            case "getLobbies": {
                const lobbiesNames = services.getRoomsNames();
                services.sendAll({ type: messageCase.lobbiesNames, data: lobbiesNames });
                break;
            }
            case "setClient": {
                services.setWs(ws, data);
                break;
            }
            case "go": {
                break;
            }
            case "join": {
                const [clientId, roomId] = JSON.parse(data);

                break;
            }
        }
    });

    ws.on("close", (msg) => {
        console.log(...services.clients);

        services.clients = services.clients.filter((c) => {
            if (c.ws?.CLOSED) {
                console.log(`Server| Client ${c.name} was disconnected`);
            } else {
                return c;
            }
        });
        const clientsNames = services.getClientsNames();
        services.sendAll({ type: messageCase.clientsNames, data: clientsNames });
    });
});

app.listen(expressPort, () => {
    console.log(`### Express server started at http://localhost:${expressPort} ###`);
});
