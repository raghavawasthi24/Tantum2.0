import { Request, Response } from "express";
import RideModel from "../../models/ride";

export const addRide = async (req: Request, res: Response): Promise<any> => {
  const rideDetails = req.body;
  try {
    const ride = new RideModel(rideDetails);
    await ride.save();
    return res.status(201).json({ msg: "Your ride is recorded successfully" });
  } catch (error) {
    res.status(400).json("Something went wrong!");
  }
};
