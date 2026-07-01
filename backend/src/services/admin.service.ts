import {
  getPendingRestaurants,
  approveRestaurant,
  rejectRestaurant,
} from "../repositories/admin.repository";

export const getPendingRestaurantService = async () => {
  return await getPendingRestaurants();
};

export const approveRestaurantService = async (ownerId: string) => {
  await approveRestaurant(ownerId);

  return {
    message: "Restaurant approved successfully",
  };
};

export const rejectRestaurantService = async (
  ownerId: string,
  reason: string
) => {
  if (!reason) {
    throw new Error("Rejection reason is required");
  }

  await rejectRestaurant(ownerId, reason);

  return {
    message: "Restaurant rejected successfully",
  };
};