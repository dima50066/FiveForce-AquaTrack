import express from 'express';
import {
  createWater,
  deleteWater,
  updateWater,
  getDayWater,
  getMonthWater,
  getSummaryAmount,
} from '../controllers/waters.js';
import { checkToken } from '../middlewares/checkToken.js';
import { WaterDate, WaterMonth } from '../middlewares/dateMiddleware.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createWaterSchema, updateWaterSchema } from '../validation/water.js';

const router = express.Router();

router.post('/', checkToken, validateBody(createWaterSchema), createWater);
router.delete('/:id', checkToken, deleteWater);
router.put('/:id', checkToken, updateWater, validateBody(updateWaterSchema));
router.get('/', checkToken, getSummaryAmount);
router.get('/day/:date', WaterDate, checkToken, getDayWater);
router.get('/month/:date', WaterMonth, checkToken, getMonthWater);

export default router;
