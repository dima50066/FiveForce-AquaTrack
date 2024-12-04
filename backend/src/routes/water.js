import express from 'express';
import {
  createWater,
  deleteWater,
  updateWater,
  getDayWater,
  getMonthWater,
  getSummaryAmount,
} from '../controllers/waters.js';
import { auth } from '../middlewares/authenticate.js';
import { WaterDate, WaterMonth } from '../middlewares/dateMiddleware.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createWaterSchema, updateWaterSchema } from '../validation/water.js';

const router = express.Router();

router.post('/', auth, validateBody(createWaterSchema), createWater);
router.delete('/:id', auth, deleteWater);
router.put('/:id', auth, updateWater, validateBody(updateWaterSchema));
router.get('/', auth, getSummaryAmount);
router.get('/day/:date', WaterDate, auth, getDayWater);
router.get('/month/:date', WaterMonth, auth, getMonthWater);

export default router;
