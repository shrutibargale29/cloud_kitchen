import { Transaction } from "sequelize";
import Restaurant from "../models/Restaurant";

export const createRestaurant = async (
  data: any,
  transaction?: Transaction
) => {
  return Restaurant.create(data, { transaction });
};

export const findRestaurantByOwnerId = async (ownerId: string) => {
  return Restaurant.findOne({
    where: { ownerId },
  });
};

export const getPendingRestaurants = async () => {
  return Restaurant.findAll({
    where: {
      isActive: false,
    },
  });
};

export const updateRestaurant = async (
  id: string,
  data: any
) => {
  const restaurant = await Restaurant.findByPk(id);

  if (!restaurant) return null;

  await restaurant.update(data);

  return restaurant;
};