const { login, signup, asignup } = require("../controllers/auth");

const router = require("express").Router();

router.route("/login").post(login);

router.route("/signup").post(signup);

router.route("/asignup").post(asignup);

module.exports = router;
