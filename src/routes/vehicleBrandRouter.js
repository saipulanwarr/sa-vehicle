import { Router } from "express";
const router = Router();
import {
  getAllBrand,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/VehicleBrandController.js";
import { validateBrandInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllBrand)
  .post([authorizePermissions()], validateBrandInput, createBrand);

router
  .route("/:id")
  .get(getBrand)
  .patch([authorizePermissions()], validateBrandInput, updateBrand)
  .delete([authorizePermissions()], deleteBrand);

export default router;
