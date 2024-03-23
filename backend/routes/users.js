const router = require("express").Router();

const userController = require("../controllers/user");

router.post("/signup", userController.signup);
router.get("/verify/:confirmationToken", userController.verifyEmail);
router.post("/login", userController.login);

module.exports = router;
