import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    
    const { auth0Id, email } = req.body;

    const existUser = await User.findOne({ auth0Id });

    if (existUser) {
      return res.status(200).send();
    }

    const newUser = await User.create({
        auth0Id,
        email
    });
    // await newUser.save();

    // console.log("new user ",newUser);    

    res.status(201).json({user:newUser});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export { createUser };
