import createHttpError from 'http-errors';
import {
  createUser,
  findUserByEmail,
  logoutUser,
  updateUserWithToken,
} from '../services/auth.js';
import bcrypt from 'bcrypt';

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
