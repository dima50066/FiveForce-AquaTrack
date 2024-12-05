import createHttpError from 'http-errors';
import { findSessionByToken, findUserById } from '../services/auth.js';

export const auth = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }
  const [bearer, accessToken] = authHeader.split(' ', 2);

  if (bearer !== 'Bearer' || !accessToken) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }
  const session = await findSessionByToken(accessToken);
  if (!session) {
    next(createHttpError(401, 'Session not found!'));
    return;
  }
  const isExpiredToken = new Date() > session.accessTokenValidUntil;
  if (isExpiredToken) {
    next(createHttpError(401, 'Token is expired!'));
    return;
  }
  const user = await findUserById(session.userId);
  if (!user) {
    next(createHttpError(401, 'User not found'));
    return;
  }
  req.user = user;
  next();
};
