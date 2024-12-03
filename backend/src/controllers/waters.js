import {
  createWater,
  deleteWater,
  updateWater,
  getDayWater,
  getMonthWater,
  getSummaryAmount,
} from '../services/water.js';
import createHttpError from 'http-errors';
import { Water } from '../db/models/water.js';

export const createWaterController = async (req, res) => {
  try {
    const { date, amount } = req.body;
    const { _id: owner } = req.user;

    if (!date || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newWater = await createWater(date, amount, owner);
    res.status(201).json(newWater);
  } catch (error) {
    res.status(500).json({
      message: 'Error while creating water record',
      error: error.message,
    });
  }
};

export const updateWaterController = async (req, res) => {
  try {
    const { waterId } = req.params;
    const { date, amount } = req.body;
    const { _id: owner } = req.user;

    if (!waterId) {
      return res.status(400).json({ message: 'Missing waterId parameter' });
    }

    const waterRecord = await Water.findById(waterId);
    if (!waterRecord || waterRecord.owner.toString() !== owner.toString()) {
      return res
        .status(403)
        .json({ message: 'Access denied or record not found' });
    }

    const updatedWater = await updateWater(waterId, { date, amount });
    res.status(200).json(updatedWater);
  } catch (error) {
    res.status(500).json({
      message: 'Error while updating water record',
      error: error.message,
    });
  }
};

export const deleteWaterController = async (req, res) => {
  try {
    const { waterId } = req.params;
    const { _id: owner } = req.user;

    if (!waterId) {
      return res.status(400).json({ message: 'Missing waterId parameter' });
    }

    const waterRecord = await Water.findById(waterId);
    if (!waterRecord || waterRecord.owner.toString() !== owner.toString()) {
      return res
        .status(403)
        .json({ message: 'Access denied or record not found' });
    }

    const deletedWater = await deleteWater(waterId);
    res.status(200).json(deletedWater);
  } catch (error) {
    res.status(500).json({
      message: 'Error while deleting water record',
      error: error.message,
    });
  }
};

export const getDayWaterController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;
    const { timezone = 'UTC' } = req.query;

    if (!date) {
      throw createHttpError(400, 'Date parameter is required');
    }

    const { curDaylyNorm, totalAmount } = await getDayWater(
      userId,
      date,
      timezone,
    );

    // if (!curDaylyNorm.length) {
    //   return res
    //     .status(404)
    //     .json({ message: 'No water consumption records found for this day.' });
    // }

    res
      .status(200)
      .json({ date: new Date(Number(date)), totalAmount, curDaylyNorm });
  } catch (error) {
    next(error);
  }
};

export const getMonthWaterController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;
    const { timezone = 'UTC' } = req.query;

    if (!date) {
      throw createHttpError(400, 'Date parameter is required');
    }

    const monthData = await getMonthWater(userId, date, timezone);

    res.status(200).json(monthData);
  } catch (error) {
    next(error);
  }
};

export const getSummaryAmountController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { date, dailyNorm } = req.query;
    const { timezone = 'UTC' } = req.query;

    if (!date || !dailyNorm) {
      throw createHttpError(400, 'Date and dailyNorm parameters are required');
    }

    const summary = await getSummaryAmount(userId, date, dailyNorm, timezone);

    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
};
