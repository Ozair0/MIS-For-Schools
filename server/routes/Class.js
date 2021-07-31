const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/class/new
// @desc    Register Class
// @access  Public

router.post(
  "/new",
  [
    check("name", "Name is required!")
      .not()
      .isEmpty()
      .isString(),
    check("gradeid", "GradeID is required!")
      .not()
      .isEmpty()
      .isInt(),
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
    const { name, gradeid, schoolid } = req.body;

    try {
      // Check student already in database
      await DB.query(
        `SELECT classname FROM classes where classname='${name.trim()}'`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res
              .status(401)
              .json({ msg: "This Class is already in the database!" });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO classes(schoolid,gradeid,classname) VALUES($1,$2,$3) RETURNING id",
              [schoolid, gradeid, name.trim()]
            )
              .then(results => {
                res.json({ classID: results.rows[0].id });
              })
              .catch(e => {
                throw e;
              });
          }
        })
        .catch(e => {
          console.log(e);
          res.status(401).json({ msg: "Database error!" });
        });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
