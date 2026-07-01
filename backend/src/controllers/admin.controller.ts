import { Request, Response } from "express";

import {
  getPendingRestaurantService,
  approveRestaurantService,
  rejectRestaurantService,
} from "../services/admin.service";

export const getPendingRestaurantsController = async (
  req: Request,
  res: Response
) => {
  try {
    const restaurants = await getPendingRestaurantService();

    res.status(200).json(restaurants);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const approveRestaurantController = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = req.params.ownerId as string;

    const result = await approveRestaurantService(ownerId);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const rejectRestaurantController = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId  = req.params.ownerId as string;

    const { reason } = req.body;

    const result = await rejectRestaurantService(ownerId, reason);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};