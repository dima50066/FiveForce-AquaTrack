import createHttpError from 'http-errors';

export const WaterDate = async (req, res, next) => {
  try {
    const { date } = req.params;

    if (isNaN(date)) {
      throw createHttpError(400, 'Invalid date format: date must be a number.');
    }

    const numericDate = Number(date);

    const startDate = new Date('2023-01-01').getTime();
    const unixDay = 86400000;

    const currentDate = Date.now();

    if (numericDate < startDate) {
      throw createHttpError(400, 'Date must be no earlier than 2023-01-01.');
    }

    if (numericDate > currentDate + unixDay) {
      throw createHttpError(400, 'Date cannot be in the future.');
    }

    req.params.date = numericDate;
    next();
  } catch (error) {
    next(error);
  }
};

export const WaterMonth = async (req, res, next) => {
  try {
    const { date } = req.params;

    if (isNaN(date)) {
      throw createHttpError(400, 'Invalid date format: date must be a number.');
    }

    const numericDate = Number(date);

    const startDate = new Date('2023-01-01').getTime();

    if (numericDate < startDate) {
      throw createHttpError(400, 'Date must be no earlier than 2023-01-01.');
    }

    req.params.date = numericDate;
    next();
  } catch (error) {
    next(error);
  }
};
