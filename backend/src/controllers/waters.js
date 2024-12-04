import {
  createWaterService,
  deleteWaterService,
  updateWaterService,
  getDayWaterService,
  getMonthWaterService,
  getSummaryAmountService,
} from '../services/water.js';

export const createWater = async (req, res, next) => {
  try {
    const result = await createWaterService(req.body, req.user._id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteWater = async (req, res, next) => {
  try {
    const result = await deleteWaterService(req.params.id, req.user._id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateWater = async (req, res, next) => {
  try {
    const result = await updateWaterService(
      req.params.id,
      req.body,
      req.user._id,
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getDayWater = async (req, res, next) => {
  try {
    const result = await getDayWaterService(req.params.date, req.user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMonthWater = async (req, res, next) => {
  try {
    const result = await getMonthWaterService(req.params.date, req.user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSummaryAmount = async (req, res, next) => {
  try {
    const result = await getSummaryAmountService(req.user._id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
