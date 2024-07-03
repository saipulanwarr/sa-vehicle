import VechileType from "../models/VehicleTypeModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllType = async (req, res) => {
  const { search } = req.query;
  let queryObject = {};

  if (search) {
    queryObject.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const vechileType = await VechileType.find(queryObject)
    .skip(skip)
    .limit(limit);

  const totalBrand = await VechileType.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalBrand / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalBrand, numOfPages, currentPage: page, vechileType });
};

export const createType = async (req, res) => {
  const type = await VechileType.create(req.body);
  res.status(StatusCodes.CREATED).json({ type });
};

export const getType = async (req, res) => {
  const type = await VechileType.findById(req.params.id);
  res.status(StatusCodes.OK).json({ type });
};

export const updateType = async (req, res) => {
  const updatedType = await VechileType.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "vehicle type modified", type: updatedType });
};

export const deleteType = async (req, res) => {
  const removeType = await VechileType.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "vehicle type deleted", type: removeType });
};
