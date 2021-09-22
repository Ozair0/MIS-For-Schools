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

// @route   DELETE api/student/
// @desc    Delete Student By ID
// @access  Public
router.delete(
  "/",
  [
    check("id", "ID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { id } = req.body;
    try {
      DB.query(`DELETE FROM students where id=${id}`)
        .then(result => {
          res.status(200).json({ msg: "Success" });
        })
        .catch(e => {
          console.log(e);
          res.status(400).json({ msg: "Database error!" });
        });
    } catch (e) {
      res.status(400).json({ e });
    }
  }
);

// @route   POST api/student/all
// @desc    Get All Students
// @access  Public
router.get("/all", (req, res) => {
  try {
    DB.query(
      `SELECT s.id,schoolid,parentid,s.userid,s.name,s.lastname,s.profileimage,s.address,s.datejoined,s.dob ,g.gradenumber, concat(p.name,' ',p.lastname) as parent  FROM students s inner join grade g on s.gradeid = g.id
inner join parents p on s.parentid = p.id inner join schools s2 on s.schoolid = s2.id`
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

// @route   POST api/student/new
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
    check("parentid", "ParentID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt(),
    check("userid", "Please Include UserID")
      .not()
      .bail()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    // check("profileimage", "ProfileImage is required!")
    //   .not()
    //   .bail()
    //   .isEmpty()
    //   .bail()
    //   .isString(),
    check("address", "Address is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isString(),
    check("joindate", "Join Date is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isDate(),
    check("dob", "DOB Date is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isDate(),
    check("gradeid", "Grade ID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt(),
    check("gender", "Gender is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt()
      .bail()
      .isIn([1, 2])
      .withMessage("Choose 1 or 2")
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
      parentid,
      userid,
      password,
      joindate,
      gradeid,
      gender,
      dob,
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
        joindate,
        gradeid,
        gender,
        dob,
        address
      };
      // Check student already in database
      DB.query(`SELECT userid FROM students where userid='${user.userid}'`)
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
              "INSERT INTO students(schoolid, parentid, userid, password, type, name, lastname, address,gender,gradeid,datejoined,dob) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id",
              [
                user.schoolid,
                user.parentid,
                user.userid,
                user.password,
                user.type,
                user.name,
                user.lastname,
                user.address,
                user.gender === "1" ? "Male" : "Female",
                user.gradeid,
                user.joindate,
                user.dob
              ]
            )
              .then(results => {
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
            //       "INSERT INTO tokens(token, type) VALUES ($1,1)",
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
          res.status(401).json({ msg: "Database error!" });
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
    cb(null, "./static/Uploads/Students");
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
      `update students set profileimage='${req.file.filename}' where id=${req.body.userid};`
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
