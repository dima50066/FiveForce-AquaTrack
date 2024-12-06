import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
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
      default:
        'https://res.cloudinary.com/divyszzpf/image/upload/v1727786307/e2ft3t0ptrwg6rco1rsm.png',
    },
    gender: {
      type: String,
      required: true,
      enum: ['woman', 'man'],
      default: 'woman',
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
