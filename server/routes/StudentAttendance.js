const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/studentsattendance/new
// @desc    Register StudentsAttendance
// @access  Public

router.post(
  "/new",
  [
    check("adate", "ADate is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isDate(),
    check("studentid", "StudentID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt(),
    check("subjectid", "SubjectID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt(),
    check("present", "Present is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isBoolean()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { adate, studentid, subjectid,present } = req.body;

    try {
      // Check student already in database
      await DB.query(
        `SELECT adate,studentid FROM studentsattendance where adate='${adate}' and studentid=${studentid} and subjectid=${subjectid}`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg:
                "Student attendance is already in the database. Try to update!"
            });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO studentsattendance(adate, studentid,subjectid, present) VALUES($1,$2,$3,$4) RETURNING id",
              [adate, studentid,subjectid ,present]
            )
              .then(results => {
                res.json({ studentAttendanceID: results.rows[0].id });
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
