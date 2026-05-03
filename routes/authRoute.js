const express = require("express");
const router = express.Router();

const {register, login, registerdemo} = require('../controllers/authController');

router.post("/register", register);
//router.get("/registerdemo", registerdemo);

router.post("/login", login);


router.get("/registerdemo", (req, res) => {
    console.log("HIT REGISTER DEMO");
    res.json({ ok: true });
});


module.exports = router;