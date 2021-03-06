const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/timetable/new
// @desc    Register Timetable
// @access  Public

router.post(
  "/new",
  [
    check("classdate", "ClassDate is required!")
      .not()
      .isEmpty()
      .isDate(),
    check("subjectid", "SubjectID is required!")
      .not()
      .isEmpty()
      .isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { subjectid, classdate } = req.body;

    try {
      // Check student already in database
      await DB.query(
        `SELECT subjectid FROM timetable where subjectid=${subjectid}`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res
              .status(401)
              .json({ msg: "Subject timetable is already in the database!" });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO timetable(subjectid,classdate) VALUES($1,$2) RETURNING id",
              [subjectid, classdate.trim()]
            )
              .then(results => {
                res.json({ timetableID: results.rows[0].id });
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
