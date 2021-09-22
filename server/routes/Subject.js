const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/subject/all
// @desc    Get All Subjects
// @access  Public
router.get("/all", (req, res) => {
  try {
    DB.query(
      `select s.name as subject,c.roomnumber,t.name as teacher, g.gradenumber  from subjects as s inner join classroom c on c.id = s.classroomid inner join teachers t on s.teacherid = t.id inner join grade g on s.gradeid = g.id;`
    )
      .then(result => {
        res.status(200).json(result.rows);
      })
      .catch(e => {
        console.log(e);
        res.status(400).json({ e });
      });
  } catch (e) {
    res.status(400).json({ e });
  }
});

// @route   POST api/subject/new
// @desc    Register Subject
// @access  Public

router.post(
  "/new",
  [
    check("name", "Name is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isString(),
    check("classroomid", "ClassroomID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt(),
    check("teacherid", "TeacherID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt(),
    check("gradeid", "GradeID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { classroomid, teacherid, name, gradeid } = req.body;

    try {
      // Check student already in database
      await DB.query(
        `SELECT name,classroomid,teacherid,gradeid FROM subjects where name='${name.trim()}' and classroomid=${classroomid} and teacherid=${teacherid} and gradeid=${gradeid}`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg: [{ msg: "This Subject is already in the database!" }]
            });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO subjects(classroomid,teacherid,name,gradeid) VALUES($1,$2,$3,$4) RETURNING id",
              [classroomid, teacherid, name.trim(), gradeid]
            )
              .then(results => {
                res.json({ subjectID: results.rows[0].id });
              })
              .catch(e => {
                throw e;
              });
          }
        })
        .catch(e => {
          res.status(400).json({ msg: "Database error!" });
        });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/subject/select
// @desc    Select Subject For Student
// @access  Public

router.post(
  "/select",
  [
    check("studentid", "StudentID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("subjectid", "SubjectID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("dateselected", "DateSelected is required!")
      .not()
      .isEmpty()
      .isDate()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { studentid, subjectid, dateselected } = req.body;

    try {
      // Check student already in database
      await DB.query(
        `SELECT studentid,subjectid,dateselected FROM subjectselected where studentid=${studentid} and subjectid=${subjectid} and date_part('year', dateselected) = ${new Date(
          dateselected
        ).getFullYear()}`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg: `This Subject is already selected in this year: ${new Date(
                dateselected
              ).getFullYear()}`
            });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO subjectselected(studentid,subjectid,dateselected) VALUES($1,$2,$3) RETURNING id",
              [studentid, subjectid, dateselected]
            )
              .then(results => {
                res.json({ subjectSelectedID: results.rows[0].id });
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

// @route   POST api/subject/addmarks
// @desc    Add Subject Marks Of Student
// @access  Public

router.post(
  "/addmarks",
  [
    check("subjectselectedid", "SubjectSelectedID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("fscore", "FScore is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("sscore", "SScore is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("totalscore", "TotalScore is required!")
      .not()
      .isEmpty()
      .isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { subjectselectedid, fscore, sscore, totalscore } = req.body;

    try {
      // Check student already in database
      await DB.query(
        `SELECT subjectselectedid FROM marks where subjectselectedid=${subjectselectedid}`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg: `This Subject score is already added in the database!`
            });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO marks(subjectselectedid, fscore, sscore, totalscore) VALUES($1,$2,$3,$4) RETURNING id",
              [subjectselectedid, fscore, sscore, totalscore]
            )
              .then(results => {
                res.json({ subjectScoreID: results.rows[0].id });
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
