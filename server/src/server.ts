import express from "express";
import path from "path";
import "dotenv/config";

const port = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, "../views")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/startPage.html"));
});

app.post("/lobbies", (req, res) => {
    console.log(req.body);
    //TODO: get lobbies and send their
    res.sendFile(path.join(__dirname, "../views/lobbiesPage.html"));
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
