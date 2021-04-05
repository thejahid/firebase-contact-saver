const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//schema
const User = require("../models/User");

const router = express.Router();

// @route POST api/users
// @desc Register a user
// @access Public
router.post(
  "/",
  [
    check("name", "Please enter Name").not().isEmpty(),
    check("email", "Please incluse a valid Email").isEmail(),
    check(
      "password",
      "Please incluse a Password with 6 or more Characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    const { name, email, password } = req.body;

    //post to database
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exits" });
      }

      user = new User({
        name,
        email,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //save user to database
      await user.save();

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

module.exports = router;
