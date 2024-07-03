import mongoose from "mongoose";

const VehicleTypeSchema = new mongoose.Schema(
  {
    name: String,
    brandId: {
      type: mongoose.Types.ObjectId,
      ref: "VehicleBrand",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("VehicleType", VehicleTypeSchema);
