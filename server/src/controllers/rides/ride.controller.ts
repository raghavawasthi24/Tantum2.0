import { Request, Response } from "express";
import RideModel from "../../models/ride.model";
import UserModel from "../../models/user.model";

//TO ADD NEW RIDE

const addRide = async (req: Request, res: Response): Promise<any> => {
  const rideDetails = req.body;
  try {
    const user = await UserModel.findOne({ _id: rideDetails.ownerId });

    if (!user) return res.status(404).send({ message: "User not found" });

    const ride = new RideModel(rideDetails);
    ride.passengers.push(rideDetails.ownerId);
    user.rideInfo.offered.push(ride._id);

    await Promise.all([ride.save(), user.save()]);
    
    return res
      .status(201)
      .json({ message: "Your ride is recorded successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

//TO GET ALL RIDES

const getRide = async (req: Request, res: Response): Promise<any> => {
  const rideDetails = req.body;
  try {
    const ride = await RideModel.find({
      source: rideDetails.source,
      destination: rideDetails.destination,
    }).populate("ownerId", "firstName lastName rideInfo _id avatar");
    if (!ride) {
      return res.status(404).json({ message: "No rides found" });
    }

    const filterRides = ride.filter(
      (ride) => ride.seatsVacant >= rideDetails.seatsVacant
    );

    console.log(filterRides);
    return res
      .status(201)
      .json({ message: "All rides fetched successfully", data: filterRides });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

export { addRide, getRide };
