import Garage from "../models/garageModel.js";

export const addVehicle = async (req, res, next) => {
  try {
    const { bikeModel, year, variant, features, isDefault } = req.body;

    if (!bikeModel || !year) {
      return res.status(400).json({
        success: false,
        message: "Bike model and year are required",
      });
    }

    if (isDefault) {
      await Garage.updateMany(
        { user: req.user._id },
        { isDefault: false }
      );
    }

    const vehicle = await Garage.create({
      user: req.user._id,
      bikeModel,
      year,
      variant,
      features,
      isDefault,
    });

    res.status(201).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};
