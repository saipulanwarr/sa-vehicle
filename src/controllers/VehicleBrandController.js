import VechileBrand from "../models/VehicleBrandModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllBrand = async (req, res) => {
  const { search } = req.query;
  let queryObject = {};

  if (search) {
    queryObject.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const vechileBrand = await VechileBrand.find(queryObject)
    .skip(skip)
    .limit(limit);

  const totalBrand = await VechileBrand.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalBrand / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalBrand, numOfPages, currentPage: page, vechileBrand });
};

export const createBrand = async (req, res) => {
  const brand = await VechileBrand.create(req.body);
  res.status(StatusCodes.CREATED).json({ brand });
};

export const getBrand = async (req, res) => {
  const brand = await VechileBrand.findById(req.params.id);
  res.status(StatusCodes.OK).json({ brand });
};

export const updateBrand = async (req, res) => {
  const updatedBrand = await VechileBrand.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "vehicle brand modified", brand: updatedBrand });
};

export const deleteBrand = async (req, res) => {
  const removeBrand = await VechileBrand.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "vehicle brand deleted", brand: removeBrand });
};
