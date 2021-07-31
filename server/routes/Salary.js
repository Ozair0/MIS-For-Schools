const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/salary/addtype
// @desc    Add Salary Type
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
      await DB.query(`SELECT type FROM salarytype where type='${type.trim()}'`)
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg: "Type is already in the database."
            });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO salarytype(type) VALUES($1) RETURNING id",
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

// @route   POST api/salary/new
// @desc    Add Employee Salary
// @access  Public
router.post(
  "/new",
  [
    check("employeeid", "EmployeeID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("teacherid", "TeacherID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("amount", "Amount is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("salarytype", "SalaryType is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("currency", "Currency is required!")
      .not()
      .isEmpty()
      .isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { amount, currency, salarytype, employeeid, teacherid } = req.body;

    try {
      if (
        !(
          (employeeid === 0 && teacherid === 0) ||
          (employeeid !== 0 && teacherid !== 0)
        )
      ) {
        await DB.query(
          `SELECT employeeid,teacherid FROM employeesalary where employeeid=${employeeid} or teacherid=${teacherid}`
        )
          .then(async results => {
            if (results.rows.length > 0) {
              return res.status(401).json({
                msg:
                  "Employee salary is already added to the database. Try to update!"
              });
            } else {
              //Save Department To DB
              await DB.query(
                "INSERT INTO employeesalary(amount, currency,salarytypeid,employeeid, teacherid) VALUES($1,$2,$3,$4,$5) RETURNING id",
                [
                  amount,
                  currency,
                  salarytype,
                  employeeid === 0 ? null : employeeid,
                  teacherid === 0 ? null : teacherid
                ]
              )
                .then(results => {
                  res.json({ employeeSalaryID: results.rows[0].id });
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

// @route   POST api/salary/tobepaid
// @desc    Generate Employee Salary To Be Paid
// @access  Public
router.post(
  "/tobepaid",
  [
    check("employeeid", "EmployeeID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("teacherid", "TeacherID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("amount", "Amount is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("fordate", "ForDate is required!")
      .not()
      .isEmpty()
      .isDate(),
    check("currency", "Currency is required!")
      .not()
      .isEmpty()
      .isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { amount, currency, fordate, employeeid, teacherid } = req.body;

    try {
      if (
        !(
          (employeeid === 0 && teacherid === 0) ||
          (employeeid !== 0 && teacherid !== 0)
        )
      ) {
        await DB.query(
          `SELECT employeeid,teacherid,fordate FROM salarytobepaid where (date_part('year',fordate) = ${new Date(
            fordate
          ).getFullYear()} and date_part('month',fordate) = ${new Date(
            fordate
          ).getMonth() +
            1}) and (employeeid=${employeeid} or teacherid=${teacherid})`
        )
          .then(async results => {
            if (results.rows.length > 0) {
              return res.status(401).json({
                msg:
                  "Employee salary to be paid is already generate in the database. Try to update!"
              });
            } else {
              //Save Department To DB
              await DB.query(
                "INSERT INTO salarytobepaid(amount, currency,fordate,employeeid, teacherid) VALUES($1,$2,$3,$4,$5) RETURNING id",
                [
                  amount,
                  currency,
                  fordate,
                  employeeid === 0 ? null : employeeid,
                  teacherid === 0 ? null : teacherid
                ]
              )
                .then(results => {
                  res.json({ employeeSalaryID: results.rows[0].id });
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

// @route   POST api/salary/addpaid
// @desc    Add Employee Paid Salary
// @access  Public
router.post(
  "/addpaid",
  [
    check("employeeid", "EmployeeID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("teacherid", "TeacherID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("amountpaid", "AmountPaid is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("datepaid", "DatePaid is required!")
      .not()
      .isEmpty()
      .isDate(),
    check("currency", "Currency is required!")
      .not()
      .isEmpty()
      .isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { amountpaid, currency, datepaid, employeeid, teacherid } = req.body;

    try {
      if (
        !(
          (employeeid === 0 && teacherid === 0) ||
          (employeeid !== 0 && teacherid !== 0)
        )
      ) {
        await DB.query(
          `SELECT employeeid,teacherid,datepaid FROM salarypaid where (date_part('year',datepaid) = ${new Date(
            datepaid
          ).getFullYear()} and date_part('month',datepaid) = ${new Date(
            datepaid
          ).getMonth() +
            1}) and (employeeid=${employeeid} or teacherid=${teacherid})`
        )
          .then(async results => {
            if (results.rows.length > 0) {
              return res.status(401).json({
                msg: "Employee paid salary is already in the database."
              });
            } else {
              //Save Department To DB
              await DB.query(
                "INSERT INTO salarypaid(amountpaid, currency,datepaid,employeeid, teacherid) VALUES($1,$2,$3,$4,$5) RETURNING id",
                [
                  amountpaid,
                  currency,
                  datepaid,
                  employeeid === 0 ? null : employeeid,
                  teacherid === 0 ? null : teacherid
                ]
              )
                .then(results => {
                  res.json({ employeeSalaryID: results.rows[0].id });
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
