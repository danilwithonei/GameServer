import express from "express";
import path from "path";
import "dotenv/config";
import { router as enterRouter } from "./routers/enterRouter";
import { router as roomRouter } from "./routers/roomRouter";
import cors from "cors";
// import bodyParser from "body-parser";

export const app = express();

app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded());
app.use("/rooms", enterRouter);
app.use("/room", roomRouter);
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/views/html/index.html"));
});
app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/views/html/gamePage.html"));
});
