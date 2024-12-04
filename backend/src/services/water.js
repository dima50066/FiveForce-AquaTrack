import { Water } from '../db/models/water.js';
import createHttpError from 'http-errors';
import { startOfMonth, endOfMonth, getDaysInMonth } from 'date-fns';

export const createWaterService = async ({ date, amount }, owner) => {
  const water = await Water.create({ date, amount, owner });
  return water;
};

export const deleteWaterService = async (id, owner) => {
  const result = await Water.findOneAndDelete({ _id: id, owner });
  if (!result) throw createHttpError(404, 'Not found');
  return result;
};

export const updateWaterService = async (id, { date, amount }, owner) => {
  const result = await Water.findByIdAndUpdate(
    id,
    { date, amount, owner },
    { new: true },
  );
  if (!result) throw createHttpError(404, 'Not found');
  return result;
};

export const getDayWaterService = async (dateParam, user) => {
  if (isNaN(dateParam)) {
    throw createHttpError(400, 'Invalid date format: date must be a number.');
  }

  const owner = user._id;
  const userTimezoneOffset = user.timezoneOffset || 0;

  const startOfDay = new Date(Number(dateParam));
  startOfDay.setHours(0 - userTimezoneOffset / 60, 0, 0, 0);

  const endOfDay = new Date(Number(dateParam));
  endOfDay.setHours(23 - userTimezoneOffset / 60, 59, 59, 999);

  const utcStart = startOfDay.getTime();
  const utcEnd = endOfDay.getTime();

  const foundWaterDayData = await Water.find({
    owner,
    date: { $gte: utcStart, $lt: utcEnd },
  });

  if (!foundWaterDayData || foundWaterDayData.length === 0) {
    throw createHttpError(404, 'No data found for the specified day.');
  }

  const totalDayWater = foundWaterDayData.reduce(
    (acc, item) => acc + item.amount,
    0,
  );

  return {
    date: new Date(Number(dateParam)),
    totalDayWater,
    WaterData: foundWaterDayData,
    owner,
  };
};

export const getMonthWaterService = async (dateParam, user) => {
  if (isNaN(dateParam)) {
    throw createHttpError(400, 'Invalid date format: date must be a number.');
  }

  const owner = user._id;

  const startOfMonthDate = startOfMonth(new Date(Number(dateParam)));
  const endOfMonthDate = endOfMonth(new Date(Number(dateParam)));

  const utcStartTime = startOfMonthDate.getTime();
  const utcEndTime = endOfMonthDate.getTime();

  const foundWaterMonthData = await Water.find({
    owner,
    date: { $gte: utcStartTime, $lt: utcEndTime },
  });

  const aggregatedMonthlyData = foundWaterMonthData.reduce((acc, item) => {
    const date = new Date(item.date);
    const dayOfMonth = date.getUTCDate();
    if (!acc[dayOfMonth]) {
      acc[dayOfMonth] = {
        dateParam: new Date(
          Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), dayOfMonth),
        ).toISOString(),
        totalDayWater: 0,
      };
    }
    acc[dayOfMonth].totalDayWater += item.amount;
    return acc;
  }, {});

  const daysInMonth = getDaysInMonth(new Date(Number(dateParam)));
  const result = [];
  for (let i = 1; i <= daysInMonth; i++) {
    if (aggregatedMonthlyData[i]) {
      result.push(aggregatedMonthlyData[i]);
    } else {
      const date = new Date(
        Date.UTC(
          new Date(Number(dateParam)).getUTCFullYear(),
          new Date(Number(dateParam)).getUTCMonth(),
          i,
        ),
      );
      result.push({ dateParam: date.toISOString(), totalDayWater: 0 });
    }
  }
  return result;
};

export const getSummaryAmountService = async (owner) => {
  const startOfDay = new Date().setHours(0, 0, 0, 0);
  const endOfDay = new Date().setHours(23, 59, 59, 999);

  const todayDrinkWater = await Water.find({
    owner,
    date: { $gte: startOfDay, $lt: endOfDay },
  });

  if (!todayDrinkWater || todayDrinkWater.length === 0) {
    throw createHttpError(404, 'No water data found for today');
  }

  const totalAmount = todayDrinkWater.reduce(
    (sum, record) => sum + record.amount,
    0,
  );
  return { totalAmount };
};
