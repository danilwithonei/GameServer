import WebSocket from "ws";
import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { Client } from "./entities/client";
import { ServerServices } from "./services/server.services";
import { Room } from "./entities/room";

const port = 4000;
const app = express();

app.engine("html", require("ejs").renderFile);
app.use(bodyParser({ extended: false }));

app.get("/", (req, res) => {
    res.render("startPage.html");
});
app.post("/lobbies", (req, res) => {
    console.log(req.body);
    res.render("startPage.html");
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

const server = new WebSocket.Server({ port: Number(5000) }, () => {
    console.log(`### Server started on port! ${5000}`);
});
const services = new ServerServices(server);

server.on("connection", (ws) => {
    const newClient = new Client(ws);
    console.log(`new client ${newClient.uuid} connected`);
    services.clients.push(newClient);

    ws.on("message", (msg) => {
        const jsonMsg = JSON.parse(msg.toString("utf-8"));
        const client = services.getOneByWs(ws);
        switch (jsonMsg["type"]) {
            case "setUsername": {
                client.setName(jsonMsg["username"]);
                break;
            }
            case "createRoom": {
                const room = new Room(jsonMsg["roomName"]);
                room.clients_uuids.push(client.uuid);
                services.rooms.push(room);
                client.setRoom(room.name, room.uuid);
                break;
            }
            case "getRooms": {
                const roomNames = services.getRoomsNames();
                client.sendSelf(JSON.stringify(roomNames));
                break;
            }
            case "go": {
                client.setXY(jsonMsg["x"], jsonMsg["y"]);
                services.sendAllExept(ws);
                break;
            }
            case "setRoom": {
                const roomName = jsonMsg["roomName"];
                const room = services.getRoomByName(roomName);
                client.setRoom(room.name, room.uuid);
                room.clients_uuids.push(client.uuid);
                break;
            }
        }
    });

    ws.on("close", () => {
        const client = services.getOneByWs(ws);
        services.clients = services.clients.filter((c) => c.ws !== ws);
    });
});
