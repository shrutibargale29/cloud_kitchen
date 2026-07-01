import Restaurant from "../models/Restaurant";
import User from "../models/User";
import { ApprovalStatus } from "../constants/status";

export const getPendingRestaurants = async () => {
  return Restaurant.findAll({
    include: [
      {
        model: User,
        as: "owner",
        where: {
          approvalStatus: ApprovalStatus.PENDING,
        },
        attributes: ["id", "fullName", "email", "phone"],
      },
    ],
  });
};

export const approveRestaurant = async (ownerId: string) => {
  await User.update(
    {
      approvalStatus: ApprovalStatus.APPROVED,
    },
    {
      where: { id: ownerId },
    }
  );

  await Restaurant.update(
    {
      isActive: true,
    },
    {
      where: { ownerId },
    }
  );
};

export const rejectRestaurant = async (
  ownerId: string,
  reason: string
) => {
  await User.update(
    {
      approvalStatus: ApprovalStatus.REJECTED,
    },
    {
      where: { id: ownerId },
    }
  );

  await Restaurant.update(
    {
      isActive: false,
      rejectionReason: reason,
    },
    {
      where: { ownerId },
    }
  );
};