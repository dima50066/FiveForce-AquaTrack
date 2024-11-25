import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginSchema,
  registerSchema,
  updateUserSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
  updateUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { checkToken } from '../middlewares/checkToken.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);
authRouter.post('/logout', checkToken, ctrlWrapper(logoutUserController));
authRouter.get('/current', checkToken, ctrlWrapper(refreshUserController));
authRouter.patch(
  '/current',
  checkToken,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

export default authRouter;
