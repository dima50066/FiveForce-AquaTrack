import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Contact name length must be at least 3 characters long',
    'string.max':
      'Contact name length must be less than or equal to 20 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name length must be at least 3 characters long',
    'string.max':
      'Name length must be less than or equal to 20 characters long',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
  }),
  avatar: Joi.string().min(3).messages({
    'string.base': 'Avatar url must be a string',
    'string.min': 'Avatar url length must be at least 3 characters long',
  }),
  gender: Joi.string().valid('Woman', 'Man').messages({
    'string.base': 'Gender must be a string',
    'any.only': 'Gender must be one of [Woman, Man]',
  }),
  weight: Joi.number().min(0).max(500).messages({
    'number.base': 'Weight must be a number',
    'number.min': 'Weight must be at least 0 kg',
    'number.max': 'Weight must be less than or equal to 500 kg',
  }),
  activeTime: Joi.number().min(0).messages({
    'number.base': 'Active time must be a number',
    'number.min': 'Active time must be at least 0 h',
  }),
  dailyNorm: Joi.number().min(1500).max(5000).messages({
    'number.base': 'Daily norm must be a number',
    'number.min': 'Daily norm must be at least 1500 ml',
    'number.max': 'Daily norm must be less than or equal to 5000 ml',
  }),
});

// export const requestResetPasswordSchema = Joi.object({
//   email: Joi.string().email().required().messages({
//     'string.base': 'Email must be a string',
//     'any.required': 'Email is required',
//   }),
// });

// export const resetPasswordSchema = Joi.object({
//   password: Joi.string().required().messages({
//     'string.base': 'Password must be a string',
//     'any.required': 'Password is required',
//   }),
//   token: Joi.string().required().messages({
//     'string.base': 'Token must be a string',
//     'any.required': 'Token is required',
//   }),
// });
