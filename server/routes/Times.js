const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   GET api/time/sbytime
// @desc    Get All Start Time By Time Of The Day
// @access  Public
router.get("/sbytime", (req, res) => {
  if(req.query.time) {

    try {
      DB.query(
        `select * from starttime where timeoftheday = '${req.query.time}'`
      )
        .then(result => {
          res.status(200).json(result.rows);
        })
        .catch(e => {
          console.log(e);
          res.status(400).json({e});
        });
    } catch (e) {
      res.status(400).json({e});
    }
  }else{
    res.status(401).json({
      msg: [{ msg: "ID Required" }]
    });
  }
});


// @route   GET api/time/ebytime
// @desc    Get All End Time By Time Of The Day
// @access  Public
router.get("/ebytime", (req, res) => {
  if(req.query.time) {

    try {
      DB.query(
        `select * from endtime where timeoftheday = '${req.query.time}'`
      )
        .then(result => {
          res.status(200).json(result.rows);
        })
        .catch(e => {
          console.log(e);
          res.status(400).json({e});
        });
    } catch (e) {
      res.status(400).json({e});
    }
  }else{
    res.status(401).json({
      msg: [{ msg: "ID Required" }]
    });
  }
});

module.exports = router;
