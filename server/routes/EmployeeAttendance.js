const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/employeeattendance/new
// @desc    Register EmployeeAttendance
// @access  Public

router.post(
  "/new",
  [
    check("adate", "ADate is required!")
      .not()
      .isEmpty()
      .isDate(),
    check("present", "Present is required!")
      .not()
      .isEmpty()
      .isBoolean(),
    check("employeeid", "EmployeeID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("teacherid", "TeacherID is required!")
      .not()
      .isEmpty()
      .isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { adate, present, employeeid, teacherid } = req.body;

    try {
      if (
        !(
          (employeeid === 0 && teacherid === 0) ||
          (employeeid !== 0 && teacherid !== 0)
        )
      ) {
        await DB.query(
          `SELECT adate,employeeid,teacherid FROM employeesattendance where adate='${adate}' and (employeeid=${employeeid} or teacherid=${teacherid})`
        )
          .then(async results => {
            if (results.rows.length > 0) {
              return res.status(401).json({
                msg:
                  "Employee attendance is already in the database. Try to update!"
              });
            } else {
              //Save Department To DB
              await DB.query(
                "INSERT INTO employeesattendance(adate, present,employeeid, teacherid) VALUES($1,$2,$3,$4) RETURNING id",
                [
                  adate,
                  present,
                  employeeid === 0 ? null : employeeid,
                  teacherid === 0 ? null : teacherid
                ]
              )
                .then(results => {
                  res.json({ employeeAttendanceID: results.rows[0].id });
                })
                .catch(e => {
                  throw e;
                });
            }
          })
          .catch(e => {
            res.status(401).json({ msg: "Database error!" });
          });
      } else {
        return res.status(401).json({
          msg: "Incorrect parms"
        });
      }
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
