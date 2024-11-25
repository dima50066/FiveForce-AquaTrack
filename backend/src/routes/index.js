import { Router } from 'express';
import authRouter from './auth.js';
import watersRouter from './waters.js';

const router = Router();

router.use('/water', watersRouter);
router.use('/users', authRouter);

export default router;
