const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   GET api/grade/allinfo
// @desc    Get All Grade NAME & ID
// @access  Public
router.get("/allinfo", (req, res) => {
  try {
    DB.query(
      `select id,gradenumber from grade where gradenumber != 'Graduated' order by id;`
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

// @route   GET api/grade/all
// @desc    Get All Grades
// @access  Public
router.get("/all", (req, res) => {
  try {
    DB.query(
      `select * from grade where gradenumber != 'Graduated' order by id;`
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
// @route   POST api/grade/abyid
// @desc    Get Allowed Grades ByID
// @access  Public

router.post(
  "/abyid",
  [
    check("id", "Name is required!")
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
    const { id } = req.body;

    try {
      // Check student already in database
      await DB.query(
        `select * from grade where id >= ${id} and not id > ${id +
          1} order by id;`
      )
        .then(async results => {
          res.status(200).json(results.rows);
        })
        .catch(e => {
          console.log(e);
          res.status(400).json({ msg: "Database error!" });
        });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/grade/new
// @desc    Register Grade
// @access  Public

router.post(
  "/new",
  [
    check("name", "Name is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
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
      await DB.query(
        `SELECT gradenumber FROM grade where gradenumber='${name.trim()}'`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg: [{ msg: "This Grade is already in the database!" }]
            });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO grade(gradenumber) VALUES($1) RETURNING id",
              [name.trim()]
            )
              .then(results => {
                res.json({ gradeID: results.rows[0].id });
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
