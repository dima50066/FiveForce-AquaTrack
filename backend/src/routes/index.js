import { Router } from "express";
import watersRouter from "./waters.js";

const router = Router();
router.use("/waters", watersRouter);

export default router;
