const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/library/new
// @desc    Register Library
// @access  Public

router.post(
  "/new",
  [
    check("name", "Name is required!")
      .not()
      .isEmpty()
      .isString(),
    check("schoolid", "SchoolID is required!")
      .not()
      .isEmpty()
      .isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, schoolid } = req.body;

    try {
      // Check student already in database
      DB.query(
        `SELECT name,schoolid FROM library where name='${name.trim()}' and schoolid=${schoolid}`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res
              .status(401)
              .json({ msg: "Library is already in the database!" });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO library(name,schoolid) VALUES($1,$2) RETURNING id",
              [name.trim(), schoolid]
            )
              .then(results => {
                res.json({ libraryID: results.rows[0].id });
              })
              .catch(e => {
                throw e;
              });
          }
        })
        .catch(e => {
          res.status(401).json({ msg: "Database error!" });
        });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
