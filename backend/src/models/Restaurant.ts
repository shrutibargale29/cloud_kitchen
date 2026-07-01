import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { SubscriptionPlan } from "../constants/subscriptionPlan";
import { SubscriptionStatus } from "../constants/subscriptionStatus";

class Restaurant extends Model {}

Restaurant.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    restaurantName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gstNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fssaiLicenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    licenseDocument: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subscriptionPlan: {
      type: DataTypes.ENUM(...Object.values(SubscriptionPlan)),
      defaultValue: SubscriptionPlan.FREE,
    },

    subscriptionStatus: {
      type: DataTypes.ENUM(...Object.values(SubscriptionStatus)),
      defaultValue: SubscriptionStatus.TRIAL,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    rejectionReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "restaurants",
    timestamps: true,
  }
);

export default Restaurant;