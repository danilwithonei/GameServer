import WebSocket from "ws";
import "dotenv/config";
import { Player } from "./entities/player";
import { ServerServices } from "./services/server.services";
import { Room } from "./entities/room";
import { app } from "./expressServer";
import { messageCase } from "./interfaces";

const expressPort = process.env.EXPRESS_PORT;
const socketPort = process.env.SOCKET_PORT;

const server = new WebSocket.Server({ port: +socketPort }, () => {
    console.log(`### Server started on port! ${socketPort} ###`);
});

export const services = new ServerServices(server);

server.on("connection", (ws) => {
    // const newPlayer = new Player(ws);
    console.log(`new client connected`);
    const client = services.getClientByWs(ws);
    // services.players.push(newPlayer);

    ws.on("message", (msg) => {
        const command = msg.toString("utf-8").split("_")[0];
        const data = msg.toString("utf-8").split("_")[1];
        // const client = services.getOneByWs(ws);
        switch (command) {
            case "setUsername": {
                // client.setName(jsonMsg["username"]);
                break;
            }
            case "createRoom": {
                // const room = new Room(jsonMsg["roomName"]);
                // room.players_uuids.push(client.uuid);
                // services.rooms.push(room);
                // client.setRoom(room.name, room.uuid);
                break;
            }
            case "getRooms": {
                const roomNames = services.getRoomsNames();
                // client.sendSelf(JSON.stringify(roomNames));
                break;
            }
            case "getClients": {
                const clientsNames = services.getClientsNames();
                services.sendAll({ type: messageCase.clientsNames, data: clientsNames });

                break;
            }
            case "setClient": {
                services.setWs(ws, data);
                break;
            }
            case "go": {
                // client.setXY(jsonMsg["x"], jsonMsg["y"]);
                services.sendAllExept(ws);
                break;
            }
            case "setRoom": {
                // const roomName = jsonMsg["roomName"];
                // const room = services.getRoomByName(roomName);
                // client.setRoom(room.name, room.uuid);
                // room.players_uuids.push(client.uuid);
                break;
            }
        }
    });

    ws.on("close", () => {
        // const client = services.getOneByWs(ws);
        // services.players = services.players.filter((c) => c.ws !== ws);
        services.clients = services.clients.filter((c) => c.ws != ws);
        const clientsNames = services.getClientsNames();
        services.sendAll({ type: messageCase.clientsNames, data: clientsNames });
    });
});

app.listen(expressPort, () => {
    console.log(`### Express server started at http://localhost:${expressPort} ###`);
});
