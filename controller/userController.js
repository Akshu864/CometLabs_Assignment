const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User SignUp
const signUp = async function (req, res) {
  try {
    const data = req.body;
    const { password, role } = data;

    let emailCheck = await userModel.findOne({ email: data.email });
    if (emailCheck) {
      return res.status(400).send({ status: false, message: "This email already exists" });
    }

    if (!role) {
      return res.status(400).send({ status: false, message: "Role is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;

    const createUser = await userModel.create(data);
    res.status(201).send({ status: true, message: "Success!", data: createUser });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Something went wrong" });
  }
};


const login = async function (req, res) {
  try {
    let data = req.body;

    let checkDetail = await userModel.findOne({ email: data.email });
    if (!checkDetail) {
      return res.status(404).send({ status: false, message: "Could not find user details. Please check your email" });
    }

    let checkPassword = await bcrypt.compare(data.password, checkDetail.password);
    if (!checkPassword) {
      return res.status(404).send({ status: false, message: "Invalid password" });
    }

    let email = checkDetail.email;
    let role = checkDetail.role; // Getting the role from the user record

    // Setting the expiration time to 48 hours (2 days)
    let token = jwt.sign({ email: email, role: role }, "Token", { expiresIn: "48h" });

    res.status(200).send({ email: email, role: role, accessToken: token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Something went wrong" });
  }
};

module.exports = { signUp, login };




// const signUp = async function (req, res) {
//   try {
//     const data = req.body;

//     let emailCheck = await userModel.findOne({ email: data.email });
//     if (emailCheck) {
//       return res.status(400).send({ status: false, message: "This email already exists" });
//     }

//     const { password, role } = data;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     data.password = hashedPassword;

//     // Set the role based on user input
//     data.role = role || 'participant';

//     const createUser = await userModel.create(data);
//     res.status(201).send({ status: true, message: "Success!", data: createUser });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ status: false, message: "Something went wrong" });
//   }
// };
