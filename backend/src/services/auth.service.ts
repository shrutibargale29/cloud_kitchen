import User from "../models/User";
import { hashPassword } from "../utils/password";
import { ApprovalStatus } from "../constants/status";
import { UserRole } from "../constants/roles";
import { comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export const registerUser = async (data: any) => {
  const {
    fullName,
    email,
    phone,
    password,
    role,
    restaurantName,
    restaurantAddress,
  } = data;

  // Check Email
  const existingEmail = await User.findOne({
    where: { email },
  });

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Check Phone
  const existingPhone = await User.findOne({
    where: { phone },
  });

  if (existingPhone) {
    throw new Error("Phone number already exists");
  }

  const hashedPassword = await hashPassword(password);

  const approvalStatus =
    role === UserRole.CUSTOMER
      ? ApprovalStatus.APPROVED
      : ApprovalStatus.PENDING;

  const user = await User.create({
    fullName,
    email,
    phone,
    password: hashedPassword,
    role,
    approvalStatus,
    restaurantName,
    restaurantAddress,
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({
    where: { email },
  });

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