const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/book/new
// @desc    Register Book
// @access  Public

router.post(
  "/new",
  [
    check("name", "Name is required!")
      .not()
      .isEmpty()
      .isString(),
    check("s_number", "S_Number is required!")
      .not()
      .isEmpty()
      .isString(),
    check("publisher", "Publisher is required!")
      .not()
      .isEmpty()
      .isString(),
    check("datepublished", "DatePublished is required!")
      .not()
      .isEmpty()
      .isDate(),
    check("libraryid", "LibraryID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("authorid", "AuthorID is required!")
      .not()
      .isEmpty()
      .isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      s_number,
      publisher,
      datepublished,
      libraryid,
      authorid
    } = req.body;

    try {
      //Save Department To DB
      await DB.query(
        "INSERT INTO books(name, s_number, publisher, datepublished, libraryid,authorid) VALUES($1,$2,$3,$4,$5,$6) RETURNING id",
        [name.trim(), s_number, publisher, datepublished, libraryid, authorid]
      )
        .then(results => {
          res.json({ bookID: results.rows[0].id });
        })
        .catch(e => {
          throw e;
        });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route   POST api/book/author
// @desc    Register Author
// @access  Public

router.post(
  "/author",
  [
    check("name", "Name is required!")
      .not()
      .isEmpty()
      .isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;

    try {
      // Check student already in database
      await DB.query(`SELECT name FROM bookauthors where name='${name.trim()}'`)
        .then(async results => {
          if (results.rows.length > 0) {
            return res
              .status(401)
              .json({ msg: "This Author is already in the database!" });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO bookauthors(name) VALUES($1) RETURNING id",
              [name.trim()]
            )
              .then(results => {
                res.json({ authorID: results.rows[0].id });
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

// @route   POST api/book/takebook
// @desc    Register TakeBook
// @access  Public

router.post(
  "/takebook",
  [
    check("datetaken", "DateTaken is required!")
      .not()
      .isEmpty()
      .isDate(),
    check("returndate", "ReturnDate is required!")
      .not()
      .isEmpty()
      .isDate(),
    check("bookid", "BookID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("studentid", "StudentID is required!")
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
    const { datetaken, returndate, bookid, studentid, teacherid } = req.body;

    try {
      if (
        !(
          (studentid === 0 && teacherid === 0) ||
          (studentid !== 0 && teacherid !== 0)
        )
      ) {
        // Check student already in database
        await DB.query(
          `SELECT bookid,studentid,teacherid FROM bookstakenby where (bookid=${bookid} and studentid=${studentid}) or (bookid=${bookid} and teacherid=${teacherid})`
        )
          .then(async results => {
            if (results.rows.length > 0) {
              return res.status(401).json({
                msg: `User already taken book on: ${results.rows[0].datetaken}`
              });
            } else {
              //Save Department To DB
              await DB.query(
                "INSERT INTO bookstakenby(datetaken, returndate, bookid, studentid, teacherid) VALUES($1,$2,$3,$4,$5) RETURNING id",
                [
                  datetaken,
                  returndate,
                  bookid,
                  studentid === 0 ? null : studentid,
                  teacherid === 0 ? null : teacherid
                ]
              )
                .then(results => {
                  res.json({ bookTakenID: results.rows[0].id });
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
