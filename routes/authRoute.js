const express = require("express");
const router = express.Router();

const {register, login, registerdemo} = require('../controllers/authController');

router.post("/register", register);
router.get("/registerdemo", registerdemo);

router.post("/login", login);


module.exports = router;