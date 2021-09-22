const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");
// @route   POST api/department/allinfo
// @desc    Get All Department NAME & ID
// @access  Public
router.get("/allinfo", (req, res) => {
  try {
    DB.query(`select id,name from department where name != 'Admin';`)
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

// @route   POST api/department/new
// @desc    Register Departments
// @access  Public

router.post(
  "/new",
  [
    check("name", "Name is required!")
      .not()
      .isEmpty()
      .isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { name } = req.body;

    try {
      // Check student already in database
      DB.query(`SELECT name FROM department where name='${name.trim()}'`)
        .then(async results => {
          if (results.rows.length > 0) {
            return res
              .status(401)
              .json({ msg: [{ msg: "Department is already in the database!" }] });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO department(name) VALUES($1) RETURNING id",
              [name]
            )
              .then(results => {
                res.json({ id: results.rows[0].id });
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
