import { Router } from "express";

import {
  getPendingRestaurantsController,
  approveRestaurantController,
  rejectRestaurantController,
} from "../controllers/admin.controller";

const router = Router();

router.get(
  "/restaurants/pending",
  getPendingRestaurantsController
);

router.patch(
  "/restaurants/:ownerId/approve",
  approveRestaurantController
);

router.patch(
  "/restaurants/:ownerId/reject",
  rejectRestaurantController
);

export default router;