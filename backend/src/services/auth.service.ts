//import User from "../models/User";
import sequelize from "../config/database";

import {
  createUser,
  findUserByEmail,
  findUserByPhone,
} from "../repositories/auth.repository";

import { createRestaurant } from "../repositories/restaurant.repository";
import { hashPassword } from "../utils/password";
import { ApprovalStatus } from "../constants/status";
import { UserRole } from "../constants/roles";
import { comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export const registerUser = async (data: any) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      fullName,
      email,
      phone,
      password,
      role,
      restaurantName,
      address,
      city,
      state,
      pincode,
      gstNumber,
      fssaiLicenseNumber,
      licenseDocument,
    } = data;

    // Check email
    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    // Check phone
    const existingPhone = await findUserByPhone(phone);

    if (existingPhone) {
      throw new Error("Phone number already exists");
    }

    const hashedPassword = await hashPassword(password);

    const approvalStatus =
      role === UserRole.CUSTOMER
        ? ApprovalStatus.APPROVED
        : ApprovalStatus.PENDING;

    const user = await createUser(
      {
        fullName,
        email,
        phone,
        password: hashedPassword,
        role,
        approvalStatus,
      },
      transaction
    );

    if (role === UserRole.RESTAURANT_OWNER) {
      await createRestaurant(
        {
          ownerId: user.get("id"),
          restaurantName,
          address,
          city,
          state,
          pincode,
          gstNumber,
          fssaiLicenseNumber,
          licenseDocument,
        },
        transaction
      );
    }

    await transaction.commit();

    return user;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(
    password,
    user.get("password") as string
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const role = user.get("role");
  const approvalStatus = user.get("approvalStatus");

  if (
    role !== UserRole.CUSTOMER &&
    role !== UserRole.PLATFORM_ADMIN &&
    approvalStatus !== ApprovalStatus.APPROVED
  ) {
    throw new Error("Your account is pending approval.");
  }

  const token = generateToken({
    id: user.get("id"),
    role,
    email: user.get("email"),
  });

  return {
    token,
    user,
  };
};