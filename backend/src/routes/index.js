import { Router } from 'express';
import authRouter from './auth.js';
import watersRouter from './water.js';
import { UsersCollection } from '../db/models/user.js';

const router = Router();

router.use('/water', watersRouter);
router.use('/users', authRouter);

router.get('/users/count', async (req, res) => {
    try {
        const count = await UsersCollection.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
