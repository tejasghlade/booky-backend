const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

// todo :: Register new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // check if user is already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // save the user into database
    await newUser.save();

    // generate JWT token
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// todo :: Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body ;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email is not registered " });
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // generate jwt token
    const token = generateToken(user._id);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await User.findById(email);
    if (!user) {
      res.status(404).json({ message: "User not found " });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    // save updated data
    user.save();

    res.staus(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user

exports.deleteUserProfile = async (req, res) => {
  try {
    const user = new User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    // delete the user
    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
