import createHttpError from 'http-errors';

export const validateBody = (JoiSchema) => async (req, res, next) => {
  try {
    let schema;

    // Перевірка: чи JoiSchema є функцією
    if (typeof JoiSchema === 'function') {
      schema = JoiSchema();
    } else {
      schema = JoiSchema;
    }

    // Валідація тіла запиту
    await schema.validateAsync(req.body, {
      abortEarly: false, // Отримати всі помилки
    });

    next();
  } catch (err) {
    // Форматування помилок
    const errors = err.details
      ? err.details.map((detail) => detail.message).join(', ')
      : err.message;

    next(createHttpError(400, `Validation error: ${errors}`));
  }
};
