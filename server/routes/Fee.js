const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/fee/addtype
// @desc    Add Fee Type
// @access  Public

router.post(
  "/addtype",
  [
    check("type", "Type is required!")
      .not()
      .isEmpty()
      .isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { type } = req.body;

    try {
      await DB.query(
        `SELECT feetype FROM feetype where feetype='${type.trim()}'`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg: "Fee type is already in the database."
            });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO feetype(feetype) VALUES($1) RETURNING id",
              [type.trim()]
            )
              .then(results => {
                res.json({ typeID: results.rows[0].id });
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

// @route   POST api/fee/addinstallment
// @desc    Add Installment
// @access  Public

router.post(
  "/addinstallment",
  [
    check("installmentnumber", "Type is required!")
      .not()
      .isEmpty()
      .isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { installmentnumber } = req.body;

    try {
      await DB.query(
        `SELECT installmentnumber FROM installment where installmentnumber=${installmentnumber}`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg: "Installment is already in the database."
            });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO installment(installmentnumber) VALUES($1) RETURNING id",
              [installmentnumber]
            )
              .then(results => {
                res.json({ installmentNumberID: results.rows[0].id });
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

// @route   POST api/fee/new
// @desc    Add Student Fee
// @access  Public
router.post(
  "/new",
  [
    check("feetypeid", "FeetypeID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("installmentnumberid", "InstallmentNumberID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("studentid", "StudentID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("amount", "Amount is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("duedate", "DueDate is required!")
      .not()
      .isEmpty()
      .isDate(),
    check("currency", "Currency is required!")
      .not()
      .isEmpty()
      .isString(),
    check("paymenttype", "PaymentType is required!")
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
      feetypeid,
      installmentnumberid,
      studentid,
      amount,
      duedate,
      currency,
      paymenttype
    } = req.body;

    try {
      await DB.query(
        `SELECT installmentnumberid,studentid,duedate FROM fee where (studentid=${studentid} and installmentnumberid=${installmentnumberid}) and date_part('year',duedate) = ${new Date(
          duedate
        ).getFullYear()}`
      )
        .then(async results => {
          if (results.rows.length >= 2) {
            return res.status(401).json({
              msg: "Student fee is already added in the database."
            });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO fee(feetypeid,installmentnumberid,studentid,amount,duedate,currency,paymenttype) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id",
              [
                feetypeid,
                installmentnumberid,
                studentid,
                amount,
                duedate,
                currency,
                paymenttype
              ]
            )
              .then(results => {
                res.json({ feeID: results.rows[0].id });
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
