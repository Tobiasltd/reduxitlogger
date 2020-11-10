const express = require("express");
const router = express.Router();
const Tech = require("../models/Tech");

// @route   POST  api/techs
// @desc    Add  a tech
// @access  Public
router.post("/", async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    // Create new tech
    tech = new Tech({
      firstName,
      lastName,
    });

    // Save tech to DB
    data = await tech.save();
    res.json(data);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   GET  api/techs
// @desc    Get  techs
// @access  Public
router.get("/", async (req, res) => {
  try {
    const techs = await Tech.find();
    res.json(techs);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE  api/techs/:id
// @desc    Delete tech
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    // Find tech
    let tech = await Tech.findById(req.params.id);
    if (!tech) return res.status(404).json({ msg: "Tech not found" });

    // Delete blog
    await Tech.findByIdAndRemove(req.params.id);
    res.json({ msg: "Tech removed" });
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
