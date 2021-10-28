const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const DB = require("../../config/db");
const auth = require("../middleware/auth");

// @route   POST api/studentattendance/getStudentsAttendanceBySubjectID
// @desc    Get StudentsAttendance
// @access  Public

router.post(
  "/getStudentsAttendanceBySubjectID",
  [
    check("adate", "ADate is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isDate(),
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
    const { adate, subjectid } = req.body;
    try {
      await DB.query(
        `select s2.id as id, s2.name, s2.userid, s3.adate,s3.present,s.id as subjectid from subjectselected s inner join students s2 on s.studentid = s2.id left join studentsattendance s3 on s.id = s3.subjectid and s3.adate = '${adate}' where s.subjectid = ${subjectid} and s.active = true;`
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

// @route   POST api/studentattendance/attbyidsubjid
// @desc    Get StudentsAttendance By Student ID and Subject ID
// @access  Public

router.post(
  "/attbyidsubjid",
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
        `select s2.id as id, s2.name, s2.userid, s3.adate,s3.present,s.id as subjectid from subjectselected s inner join students s2 on s.studentid = s2.id left join studentsattendance s3 on s.id = s3.subjectid where s.subjectid = ${subjectid} and s.studentid = '${studentid}';`
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

// @route   POST api/studentattendance/allowed
// @desc    Get Attendance Permission allowed
// @access  Public

router.post(
  "/allowed",
  [
    check("adate", "ADate is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isDate()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { adate } = req.body;
    dateNow = new Date();
    dateGiven = new Date(Date.parse(adate));
    if (
      dateNow.getFullYear() === dateGiven.getFullYear() &&
      dateNow.getMonth() === dateGiven.getMonth() &&
      dateGiven.getDate() <= dateNow.getDate() &&
      dateGiven.getDate() >= dateNow.getDate() - 5
    ) {
      res.status(200).json({ allowed: true });
    } else {
      res.status(200).json({ allowed: false });
    }
  }
);

// @route   POST api/studentattendance/new
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
