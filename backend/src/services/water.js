import { Water } from '../db/models/water.js';
import {
  startOfDay,
  endOfDay,
  fromUnixTime,
  startOfMonth,
  endOfMonth,
  format,
} from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

export const createWater = async (date, amount, owner) => {
  try {
    const newWaterRecord = new Water({
      date,
      amount,
      owner,
    });

    await newWaterRecord.save();
    return newWaterRecord;
  } catch (error) {
    throw new Error('Error while creating water record: ' + error.message);
  }
};

export const deleteWater = async (waterId) => {
  try {
    const deletedWater = await Water.findByIdAndDelete(waterId);

    if (!deletedWater) {
      throw new Error('Water record not found');
    }

    return deletedWater;
  } catch (error) {
    throw new Error('Error while deleting water record: ' + error.message);
  }
};

export const updateWater = async (waterId, newData) => {
  try {
    const updatedWater = await Water.findByIdAndUpdate(waterId, newData, {
      new: true,
    });

    if (!updatedWater) {
      throw new Error('Water record not found');
    }

    return updatedWater;
  } catch (error) {
    throw new Error('Error while updating water record: ' + error.message);
  }
};

export const getDayWater = async (userId, date, timezone = 'UTC') => {
  const startOfDayUTC = fromUnixTime(Number(date) / 1000);
  console.log('Start of day (UTC):', startOfDayUTC);

  const startOfDayInUTC = startOfDay(startOfDayUTC);
  const endOfDayInUTC = endOfDay(startOfDayUTC);

  console.log('Start of day (UTC):', startOfDayInUTC);
  console.log('End of day (UTC):', endOfDayInUTC);

  const startOfDayTimestamp = startOfDayInUTC.getTime();
  const endOfDayTimestamp = endOfDayInUTC.getTime();

  const curDaylyNorm = await Water.find({
    owner: userId,
    date: {
      $gte: startOfDayTimestamp,
      $lte: endOfDayTimestamp,
    },
  }).select('date amount');

  if (!curDaylyNorm.length) {
    return { curDaylyNorm: [], totalAmount: 0 };
  }

  const totalAmount = curDaylyNorm.reduce(
    (sum, record) => sum + record.amount,
    0,
  );

  return { curDaylyNorm, totalAmount };
};

export const getMonthWater = async (userId, date, timezone = 'UTC') => {
  const startOfMonthUTC = fromUnixTime(Number(date) / 1000);

  const startOfMonthInUTC = startOfMonth(startOfMonthUTC);
  const endOfMonthInUTC = endOfMonth(startOfMonthUTC);

  console.log('Start of month (UTC):', startOfMonthInUTC);
  console.log('End of month (UTC):', endOfMonthInUTC);

  const startOfMonthTimestamp = startOfMonthInUTC.getTime();
  const endOfMonthTimestamp = endOfMonthInUTC.getTime();

  const records = await Water.find({
    owner: userId,
    date: {
      $gte: startOfMonthTimestamp,
      $lte: endOfMonthTimestamp,
    },
  }).select('date amount');

  const groupedByDay = records.reduce((acc, record) => {
    const day = format(new Date(record.date), 'yyyy-MM-dd');
    if (!acc[day]) acc[day] = 0;
    acc[day] += record.amount;
    return acc;
  }, {});

  const daysInMonth = [];
  for (
    let day = startOfMonthInUTC;
    day <= endOfMonthInUTC;
    day = new Date(day.setDate(day.getDate() + 1))
  ) {
    const dayStr = format(day, 'yyyy-MM-dd');
    daysInMonth.push({
      date: dayStr,
      totalAmount: groupedByDay[dayStr] || 0,
    });
  }

  return daysInMonth;
};

export const getSummaryAmount = async (
  userId,
  date,
  dailyNorm,
  timezone = 'UTC',
) => {
  const startOfDayUTC = fromUnixTime(Number(date) / 1000);

  const startOfDayInUTC = startOfDay(startOfDayUTC);
  const endOfDayInUTC = endOfDay(startOfDayUTC);

  const startOfDayTimestamp = startOfDayInUTC.getTime();
  const endOfDayTimestamp = endOfDayInUTC.getTime();

  const records = await Water.find({
    owner: userId,
    date: {
      $gte: startOfDayTimestamp,
      $lte: endOfDayTimestamp,
    },
  }).select('date amount');

  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);

  if (!dailyNorm) {
    throw new Error('Daily norm is required');
  }

  const dailyPercentage = (totalAmount / dailyNorm) * 100;

  const currentDate = new Date(Number(date));
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1,
  ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

  return {
    date: formattedDate,
    totalAmount,
    dailyPercentage,
  };
};
