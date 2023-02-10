import WebSocket from "ws";
import { expressPort, socketPort, host, mode } from "./envConfig";
import { app } from "./expressServer";
import { messageCase } from "./interfaces";
import { clientController } from "./controllers/client.controller";
import { roomController } from "./controllers/room.controller";

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
                const roomsBases = roomController.getRoomsBases();
                const client = clientController.getOneByWs(ws);
                console.log(
                    `Server | client ${client.name} requested rooms names: ${[...roomsBases]} `,
                );
                clientController.sendAll({ type: messageCase.roomsNames, data: roomsBases });
                break;
            }
            case "setClient": {
                clientController.setWs(ws, data);
                const client = clientController.getOneByWs(ws);
                console.log(`Server | client ${client.name} received ws!`);
                break;
            }
            case "go": {
                const client = clientController.getOneByWs(ws);
                const room = roomController.getOneById(client.roomId);
                room.goTo(client, data);
                room.sendAll();
                break;
            }
            case "join": {
                const [clientId, roomId] = data.split("|");
                const client = clientController.getOneByWs(ws);
                const room = roomController.getOneById(roomId);
                room.playersIds.push(client.id);
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
    console.log(
        `### Express server started at ${mode == "dev" ? "http" : "https"}://${host}${
            mode == "dev" ? ":" + expressPort : ""
        }/ ###`,
    );
});
