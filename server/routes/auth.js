const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const DB = require("../../config/db");

// @route   GET api/auth
// @desc    Get User
// @access  Public

router.get("/", auth, async (req, res) => {
  try {
    if (req.user.type === 1) {
      DB.query(
        `SELECT * FROM students where id = ${req.user.id}`,
        (error, results) => {
          if (error) {
            console.log(error);
            throw error;
          }

          delete results.rows[0].password;
          res.status(200).json({ user: results.rows });
        }
      );
    } else if (req.user.type === 2) {
      DB.query(
        `SELECT * FROM teachers where id = ${req.user.id}`,
        (error, results) => {
          if (error) {
            console.log(error);
            throw error;
          }
          delete results.rows[0].password;
          res.status(200).json({ user: results.rows });
        }
      );
    } else if (req.user.type === 3) {
      DB.query(
        `SELECT * FROM employees where id = ${req.user.id}`,
        (error, results) => {
          if (error) {
            console.log(error);
            throw error;
          }
          delete results.rows[0].password;
          res.status(200).json({ user: results.rows });
        }
      );
    } else if (req.user.type === 4) {
      DB.query(
        `SELECT * from parents where id = ${req.user.id}`,
        (error, results) => {
          if (error) {
            console.log(error);
            throw error;
          }
          delete results.rows[0].password;
          res.status(200).json({ user: results.rows });
        }
      );
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/logout
// @desc    LogOut User
// @access  Public
router.get("/logout", auth, async (req, res) => {
  try {
    // select -password will not return the password
    DB.query(`DELETE FROM tokens where token ='${req.user.token}'`, () => {
      res.status(200).json({ Result: "Success" });
    });
  } catch (e) {
    res.status(500).send("Server Error");
  }
});

// @route   POST api/student
// @desc    Authenticate user & get token
// @access  Public

router.post(
  "/",
  [
    check("userid", "Please Include UserID")
      .isString()
      .not()
      .isEmpty(),
    check("password", "Password is Required")
      .exists()
      .not()
      .isEmpty(),
    check("type", "Type is Required")
      .isInt()
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userid, password, type } = req.body;
    try {
      // See if the user exists
      // let user = await User.findOne({ email });
      let user;
      if (type === 1) {
        await DB.query("SELECT * FROM students where userid = $1", [userid])
          .then(res => {
            user = res.rows[0];
            console.log("works");
          })
          .catch(e => {
            throw e;
          });
      } else if (type === 2) {
        await DB.query(`SELECT * FROM teachers where userid = '${userid}'`)
          .then(res => {
            user = res.rows[0];
          })
          .catch(e => {
            throw e;
          });
      } else if (type === 3) {
        await DB.query(`SELECT * FROM employees where userid = '${userid}'`)
          .then(res => {
            user = res.rows[0];
          })
          .catch(e => {
            throw e;
          });
      } else if (type === 4) {
        await DB.query(`SELECT * FROM parents where userid = '${userid}'`)
          .then(res => {
            user = res.rows[0];
          })
          .catch(e => {
            throw e;
          });
      }

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };
      // Use 3600 1HR for Prod!
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        async (err, token) => {
          if (err) throw err;
          await DB.query(
            `INSERT INTO Tokens(Token, Type) VALUES ('${token}',${user.type})`
          )
            .then(() => {
              res.json({ token });
            })
            .catch(e => {
              throw e;
            });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
