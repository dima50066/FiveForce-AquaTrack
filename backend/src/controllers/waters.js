import { createWater, deleteWater, updateWater } from '../services/water.js';

export const createWaterController = async (req, res) => {
  try {
    const { date, amount, owner } = req.body;

    if (!date || !amount || !owner) {
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

    const deletedWater = await deleteWater(waterId);
    res.status(200).json(deletedWater);
  } catch (error) {
    res.status(500).json({
      message: 'Error while deleting water record',
      error: error.message,
    });
  }
};
