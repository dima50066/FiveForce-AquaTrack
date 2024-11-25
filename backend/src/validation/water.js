import Joi from 'joi';

const startDate = new Date('01/01/2024');

const unixDay = 86400000;

export const createWaterSchema = () => {
  return Joi.object({
    date: Joi.number()
      .min(+startDate)
      .max(Date.now() + unixDay)
      .required(),
    amount: Joi.number().min(10).max(3000).required(),
    owner: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
  });
};

export const updateWaterSchema = () => {
  return Joi.object({
    date: Joi.number()
      .min(+startDate)
      .max(Date.now() + unixDay),
    amount: Joi.number().min(10).max(3000),
  }).or('date', 'amount');
};
