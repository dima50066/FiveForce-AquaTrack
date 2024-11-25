import { Water } from "../db/models/water.js";

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
    throw new Error("Error while creating water record: " + error.message);
  }
};

export const deleteWater = async (waterId) => {
  try {
    const deletedWater = await Water.findByIdAndDelete(waterId);

    if (!deletedWater) {
      throw new Error("Water record not found");
    }

    return deletedWater;
  } catch (error) {
    throw new Error("Error while deleting water record: " + error.message);
  }
};

export const updateWater = async (waterId, newData) => {
  try {
    const updatedWater = await Water.findByIdAndUpdate(waterId, newData, {
      new: true,
    });

    if (!updatedWater) {
      throw new Error("Water record not found");
    }

    return updatedWater;
  } catch (error) {
    throw new Error("Error while updating water record: " + error.message);
  }
};
