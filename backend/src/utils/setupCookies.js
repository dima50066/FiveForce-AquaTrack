import { THIRTY_DAYS } from '../constants/index.js';

export const setupCookies = (res, session) => {
  const { _id, refreshToken } = session;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};
