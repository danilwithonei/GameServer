import { Router } from "express";
import { check } from "express-validator";
import { lobbyController } from "../controllers/lobby.controller";

export const router = Router();

router.post(
    "/create",
    [check("username", "Username can`t be NULL!").notEmpty()],
    lobbyController.createLobby,
);
router.post("/join");
