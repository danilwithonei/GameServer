import { EXPRESS_PORT, SOCKET_PORT } from "./utils/envar";
import WebSocket from "ws";
import { app } from "./expressServer";
import { messageCase } from "./interfaces";
import { clientController } from "./controllers/client.controller";
import { roomController } from "./controllers/room.controller";

const expressPort = EXPRESS_PORT;
const socketPort = SOCKET_PORT;

const server = new WebSocket.Server({ port: +socketPort }, () => {
    console.log(`### Server started on port! ${socketPort} ###`);
});

server.on("connection", (ws) => {
    console.log(`Server | new client connected`);

    ws.on("message", (msg) => {
        const command = msg.toString("utf-8").split("_")[0];
        const data = msg.toString("utf-8").split("_")[1];

        switch (command) {
            case "getRooms": {
                const roomsNames = roomController.getRoomsNamesAndId();
                const client = clientController.getOneByWs(ws);
                console.log(
                    `Server | client ${client?.name} requested rooms names: ${[...roomsNames]} `,
                );
                clientController.sendAll({ type: messageCase.roomsNames, data: roomsNames });
                break;
            }
            case "setClient": {
                clientController.setWs(ws, data);
                const client = clientController.getOneByWs(ws);
                console.log(`Server | client ${client.name} received ws!`);
                break;
            }
            case "go": {
                break;
            }
            case "join": {
                const [clientId, roomId] = data.split("|");
                const client = clientController.getOneByWs(ws);
                const room = roomController.getOneById(roomId);
                client.setRoom(room.name, room.uuid);
                console.log(`Server | client ${clientId} join to room ${roomId}`);

                break;
            }
        }
    });

    ws.on("close", () => {
        clientController.disconnect(ws);
    });
});

app.listen(expressPort, () => {
    console.log(`### Express server started at http://localhost:${expressPort} ###`);
});
