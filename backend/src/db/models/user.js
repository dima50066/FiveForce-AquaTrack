import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    token: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Woman', 'Man'],
      default: 'Woman',
    },
    weight: {
      type: Number,
      default: 0,
    },
    activeTime: {
      type: Number,
      default: 0,
    },
    dailyNorm: {
      type: Number,
      default: 1500,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const UsersCollection = model('user', userSchema);
