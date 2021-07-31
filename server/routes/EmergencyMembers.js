const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/emergencymember/new
// @desc    Register Emergency Members
// @access  Public

router.post(
  "/new",
  [
    check("studentid", "StudentID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("employeeid", "EmployeeID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("teacherid", "TeacherID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("name", "Name is required!")
      .not()
      .isEmpty()
      .isString(),
    check("phonenumber", "PhoneNumber is required!")
      .not()
      .isEmpty()
      .isString(),
    check("relationship", "Relationship is required!")
      .not()
      .isEmpty()
      .isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      studentid,
      employeeid,
      teacherid,
      name,
      phonenumber,
      relationship
    } = req.body;
    let allow = false;
    if (studentid !== 0 && teacherid === 0 && employeeid === 0) {
      allow = true;
    } else if (teacherid !== 0 && studentid === 0 && employeeid === 0) {
      allow = true;
    } else if (employeeid !== 0 && studentid === 0 && teacherid === 0) {
      allow = true;
    }
    try {
      if (allow) {
        //Save emergencymember To DB
        await DB.query(
          "INSERT INTO emergencymembers(studentid,employeeid, teacherid,name,phonenumber,relationship) VALUES($1,$2,$3,$4,$5,$6) RETURNING id",
          [
            studentid === 0 ? null : studentid,
            employeeid === 0 ? null : employeeid,
            teacherid === 0 ? null : teacherid,
            name,
            phonenumber,
            relationship
          ]
        )
          .then(results => {
            res.json({ emergencyMemberID: results.rows[0].id });
          })
          .catch(e => {
            throw e;
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
