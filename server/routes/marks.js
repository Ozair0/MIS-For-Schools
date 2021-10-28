const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const DB = require("../../config/db");
const auth = require("../middleware/auth");

// @route   POST api/marks/markbyidsubjid
// @desc    Get Students Marks By Student ID and Subject ID
// @access  Public

router.post(
  "/markbyidsubjid",
  [
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
      .isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { studentid, subjectid } = req.body;
    try {
      await DB.query(
        `select m.id as id,m.sscore as sscore, m.fscore as fscore from marks m inner join subjectselected s on s.id = m.subjectselectedid inner join subjects_thought_by_teachers stbt on stbt.id = s.subjectid where
       m.subjectselectedid=${subjectid} and s.studentid=${studentid};`
      )
        .then(results => {
          res.status(200).json(results.rows);
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

// @route   POST api/marks/new
// @desc    Register Student Marks
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
    const { adate, studentid, subjectid, present } = req.body;

    try {
      // Check student already in database
      await DB.query(
        `SELECT adate,studentid,present FROM studentsattendance where adate='${adate}' and studentid=${studentid} and subjectid=${subjectid}`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            if (results.rows[0].present === present) {
              return res.status(401).json({
                msg:
                  "Student attendance is already in the database. Try to update!"
              });
            } else {
              //Update Student Attendance
              await DB.query(
                `update studentsattendance set present=${present} where adate='${adate}' and studentid=${studentid} and subjectid=${subjectid} RETURNING id`
              )
                .then(results => {
                  res.json({ studentAttendanceID: results.rows[0].id });
                })
                .catch(e => {
                  throw e;
                });
            }
          } else {
            //Save Student Attendance
            await DB.query(
              "INSERT INTO studentsattendance(adate, studentid,subjectid, present) VALUES($1,$2,$3,$4) RETURNING id",
              [adate, studentid, subjectid, present]
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
