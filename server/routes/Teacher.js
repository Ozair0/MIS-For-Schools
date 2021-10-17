const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");
const multer = require("multer");
const path = require("path");

// @route   POST api/teacher/allinfo
// @desc    Get All Teachers NAME & ID
// @access  Public
router.get("/allinfo", (req, res) => {
  try {
    DB.query(`select id,name,lastname from teachers;`)
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


// @route   GET api/teacher/bygrade
// @desc    Get All Teachers By Grade
// @access  Public
router.get("/bygrade", (req, res) => {
  if(req.query.id) {

    try {
      DB.query(
        `select id,name,lastname from teachers where gradeid = ${req.query.id}`
      )
        .then(result => {
          res.status(200).json(result.rows);
        })
        .catch(e => {
          console.log(e);
          res.status(400).json({e});
        });
    } catch (e) {
      res.status(400).json({e});
    }
  }else{
    res.status(401).json({
      msg: [{ msg: "ID Required" }]
    });
  }
});

// @route   POST api/teacher/
// @desc    Get Teacher Total
// @access  Public
router.get("/", (req, res) => {
  try {
    DB.query(`SELECT count(*) as total FROM teachers`)
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

// @route   POST api/teacher/all
// @desc    Get All teachers
// @access  Public
router.get("/all", (req, res) => {
  try {
    DB.query(
      `select t.id,t.schoolid,t.dob,t.departmentid,t.userid,t.name,t.lastname,t.profileimage,t.address, s.schoolname as school,d.name as dep
from teachers t inner join department d on t.departmentid = d.id inner join schools s on t.schoolid = s.id;`
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

// @route   POST api/teacher/new
// @desc    Register Student
// @access  Public

router.post(
  "/new",
  [
    check("name", "Name is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isString(),
    check("lastname", "LastName is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isString(),
    check("schoolid", "SchoolID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt(),
    check("departmentid", "DepartmentID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt(),
    check("userid", "Please Include UserID")
      .not()
      .bail()
      .isEmpty(),
    check("gradeid", "Please Include GradeID")
      .not()
      .bail()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    // check("profileimage", "ProfileImage is required!")
    //   .not()
    //   .isEmpty()
    //   .isString(),
    check("address", "Address is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isString(),
    check("salary", "Salary is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt(),
    check("salarytype", "Salary Type is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt()
      .bail()
      .isIn([1, 2])
      .withMessage("Choose 1 or 2"),
    check("dob", "DOB Type is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isDate()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const {
      name,
      lastname,
      schoolid,
      departmentid,
      userid,
      password,
      // profileimage,
      address,
      salary,
      salarytype,
      dob,
      gradeid
    } = req.body;

    try {
      // 2 Is for students
      let user = {
        id: null,
        name,
        lastname,
        schoolid,
        departmentid,
        userid,
        type: 2,
        password,
        // profileimage,
        address,
        salary,
        salarytype,
        dob,
        gradeid
      };
      // Check student already in database
      DB.query(`SELECT userid FROM teachers where userid='${user.userid}'`)
        .then(async results => {
          if (results.rows.length > 0) {
            return res
              .status(400)
              .json({ msg: [{ msg: "User is already in the database!" }] });
          } else {
            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            //Save User To DB
            await DB.query(
              "INSERT INTO teachers(schoolid, departmentid, userid, password, type, name, lastname, address, salary, salarytype,dob,gradeid) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id",
              [
                user.schoolid,
                user.departmentid,
                user.userid,
                user.password,
                user.type,
                user.name,
                user.lastname,
                // user.profileimage,
                user.address,
                user.salary,
                user.salarytype === "1" ? "AFN" : "USD",
                user.dob,
                user.gradeid
              ]
            )
              .then(results => {
                // user.id = results.rows[0].id;
                res.json({ id: results.rows[0].id });
              })
              .catch(e => {
                console.log(user.Name);
                throw e;
              });
            // // Return jsonwebtoken
            // const payload = {
            //   user: {
            //     id: user.id
            //   }
            // };
            // // Use 3600 1HR for Prod!
            // jwt.sign(
            //   payload,
            //   config.get("jwtSecret"),
            //   { expiresIn: 1800 },
            //   async (err, token) => {
            //     if (err) throw err;
            //     await DB.query(
            //       "INSERT INTO tokens(token, type) VALUES ($1,2)",
            //       [token]
            //     )
            //       .then(() => {
            //         res.json({ token });
            //       })
            //       .catch(e => {
            //         throw e;
            //       });
            //   }
            // );
          }
        })
        .catch(e => {
          res.status(400).json({ msg: "Database error!" });
        });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/teacher/image
// @desc    Upload Teacher Image
// @access  Public

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./static/Uploads/Teachers");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000 // 5000000 Bytes = 5 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload PNG or JPG"));
    } else if (req.user.type !== 3) {
      req.fileValidationError = "error";
      return cb(null, false, req.fileValidationError);
    }
    cb(undefined, true);
  }
});

router.post("/image", [auth, upload.single("profile")], function(req, res) {
  if (req.fileValidationError) {
    // If not admin
    return res.status(401).json({ msg: "authorization denied" });
  } else {
    DB.query(
      `update teachers set profileimage='${req.file.filename}' where id=${req.body.userid};`
    )
      .then(result => {
        res.status(200).json("Success!");
      })
      .catch(e => {
        console.log(e);
        res.status(400).json({ e });
      });
  }
});

module.exports = router;
