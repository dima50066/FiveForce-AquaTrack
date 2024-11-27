import createHttpError from 'http-errors';
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  createUser,
  findUserByEmail,
  logoutUser,
  updateUserWithToken,
} from '../services/auth.js';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import { updateUserSchema } from '../validation/auth.js';
import { env } from '../utils/env.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

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
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    throw createHttpError(400, error.message);
  }
  let userData = { ...req.body };
  if (req.file) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);
      userData.avatar = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public/avatar', req.file.filename),
      );
      userData.avatar = `${env('APP_DOMAIN')}/public/avatar/${
        req.file.filename
      }`;
    }
  }

  if (!Object.keys(userData).length) {
    throw createHttpError(400, 'No data available to update the user.');
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    userData,
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
