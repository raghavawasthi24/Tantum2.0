import { Document, Types } from "mongoose";

export interface RideSchema extends Document {
  ownerId: Types.ObjectId;
  vehicleType: string;
  source: string;
  destination: string;
  date: Date;
  departure_time: string;
  reaching_time:string,
  seatsVacant: number;
  passengers: Types.ObjectId[];
  price:number
}
