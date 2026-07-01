import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { UserRole } from "../constants/roles";
import { ApprovalStatus } from "../constants/status";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
    },

    approvalStatus: {
      type: DataTypes.ENUM(...Object.values(ApprovalStatus)),
      allowNull: false,
      defaultValue: ApprovalStatus.PENDING,
    },

    rejectionReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    restaurantName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    restaurantAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;