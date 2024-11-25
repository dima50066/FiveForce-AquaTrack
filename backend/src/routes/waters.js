import { Router } from "express";
import {
  createWaterController,
  updateWaterController,
  deleteWaterController,
} from "../controllers/waters.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { createWaterSchema, updateWaterSchema } from "../validation/water.js";

const router = Router();

router.post(
  "/",
  validateBody(createWaterSchema()),
  ctrlWrapper(createWaterController)
);
router.put(
  "/:waterId",
  isValidId,
  validateBody(updateWaterSchema()),
  ctrlWrapper(updateWaterController)
);
router.delete("/:waterId", isValidId, ctrlWrapper(deleteWaterController));

export default router;
