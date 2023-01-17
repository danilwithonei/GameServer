import express from "express";
import path from "path";
import "dotenv/config";
import { router as enterRouter } from "./routers/enterRouter";
import { router as lobbyRouter } from "./routers/lobbyRouter";
import cors from "cors";
import bodyParser from "body-parser";

export const app = express();

app.use(express.static(path.join(__dirname, "../views")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/clients", enterRouter);
app.use("/lobby", lobbyRouter);
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/html/startPage.html"));
});
