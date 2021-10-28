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
// @route   POST api/parent/all
// @desc    Get All Parent
// @access  Public
router.get("/all", (req, res) => {
  try {
    DB.query(
      `select id,profileimage,userid,password,name,lastname,address from parents;`
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
// @route   POST api/parent/allinfo
// @desc    Get All Parents NAME & ID
// @access  Public
router.get("/allinfo", (req, res) => {
  try {
    DB.query(`select id,name,lastname from parents;`)
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

// @route   POST api/parent/byid
// @desc    Get Parent Info By ID
// @access  Public

router.post(
  "/byid",
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
      DB.query(`select * from parents where id=${id};`)
        .then(result => {
          res.status(200).json(result.rows[0]);
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

// @route   POST api/parent/new
// @desc    Register Parent
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
    check("userid", "Please Include UserID")
      .not()
      .bail()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("address", "Address is required!")
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
    const { name, lastname, userid, password, address } = req.body;

    try {
      // 1 Is for students
      let user = {
        id: null,
        name,
        lastname,
        userid,
        type: 4,
        password,
        address
      };
      // Check student already in database
      DB.query(`SELECT userid FROM parents where userid='${user.userid}'`)
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
              "INSERT INTO parents( userid, password, type, name, lastname, address) VALUES($1,$2,$3,$4,$5,$6) RETURNING id",
              [
                user.userid,
                user.password,
                user.type,
                user.name,
                user.lastname,
                user.address
              ]
            )
              .then(results => {
                res.json({ id: results.rows[0].id });
              })
              .catch(e => {
                console.log(user.Name);
                throw e;
              });
            // Return jsonwebtoken
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
            //       "INSERT INTO tokens(token, type) VALUES ($1,4)",
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

// @route   POST api/parent/image
// @desc    Upload Parent Image
// @access  Public

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./static/Uploads/Parents");
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
      `update parents set profileimage='${req.file.filename}' where id=${req.body.userid};`
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
