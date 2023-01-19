import WebSocket from "ws";
import "dotenv/config";
import { app } from "./expressServer";
import { messageCase } from "./interfaces";
import { clientController } from "./controllers/client.controller";
import { roomController } from "./controllers/room.controller";

const expressPort = process.env.EXPRESS_PORT;
const socketPort = process.env.SOCKET_PORT;

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
                clientController.sendAll({ type: messageCase.roomsNames, data: roomsNames });
                break;
            }
            case "setClient": {
                clientController.setWs(ws, data);
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

    ws.on("close", (msg) => {});
});

app.listen(expressPort, () => {
    console.log(`### Express server started at http://localhost:${expressPort} ###`);
});
