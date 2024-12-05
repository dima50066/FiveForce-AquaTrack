import { THIRTY_DAYS } from '../constants/index.js';

export const setupCookies = (res, session) => {
  const { _id, refreshToken } = session;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, // Cookies не доступні через JavaScript
    secure: process.env.NODE_ENV === 'production', // Встановлюється лише через HTTPS у продакшені
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Для крос-доменних запитів
    expires: new Date(Date.now() + THIRTY_DAYS), // Час дії cookies
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};
