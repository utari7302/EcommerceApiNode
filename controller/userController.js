const userModel = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { success, error, validation } = require("./../response/responseApi");
const dotenv = require("dotenv");

dotenv.config();

// Asynchronous means that things can happen independently of the main program flow
// Db related work is always asynchronous because it takes little bit time

// Register Api
const register = async (req, res) => {

    // Steps to perform in register api
    // 0.Validations
    // 1.Existing user
    // 2.Password Hashed
    // 3.User creation
    // 4.Token generate

    const { username, email, password, isAdmin } = req.body;
    try {

        // 0.Validations, perform later 

        // 1.Existing user
        const existingUserEmail = await userModel.findOne({ email: email });
        const existingUserName = await userModel.findOne({ username: username });
        if (existingUserEmail) {
            return res.status(400).json(error("User email already exist", 400));
        } else if (existingUserName) {
            return res.status(400).json(error("User name already exist", 400));
        }

        // 2.Password Hashed
        //10 is argument as salt round its mean this function run 10  times
        const passwordHashed = await bcrypt.hash(password, 10);

        // 3.User creation
        const newUser = await userModel.create({
            username: username,
            email: email,
            password: passwordHashed,
            isAdmin: isAdmin
        });


        // 4.Token generate
        //Basically token have two parts 
        // 1.payload: used for identify user
        // 2.secret key: used for encrypt token 
        // ye token hmmm khud bnte hain information store krne ke liye jese hmmmmm yahan prr email, id save krwaaa rhe

        const token = jwt.sign({
            email: newUser.email,
            id: newUser._id
        }, process.env.SECRET_KEY, { expiresIn: "1d" });

        newUser["token"] = token;

        // 201 successfully record create
        res.status(201).json(success("User registered successfully!", newUser, 201));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

// Login Api
const login = async (req, res) => {

    // Steps to perform in register api
    // 0.Validations
    // 1.Existing user
    // 2.Password Compare

    const { email, password } = req.body;
    try {

        // 0.Validations, perform later

        // 1.Existing user
        const existingUserData = await userModel.findOne({ email: email });
        if (!existingUserData) {
            return res.status(400).json(error("User doesn't exist", 400));
        }

        // 2.Password Compare
        const matchPassword = await bcrypt.compare(password, existingUserData.password);
        if (!matchPassword) {
            return res.status(400).json(error("Password isn't correct", 400));
        }

        // 3.Token generate
        const token = jwt.sign({
            email: existingUserData.email,
            id: existingUserData._id
        }, process.env.SECRET_KEY, { expiresIn: "1d" });

        existingUserData["token"] = token;
        // 201 successfully record create
        res.status(201).json(success("User sign in successfully", existingUserData, 201));

    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

// Forgot Password Api
const forgot = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email });

    if (!existingUser) {
        return res.status(404).json(error("User doesn't exist", 400));
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10);

        const passwordToBeUpdated = {
            password: hashPassword
        }

        var id = existingUser._id;
        // new used to return updated object
        await userModel.findByIdAndUpdate(id['_id'] + '', passwordToBeUpdated, { new: true });

        res.status(201).json(success("Password updated successfully", existingUser, 201));

    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}


// Update user
const update = async (req, res) => {
    //hamre pass params me different parameters atty hain tooo hmmm name se get kr lete hain
    const id = req.params.id;
    const { username, email, password, isAdmin } = req.body;

    // We've to use hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userUpdate = {
        username: username,
        email: email,
        password: hashedPassword,
        isAdmin: isAdmin
    };

    try {
        // new used to return updated object
        const updatedUserData = await userModel.findByIdAndUpdate(id, userUpdate, { new: true });

        const token = jwt.sign({
            email: updatedUserData.email,
            id: updatedUserData._id
        }, process.env.SECRET_KEY, { expiresIn: "1d" });

        updatedUserData["token"] = token;

        res.status(200).json(success("User updated successfully", updatedUserData, 200));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

// Delete user
const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userModel.findByIdAndRemove(id);
        if (!user) {
            return res.status(404).json(error("No user found", 400));
        }
        res.status(202).json(success("User deleted successfully", user, 202));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}
// Get user stats

const getUserStatsByMonth = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 3));

    try {
        const data = await userModel.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" }, }, },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }

        ]);
        res.status(200).json(success("Stats fetched successfully", data, 200));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

const getUserStatsOverall = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 3));

    try {
        const data = await userModel.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { year: { $year: "$createdAt" }, }, },
            {
                $group: {
                    _id: "$year",
                    total: { $sum: 1 }
                }
            }

        ]);
        res.status(200).json(success("Stats fetched successfully", data, 200));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}


// List of users
const userList = async (req, res) => {
    const query = req.query.new;

    try {
        const userList = query ? await userModel.find().sort({ _id: -1 }).limit(5) : await userModel.find();
        if (!userList) {
            return res.status(404).json(error("No user found", 400));
        }
        res.status(200).json(success("List Fetched successfully", userList, 200));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }

}



module.exports = { register, login, forgot, userList, deleteUser, update, getUserStatsByMonth, getUserStatsOverall }