import { Router } from "express";
const router = Router();
import {
  getAllType,
  getType,
  createType,
  updateType,
  deleteType,
} from "../controllers/VehicleTypeController.js";
import { validateTypeInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllType)
  .post([authorizePermissions()], validateTypeInput, createType);

router
  .route("/:id")
  .get(getType)
  .patch([authorizePermissions()], validateTypeInput, updateType)
  .delete([authorizePermissions()], deleteType);

export default router;
