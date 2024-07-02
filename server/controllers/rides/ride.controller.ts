import { Request, Response } from "express";
import RideModel from "../../models/ride.model";

//TO ADD NEW RIDE

const addRide = async (req: Request, res: Response): Promise<any> => {
  const rideDetails = req.body;
  try {
    const ride = new RideModel(rideDetails);
    await ride.save();
    return res.status(201).json({ msg: "Your ride is recorded successfully" });
  } catch (error) {
    res.status(400).json("Something went wrong!");
  }
};

//TO GET ALL RIDES

const getRide = async (req: Request, res: Response): Promise<any> => {
  const rideDetails = req.body;
  try {
    const ride = await RideModel.find({
      source: rideDetails.source,
      destination: rideDetails.destination,
      date: rideDetails.date,
    });
    if (!ride) {
      return res.status(404).json({ msg: "No rides found" });
    }

    console.log(ride);
    const filterRides = ride.filter(
      (ride) => ride.seatsVacant >= rideDetails.seatsVacant
    );

    console.log(filterRides);
    return res
      .status(201)
      .json({ msg: "All rides fetched successfully", data: filterRides });
  } catch (error) {
    res.status(400).json("Something went wrong!");
  }
};

export {addRide, getRide};

