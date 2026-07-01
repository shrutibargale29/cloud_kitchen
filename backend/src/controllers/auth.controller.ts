import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { registerUser } from "../services/auth.service";
import { loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: {
        id: user.get("id"),
        fullName: user.get("fullName"),
        email: user.get("email"),
        role: user.get("role"),
        approvalStatus: user.get("approvalStatus"),
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const result = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token: result.token,
      user: {
        id: result.user.get("id"),
        fullName: result.user.get("fullName"),
        email: result.user.get("email"),
        role: result.user.get("role"),
      },
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};