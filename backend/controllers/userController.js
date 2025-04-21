const util = require("util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSign = util.promisify(jwt.sign);

const User = require("./../models/userModel");
const APIError = require("./../utils/APIError");

const getMe = async (req, res) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
          throw new APIError("Authorization token is missing", 401);
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
          throw new APIError("User not found", 404);
      }

      res.status(200).json({
          message: "User details fetched successfully",
          data: { user },
      });
};

const signUp = async (req, res) => {
    const data = req.body;

    // check password
    if (data.password !== data.passwordConfirm) {
        throw new APIError("Password and Password Confirm must be the same", 400);
    }
    // hash password
    saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // create user
    const user = await User.create({
        ...data,
        role: "user",
        password: hashedPassword
    });
    // send response
    res.status(200).json({
        message: "User has been Registered successfully",
        data: {
            user,
        },
    });
};

const logIn = async (req, res) => {
    const { email, password } = req.body;

    // check existence of user
    const user = await User.findOne({ email });
    if (!user) {
        throw new APIError("Invalid Email or Password", 400);
    }
    // check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new APIError("Invalid Email or Password", 400);
    }
    // generate random 32 bytes number for secret key
        //const crypto = require("crypto");
        //const secretKey = crypto.randomBytes(32).toString("hex");
        //console.log("secret Key:",secretKey);

    // generate token
    const token = await jwtSign({ id: user._id },
        process.env.JWT_SECRET, { expiresIn: "1d" });

    // send response
    res.status(200).json({
        message: "Successful Login",
        token: token,
    });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    message: "Users fetched successfully",
    data: {
      total: users.length,
      users,
    },
  });
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new APIError("User not found", 404);
  }
  res.status(200).json({
    message: "User fetched successfully",
    data: {
      user,
    },
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  // const payload = { ...req.body, role: undefined };
  const payload = req.body;
  delete payload.role;
  const user = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!user) {
    throw new APIError("User not found", 404);
  }
  res.status(200).json({
    message: "User is updated successfully",
    data: {
      user,
    },
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    throw new APIError("User is NOT found", 404);
  }
  res.status(204).json({
    message: "User is deleted successfully",
  });
};

// Export
module.exports = {getMe, signUp, logIn, getAllUsers, getOneUser, updateUser, deleteUser };