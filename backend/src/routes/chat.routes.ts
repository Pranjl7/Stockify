import { Router } from "express";
import { userchat } from "../controllers/chat.controller";

const router = Router();

router.post("/", userchat);

export default router;
