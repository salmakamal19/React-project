const express = require("express");
const userController = require("./../controllers/userController");
 const authenticate = require("./../middleWares/authenticate");
 const restrictTo = require("./../middleWares/restrictTo");
const router = express.Router();

router.get("/me", userController.getMe);
router.post("/signup", userController.signUp);                                          // Sign Up
router.post("/login", userController.logIn);                                            // Log in

router.get("/", userController.getAllUsers);                                            // Get All Users
//router.get("/", authenticate, restrictTo("admin"), userController.getAllUsers);          // Get All Users
// router.get("/:id", authenticate, userController.getOneUser);                            // Get One User
// router.patch("/:id", authenticate, restrictTo("admin"), userController.updateUser);     // Update User
// router.delete("/:id", authenticate, restrictTo("admin"), userController.deleteUser);    // Delete User
router.get("/:id", userController.getOneUser);                                          // Get One User
router.patch("/:id", userController.updateUser);                                        // Update User
router.delete("/:id", userController.deleteUser);                                       // Delete User

// Export
module.exports = router;
