import express from "express";
import path from "path";
import "dotenv/config";
import { AuthController } from "./controllers/auth.controller";

const port = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, "../views")));
app.use(express.urlencoded({ extended: true }));

const controller = new AuthController();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/startPage.html"));
});

app.post("/lobbies", (req, res) => {
    controller.createClient(req, res);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/startPage.html"));
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
