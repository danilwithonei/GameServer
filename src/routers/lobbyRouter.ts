import { Router } from "express";
import { check } from "express-validator";
import { lobbyController } from "../controllers/lobby.controller";

export const router = Router();

router.post(
    "/create",
    [check("lobbyName", "lobbyName can`t be NULL!").notEmpty()],
    lobbyController.createLobby,
);
router.get("/all", lobbyController.getAllLobbies);
router.post("/join");
