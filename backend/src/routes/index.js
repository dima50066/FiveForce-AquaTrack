import { Router } from "express";
import {
  createWaterController,
  updateWaterController,
  deleteWaterController,
} from "../controllers/waters.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.post("/api/water", ctrlWrapper(createWaterController));
router.put("/api/water/:waterId", ctrlWrapper(updateWaterController));
router.delete("/api/water/:waterId", ctrlWrapper(deleteWaterController));

export default router;
