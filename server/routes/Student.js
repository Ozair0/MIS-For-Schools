const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   POST api/student/
// @desc    Get Student Total
// @access  Public
router.get("/", (req, res) => {
  try {
    DB.query(`SELECT count(*) as total FROM students`)
      .then(result => {
        res.status(200).json({ total: result.rows[0].total });
      })
      .catch(e => {
        console.log(e);
        res.status(400).json({ e });
      });
  } catch (e) {
    res.status(400).json({ e });
  }
});

// @route   POST api/student/new
// @desc    Register Student
// @access  Public

router.post(
  "/new",
  [
    check("name", "Name is required!")
      .not()
      .isEmpty()
      .isString(),
    check("lastname", "LastName is required!")
      .not()
      .isEmpty()
      .isString(),
    check("schoolid", "SchoolID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("parentid", "ParentID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("userid", "Please Include UserID")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("profileimage", "ProfileImage is required!")
      .not()
      .isEmpty()
      .isString(),
    check("address", "Address is required!")
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
      name,
      lastname,
      schoolid,
      parentid,
      userid,
      password,
      profileimage,
      address
    } = req.body;

    try {
      // 1 Is for students
      let user = {
        id: null,
        name,
        lastname,
        schoolid,
        parentid,
        userid,
        type: 1,
        password,
        profileimage,
        address
      };
      // Check student already in database
      DB.query(`SELECT userid FROM students where userid='${user.userid}'`)
        .then(async results => {
          if (results.rows.length > 0) {
            return res
              .status(401)
              .json({ msg: "User is already in the database!" });
          } else {
            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            //Save User To DB
            await DB.query(
              "INSERT INTO students(schoolid, parentid, userid, password, type, name, lastname, profileimage, address) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id",
              [
                user.schoolid,
                user.parentid,
                user.userid,
                user.password,
                user.type,
                user.name,
                user.lastname,
                user.profileimage,
                user.address
              ]
            )
              .then(results => {
                user.id = results.rows[0].id;
              })
              .catch(e => {
                console.log(user.Name);
                throw e;
              });
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
              { expiresIn: 1800 },
              async (err, token) => {
                if (err) throw err;
                await DB.query(
                  "INSERT INTO tokens(token, type) VALUES ($1,1)",
                  [token]
                )
                  .then(() => {
                    res.json({ token });
                  })
                  .catch(e => {
                    throw e;
                  });
              }
            );
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