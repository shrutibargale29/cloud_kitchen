import User from "../models/User";
import { Transaction } from "sequelize";

export const createUser = async (
  data: any,
  transaction?: Transaction
) => {
  return User.create(data, { transaction });
};
export const findUserByEmail = async (email: string) => {
  return User.findOne({
    where: { email },
  });
};

export const findUserByPhone = async (phone: string) => {
  return User.findOne({
    where: { phone },
  });
};

export const findUserById = async (id: string) => {
  return User.findByPk(id);
};

export const updateUser = async (id: string, data: any) => {
  const user = await User.findByPk(id);

  if (!user) return null;

  await user.update(data);

  return user;
};