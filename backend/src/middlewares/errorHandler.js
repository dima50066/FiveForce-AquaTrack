import createHttpError from 'http-errors';

/* eslint-disable-next-line no-unused-vars */
export const errorHandler = (err, req, res, next) => {
  if (err instanceof createHttpError.HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
  }

  console.error('Unhandled error:', err);

  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};
