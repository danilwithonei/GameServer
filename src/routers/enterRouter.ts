import { Router } from "express";
import { check } from "express-validator";
import { authController } from "../controllers/auth.controller";

export const router = Router();

router.post("/", authController.createClient);
