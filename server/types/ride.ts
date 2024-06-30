import { Document, Types } from "mongoose";

export interface RideSchema extends Document {
  ownerId: Types.ObjectId;
  vehicleType: string;
  source: string;
  destination: string;
  date: Date;
  time: string;
  seatsVacant: number;
  price:number
}
