import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (e) {
    next(createHttpError(400, 'Bad request', { errors: e.details }));
  }
};
