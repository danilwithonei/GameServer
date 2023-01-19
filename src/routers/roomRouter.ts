import { Router } from "express";
import { check } from "express-validator";
import { roomController } from "../controllers/expressRoom.controller";

export const router = Router();

router.post(
    "/create",
    [check("roomName", "roomName can`t be NULL!").notEmpty()],
    roomController.createRoom,
);
router.get("/all", roomController.getAllRooms);
router.post("/join");
