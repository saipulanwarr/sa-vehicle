import mongoose from "mongoose";

const VehicleBrandSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("VehicleBrand", VehicleBrandSchema);
