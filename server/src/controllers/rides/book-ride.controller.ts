import { Request, Response } from "express";
import RideModel from "../../models/ride.model";
import UserModel from "../../models/user.model";
import { sendEmail } from "../../services/emailService";

const bookRide = async (req: Request, res: Response): Promise<any> => {
  const { rideId, ownerId, userId, seatsBooked } = req.body;

  try {
    const ride = await RideModel.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "No ride found" });
    }

    const owner = await UserModel.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (ride.seatsVacant < seatsBooked) {
      return res.status(400).json({ message: "No seats available" });
    }

    ride.seatsVacant -= seatsBooked;
    ride.passengers.push(userId);
    user.rideInfo.booked.push(ride._id);

    await Promise.all([ride.save(), user.save()]);

    const emailText = `
      You have successfully booked a ride. Here are your details:
      From: ${ride.source}
      To: ${ride.destination}
      Time: ${ride.departure_time} to ${ride.reaching_time}
      Seats booked: ${seatsBooked}
      Price: ${ride.price}

      Details of rider are:
      Rider Name: ${owner.firstName} ${owner.lastName}
      Email: ${owner.email}
      Phone: ${"N/A"}
      Gender: ${owner.gender}
    `;

    await sendEmail(user.email, emailText);

    res.status(201).json({ message: "Ride booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export { bookRide };
