const express = require("express");
const { check, validationResult } = require("express-validator");

//middleware
const auth = require("../middleware/auth");

// user schema
const User = require("../models/User");

//contact schema
const Contact = require("../models/Contact");

const router = express.Router();

// @route GET api/contacts
// @desc Get contact list
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// @route POST api/contacts
// @desc Add new contact
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Please enter Name").not().isEmpty(),
      check("email", "Please incluse a valid Email").isEmail(),
    ],
  ],
  async (req, res) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  }
);

// @route PUT api/contacts/:id
// @desc Update contact
// @access Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not Found!" });

    //make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized!" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// @route DELETE api/contacts/:id
// @desc Delete contact
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not Found!" });

    //make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized!" });
    }

    await Contact.findOneAndRemove(req.params.id);

    res.json({ msg: "Contact Removed!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
