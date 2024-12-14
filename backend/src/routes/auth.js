import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginSchema,
  registerSchema,
  updateUserSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from '../validation/auth.js';
import {
  countUsersController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
  updateUserController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
  refreshSessionController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/upload.js';
import { auth } from '../middlewares/authenticate.js';

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

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);
authRouter.post('/refresh', auth, ctrlWrapper(refreshSessionController));

authRouter.post(
  '/reset-email',
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.post('/logout', auth, ctrlWrapper(logoutUserController));
authRouter.get('/current', auth, ctrlWrapper(refreshUserController));
authRouter.patch(
  '/current',
  upload.single('avatar'),
  auth,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);
authRouter.get('/count', ctrlWrapper(countUsersController));

export default authRouter;
