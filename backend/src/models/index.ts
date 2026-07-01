import User from "./User";
import Restaurant from "./Restaurant";

User.hasOne(Restaurant, {
  foreignKey: "ownerId",
  as: "restaurant",
});

Restaurant.belongsTo(User, {
  foreignKey: "ownerId",
  as: "owner",
});

export {
  User,
  Restaurant,
};