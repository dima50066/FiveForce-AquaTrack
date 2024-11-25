import { Schema, model, Types } from "mongoose";
import Joi from "joi";

const startDate = new Date("01/01/2024");

const unixDay = 86400000;

const waterSchema = new Schema(
  {
    date: Joi.number()
      .min(+startDate)
      .max(Date.now() + unixDay)
      .required()
      .messages({
        "number.base": "Date must be a number",
        "number.min": `Date must be greater than or equal to ${+startDate}`,
        "number.max": `Date must be less than or equal to ${
          Date.now() + unixDay
        }`,
      }),
    amount: {
      type: Number,
      min: 10,
      max: 3000,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Water = model("Water", waterSchema);
