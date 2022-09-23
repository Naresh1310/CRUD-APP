const User = require("../model/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

const postNewUserApi = async (req, res, next) => {
  try {
    const { name, age, email } = req.body;
    const user = await User.create({ name, age, email });
    if (user) res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};

const editUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body._id },
      {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  console.log("trigged");
  console.log(req.params.id);
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).send("success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  getAllUsers,
  postNewUserApi,
  editUser,
  deleteUser,
};
