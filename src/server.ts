import WebSocket from "ws";
import { expressPort, socketPort, host, mode } from "./envConfig";
import { app } from "./expressServer";
import { messageCase } from "./interfaces";
import { clientController } from "./controllers/client.controller";
import { roomController } from "./controllers/room.controller";
import { sequelize } from "./database/dataBase";
import { UserService } from "./database/user.service";
import { User } from "./database/models/user";

const userService = new UserService(User);

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

try {
    sequelize
        .authenticate()
        .then(async () => {
            console.log("Соединение с БД было успешно установлено");
            await sequelize.sync();
            console.log("Все модели были успешно синхронизированы.");
            await userService.create({ firstName: "Mikhail" });
            console.log(await userService.getAll());
        })
        .catch((error) => console.error(error));
} catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", e);
}
