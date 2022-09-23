const express = require("express");
const userController = require("../controller/userContoller");
const router = express.Router();

router.route("/allUsers").get(userController.getAllUsers);
router.route("/newUser").post(userController.postNewUserApi);
router.route("/editUser").patch(userController.editUser);
router.route("/deleteUser/:id").delete(userController.deleteUser);

module.exports = router;
