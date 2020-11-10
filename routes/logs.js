const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

// @route   POST  api/logs
// @desc    Add  a log
// @access  Public
router.post("/", async (req, res) => {
  const { message, attention, tech, date } = req.body;
  try {
    // Create new log
    log = new Log({
      message,
      attention,
      tech,
      date,
    });

    // Save log to DB
    data = await log.save();
    res.json(data);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   GET  api/logs
// @desc    Get  logs
// @access  Public
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({
      date: -1,
    });
    res.json(logs);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   GET     api/logs/search/:id
// @desc    Search  specific log
// @access  Public
router.get("/search/:id", async (req, res) => {
  var query = { message: new RegExp(`${req.params.id}`, "i") };
  try {
    const logs = await Log.find(query);
    res.json(logs);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE  api/logs/:id
// @desc    Delete log
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    // Find log
    let log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: "Log not found" });

    // Delete blog
    await Log.findByIdAndRemove(req.params.id);
    res.json({ msg: "Log removed" });
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   PUT  api/log/:id
// @desc    Edit log
// @access  public
router.put("/:id", async (req, res) => {
  const { message, attention, tech, date, id } = req.body;
  // Build log object
  const logFields = {};
  if (message) logFields.message = message;
  if (attention) logFields.attention = attention;
  if (tech) logFields.tech = tech;
  if (date) logFields.date = date;
  if (id) logFields._id = id;

  try {
    let log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: "Log not found" });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
