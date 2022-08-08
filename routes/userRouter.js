const express = require("express");
const { register, login, forgot, userList, deleteUser, update,getUserStatsByMonth, getUserStatsOverall } = require("./../controller/userController")
// Define routers
const userRoute = express.Router();

// To implement logics,there is two way
// 1. simply start writting logic here
// 2. Use controller class

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.put("/forgot", forgot);
userRoute.put("/update/:id", update);
userRoute.get("/userList", userList);
userRoute.get("/getUserStatsByMonth", getUserStatsByMonth);
userRoute.get("/getUserStatsOverall", getUserStatsOverall);
userRoute.delete("/deleteUser/:id", deleteUser);


module.exports = userRoute;