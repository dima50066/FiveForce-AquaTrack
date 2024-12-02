import { Router } from 'express';
import {
  createWaterController,
  updateWaterController,
  deleteWaterController,
  getDayWaterController,
  getMonthWaterController,
  getSummaryAmountController,
} from '../controllers/waters.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createWaterSchema, updateWaterSchema } from '../validation/water.js';
import { checkToken } from '../middlewares/checkToken.js';

const router = Router();

router.post(
  '/',
  validateBody(createWaterSchema()),
  ctrlWrapper(createWaterController),
);
router.put(
  '/:waterId',
  isValidId,
  validateBody(updateWaterSchema()),
  ctrlWrapper(updateWaterController),
);
router.delete('/:waterId', isValidId, ctrlWrapper(deleteWaterController));

router.get('/today', checkToken, ctrlWrapper(getDayWaterController));

router.get('/month', checkToken, ctrlWrapper(getMonthWaterController));

router.get('/summary', checkToken, ctrlWrapper(getSummaryAmountController));

export default router;
