# FiveForce-AquaTrack

export const getWaterTodayController = async (req, res, next) => {
try {
const { date } = req.query;
const userId = req.user.\_id;

    if (!date || isNaN(date)) {
      return next(createHttpError(400, 'Invalid or missing date parameter'));
    }

    const startOfDay = new Date(Number(date));
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    const curDaylyNorm = await Water.find({
      owner: userId,
      date: { $gte: startOfDay.getTime(), $lte: endOfDay.getTime() },
    }).select('date amount');

    if (!curDaylyNorm.length) {
      return res
        .status(404)
        .json({ message: 'No water consumption records found for this day.' });
    }

    res.status(200).json(curDaylyNorm);

} catch (error) {
next(error);
}
};

export const getWaterMonthlyController = async (req, res, next) => {
try {
const userId = req.user.\_id;
const { month, year, day } = req.query;

    if (!month || !year || isNaN(month) || isNaN(year)) {
      return next(
        createHttpError(400, 'Invalid or missing month/year parameters'),
      );
    }

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    let startOfDay, endOfDay;
    if (day) {
      if (isNaN(day) || day < 1 || day > endOfMonth.getDate()) {
        return next(createHttpError(400, 'Invalid day parameter'));
      }
      startOfDay = new Date(year, month - 1, day, 0, 0, 0);
      endOfDay = new Date(year, month - 1, day, 23, 59, 59);
    }

    const waterRecords = await Water.find({
      owner: userId,
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
        ...(startOfDay && endOfDay && { $gte: startOfDay, $lte: endOfDay }),
      },
    });

    if (!waterRecords.length) {
      return res.status(404).json({
        message: 'No water consumption records found for this period.',
      });
    }

    const monthlyNorm = 30 * req.user.dailyNorm;
    const dailyPercentages = [];

    if (!day) {
      for (let day = 1; day <= endOfMonth.getDate(); day++) {
        const dayStart = new Date(year, month - 1, day, 0, 0, 0);
        const dayEnd = new Date(year, month - 1, day, 23, 59, 59);

        const dailyRecords = waterRecords.filter((record) => {
          const recordDate = new Date(record.date);
          return recordDate >= dayStart && recordDate <= dayEnd;
        });

        const totalDailyConsumption = dailyRecords.reduce(
          (total, record) => total + record.amount,
          0,
        );

        const dailyPercentage = (totalDailyConsumption / monthlyNorm) * 100;

        dailyPercentages.push({
          date: `${year}-${String(month).padStart(2, '0')}-${String(
            day,
          ).padStart(2, '0')}`,
          percentage: dailyPercentage,
        });
      }
    } else {
      const totalDailyConsumption = waterRecords.reduce(
        (total, record) => total + record.amount,
        0,
      );

      const dailyPercentage = (totalDailyConsumption / monthlyNorm) * 100;

      dailyPercentages.push({
        date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
          2,
          '0',
        )}`,
        percentage: dailyPercentage,
      });
    }

    res.status(200).json(dailyPercentages);

} catch (error) {
next(error);
}
};
