const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//schema
const User = require("../models/User");

//middleware
const auth = require("../middleware/auth");

const router = express.Router();

// @route POST api/auth
// @desc Auth User & Get Token
// @access Public
router.post(
  "/",
  [
    check("email", "Please incluse a valid Email").isEmail(),
    check(
      "password",
      "Please incluse a Password with 6 or more Characters"
    ).exists(),
  ],
  async (req, res) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    const { email, password } = req.body;

    try {
      //check user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      //compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      //get jsonwentoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  }
);

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
