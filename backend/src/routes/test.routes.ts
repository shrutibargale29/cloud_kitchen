import { Router } from "express";
import {
  authenticate,
  AuthRequest,
} from "../middlewares/auth.middleware";

import { authorize } from "../middlewares/role.middleware";

import { UserRole } from "../constants/roles";

const router = Router();

router.get(
  "/admin",
  authenticate,
  authorize(UserRole.PLATFORM_ADMIN),
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      message: "Welcome Platform Admin",
    });
  }
);

export default router;