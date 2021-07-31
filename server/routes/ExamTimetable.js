const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/examtimetable/new
// @desc    Register Exam Timetable
// @access  Public

router.post(
  "/new",
  [
    check("examdate", "ExamDate is required!")
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
    const { examdate, subjectid } = req.body;
    try {
      // Check student already in database
      await DB.query(
        `SELECT subjectid, examdate FROM examinationtimetable where subjectid=${subjectid} and (date_part('year',examdate) = ${new Date(
          examdate
        ).getFullYear()} and date_part('month',examdate) = ${new Date(
          examdate
        ).getMonth() + 1})`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg: "Subject exam timetable is already in the database!"
            });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO examinationtimetable(subjectid,examdate) VALUES($1,$2) RETURNING id",
              [subjectid, examdate.trim()]
            )
              .then(results => {
                res.json({ examTimeTableID: results.rows[0].id });
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
