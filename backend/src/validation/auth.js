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
