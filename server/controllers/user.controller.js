import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    // console.log(req.body);

    const { auth0Id, email } = req.body;

    const existUser = await User.findOne({ auth0Id });

    if (existUser) {
      return res.status(200).send();
    }

    const newUser = await User.create({
      auth0Id,
      email,
    });
    // await newUser.save();

    // console.log("new user ",newUser);

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, address, country, city } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.address = address;
    user.country = country;
    user.city = city;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error updating user" });
  }
};

const getUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if(!currentUser){
      return res.status(404).json({message:"user not found"})
    }

    return res.status(200).json({user:currentUser});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export { createUser, updateUser, getUser };
