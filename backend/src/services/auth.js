import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import jwt from 'jsonwebtoken';

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
