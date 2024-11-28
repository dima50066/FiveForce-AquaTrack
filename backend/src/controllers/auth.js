import createHttpError from 'http-errors';
import {
  createUser,
  findUserByEmail,
  logoutUser,
  updateUserWithToken,
  requestResetToken,
  resetPassword,
  loginOrSignupWithGoogle
} from '../services/auth.js';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { THIRTY_DAYS, FIFTEEN_MINUTES } from '../constants/constants.js';

<<<<<<< Updated upstream
=======
const setupSession = async (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

>>>>>>> Stashed changes
export const registerUserController = async (req, res) => {
  const { name, email } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    throw createHttpError(409, 'User with this email is already exist!');
  }
  const newUser = await createUser(req.body);
  res.status(201).json({
    token: newUser.token,
    user: {
      name,
      email,
    },
  });
};
export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    throw createHttpError(404, 'Credentials are wrong');
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw createHttpError(404, 'Credentials are wrong');
  }
  const updatedUser = await updateUserWithToken(user._id);

  res.status(201).json({
    token: updatedUser.token,
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
    },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser(req.user._id);

  res.sendStatus(204);
};

export const refreshUserController = (req, res) => {
  const { email, name, avatar, gender, weight, activeTime, dailyNorm } =
    req.user;
  res.status(200).json({
    name,
    email,
    avatar,
    gender,
    weight,
    activeTime,
    dailyNorm,
  });
};

export const updateUserController = async (req, res) => {
  const userId = req.user._id;
  const updateData = req.body;

  if (!Object.keys(updateData).length) {
    throw createHttpError(400, 'No data available to update the user.');
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
    },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      gender: updatedUser.gender,
      weight: updatedUser.weight,
      activeTime: updatedUser.activeTime,
      dailyNorm: updatedUser.dailyNorm,
    },
  });
};

export const countUsersController = async (req, res) => {
  const countUsers = await UsersCollection.countDocuments();
  res.status(200).json({ countUsers });
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
<<<<<<< Updated upstream
=======

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
>>>>>>> Stashed changes
