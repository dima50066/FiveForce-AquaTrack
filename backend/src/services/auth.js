import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
<<<<<<< Updated upstream
import { SMTP } from '../constants/index.js';
=======
import { SMTP, THIRTY_DAYS, FIFTEEN_MINUTES } from '../constants/constants.js';
>>>>>>> Stashed changes
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
<<<<<<< Updated upstream
import { TEMPLATES_DIR } from '../constants/index.js';
=======
import { TEMPLATES_DIR } from "../constants/index.js";
import { getFullNameFromGoogleTokenPayload, validateCode } from '../utils/googleOAuth2.js';
import { randomBytes } from 'crypto';
import { SessionsCollection } from '../db/models/session.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};
>>>>>>> Stashed changes

export const findUserByEmail = (email) => UsersCollection.findOne({ email });
export const updateUserWithToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  const user = await UsersCollection.findByIdAndUpdate(
    userId,
    { token },
    { new: true },
  );
  return user;
};
export const createUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);
  const user = await UsersCollection.create({
    ...userData,
    password: encryptedPassword,
  });
  return updateUserWithToken(user._id);
};

export const findUserById = (userId) => UsersCollection.findById(userId);

export const logoutUser = async (id) => {
  await UsersCollection.findByIdAndUpdate(id, { token: '' });
};

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'resetPassword.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};
<<<<<<< Updated upstream
=======

export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401);

  let user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    const password = await bcrypt.hash(randomBytes(10), 10);
    user = await UsersCollection.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      password,
      role: 'parent',
    });
  }

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });
};
>>>>>>> Stashed changes
