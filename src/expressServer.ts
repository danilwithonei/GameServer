import express from "express";
import path from "path";
import "dotenv/config";
import { router as enterRouter } from "./routers/enterRouter";

export const app = express();

app.use(express.static(path.join(__dirname, "../views")));
app.use(express.urlencoded({ extended: true }));
app.use("/lobbies", enterRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/startPage.html"));
});
