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

// @route   POST api/student/promotegradebyid
// @desc    Get Student Total
// @access  Public
router.post(
  "/promotegradebyid",
  [
    check("id", "ID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt(),
    check("gradeid", "GradeID is required!")
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
    const { id, gradeid } = req.body;
    if (gradeid > 12) {
      return res.status(400).json({ msg: "Student Can't Be Graduated!" });
    }
    try {
      DB.query(
        `select id from gradeupdates where date_part('y',year) = date_part('y', now());`
      ).then(dateRes => {
        if (dateRes.rows.length === 0) {
          res
            .status(400)
            .json({ msg: `Please use "Promote All Students" first` });
        } else {
          DB.query(
            `select s.id from students st inner join subjectselected s on st.id = s.studentid where st.id=${id} and date_part('y',s.dateselected) = date_part('y', now());`
          )
            .then(async result => {
              if (result.rows.length === 0) {
                await DB.query(
                  `UPDATE students set gradeid=${gradeid + 1} where id=${id}`
                );
                res.status(200).json({ msg: "Grades Updated!" });
              } else {
                res.status(400).json({ msg: "Student Can't Be Promoted!" });
              }
            })
            .catch(e => {
              console.log(e);
              res.status(400).json({ e });
            });
        }
      });
    } catch (e) {
      res.status(400).json({ e });
    }
  }
);

// @route   POST api/student/promotebyid
// @desc    Promote Student Class and Grade
// @access  Public

router.post(
  "/promotebyid",
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
      DB.query(
        "select * from subjects_thought_by_teachers where active=true and ended=false"
      )
        .then(results => {
          if (results.rows.length > 0) {
            res.status(400).json({ msg: "Some classes are still active!" });
          } else {
            DB.query(`select * from students where id=${id}`)
              .then(result => {
                let stuData = [];
                if (result.rows.length > 0) {
                  result.rows.map(user => {
                    DB.query(
                      `select * from subjects where gradeid=${user.gradeid};`
                    ).then(result2 => {
                      result2.rows.map(subj => {
                        DB.query(
                          `
            select stbt.id, s.name, g.gradenumber
            from subjects s inner join subjects_thought_by_teachers stbt on s.id = stbt.subjectid inner join grade g on g.id = s.gradeid
            where s.gradeid = ${user.gradeid} and stbt.subjectid = ${subj.id} and stbt.active=false and stbt.ended=false order by stbt.id;`
                        ).then(async result3 => {
                          let bre = false;
                          for (let i = 0; i < result3.rows.length; i++) {
                            await DB.query(
                              `select id from subjectselected where subjectid=${result3.rows[i].id} and studentid=${user.id}`
                            ).then(result4 => {
                              if (result4.rows.length > 0) {
                                bre = true;
                              }
                            });
                            if (bre === true) {
                              break;
                            } else {
                              await DB.query(
                                `select count(id) from subjectselected where subjectid=${result3.rows[i].id}`
                              ).then(async result4 => {
                                if (parseInt(result4.rows[0].count) <= 19) {
                                  await DB.query(
                                    `insert into subjectselected (studentid, subjectid, dateselected, active) values ($1,$2,current_timestamp,false);`,
                                    [user.id, result3.rows[i].id]
                                  );
                                  bre = true;
                                }
                              });
                            }
                          }
                        });
                      });
                    });
                  });
                  res.status(200).json({ msg: "Success!" });
                } else {
                  res
                    .status(400)
                    .json({ msg: "No student available in the database!" });
                }
              })
              .catch(e => {
                console.log(e);
                res
                  .status(400)
                  .json({ msg: "Database Error! Contact Developer!" });
              });
          }
        })
        .catch(e => {
          console.log(e);
          res.status(400).json({ e });
        });
    } catch (e) {
      res.status(400).json({ e });
    }
  }
);

// @route   POST api/student/byid
// @desc    Get Student Info By ID
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
      DB.query(
        `select s.id as id,s.address as address, s.userid as userid, s.name as name, s.lastname as lastname,s.dob as dob,s.datejoined as datejoined, s.profileimage as profileimage, concat(p.name,' ',p.lastname) as parent, p.id as parentid, g.gradenumber as gradenumber, g.id as gradeid from students s inner join parents p on p.id = s.parentid inner join grade g on g.id = s.gradeid where s.id='${id}';`
      )
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

// @route   POST api/student/bysubid
// @desc    Get Students Info By Subject ID
// @access  Public

router.post(
  "/bysubid",
  [
    check("id", "ID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt(),
    check("gradeid", "GradeID is required!")
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
    const { id, gradeid } = req.body;
    try {
      DB.query(
        `select st.id, st.name,st.lastname
from students st inner join subjectselected s on st.id = s.studentid where s.subjectid=${id} and st.gradeid=${gradeid};`
      )
        .then(result => {
          res.status(200).json(result.rows);
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

// @route   POST api/student/byidnl
// @desc    Get Student Info By ID,name or lastname
// @access  Public

router.post(
  "/byidnl",
  [
    check("id", "ID is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isString(),
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
      .isString()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { id, name, lastname } = req.body;
    try {
      DB.query(
        `select s.id as id,s.userid as userid, s.name as name, s.lastname as lastname,s.dob as dob,s.datejoined as datejoined, s.profileimage as profileimage, concat(p.name,' ',p.lastname) as parent, p.id as parentid, g.gradenumber as gradenumber from students s inner join parents p on p.id = s.parentid inner join grade g on g.id = s.gradeid where s.userid='${id}' or lower(s.name) like lower('${
          name === "null" ? "" : "%" + name + "%"
        }') or lower(s.lastname) like lower('${
          lastname === "null" ? "" : "%" + lastname + "%"
        }');`
      )
        .then(result => {
          res.status(200).json(result.rows);
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

// @route   GET api/student/promotallstudents
// @desc   Promote All Eligible Students To Next Grade
// @access  Private
router.get("/promotallstudents", (req, res) => {
  try {
    DB.query(
      "select * from subjects_thought_by_teachers where active=true and ended=false"
    )
      .then(results => {
        if (results.rows.length > 0) {
          res.status(400).json({ msg: "Some classes are still active!" });
        } else {
          DB.query(`select * from students`)
            .then(result => {
              let stuData = [];
              if (result.rows.length > 0) {
                result.rows.map(user => {
                  DB.query(
                    `select * from subjects where gradeid=${user.gradeid};`
                  ).then(result2 => {
                    result2.rows.map(subj => {
                      DB.query(
                        `
            select stbt.id, s.name, g.gradenumber
            from subjects s inner join subjects_thought_by_teachers stbt on s.id = stbt.subjectid inner join grade g on g.id = s.gradeid
            where s.gradeid = ${user.gradeid} and stbt.subjectid = ${subj.id} and stbt.active=false and stbt.ended=false order by stbt.id;`
                      ).then(async result3 => {
                        let bre = false;
                        for (let i = 0; i < result3.rows.length; i++) {
                          await DB.query(
                            `select id from subjectselected where subjectid=${result3.rows[i].id} and studentid=${user.id}`
                          ).then(result4 => {
                            if (result4.rows.length > 0) {
                              bre = true;
                            }
                          });
                          if (bre === true) {
                            break;
                          } else {
                            await DB.query(
                              `select count(id) from subjectselected where subjectid=${result3.rows[i].id}`
                            ).then(async result4 => {
                              if (parseInt(result4.rows[0].count) <= 19) {
                                await DB.query(
                                  `insert into subjectselected (studentid, subjectid, dateselected, active) values ($1,$2,current_timestamp,false);`,
                                  [user.id, result3.rows[i].id]
                                );
                                bre = true;
                              }
                            });
                          }
                        }
                      });
                    });
                  });
                });
                res.status(200).json({ msg: "Success!" });
              } else {
                res
                  .status(400)
                  .json({ msg: "No student available in the database!" });
              }
            })
            .catch(e => {
              console.log(e);
              res
                .status(400)
                .json({ msg: "Database Error! Contact Developer!" });
            });
        }
      })
      .catch(e => {
        console.log(e);
        res.status(400).json({ e });
      });
  } catch (e) {
    res.status(400).json({ e });
  }
});

// @route   GET api/student/promotegrade
// @desc    Get Student Total
// @access  Public
router.get("/promotegrade", (req, res) => {
  try {
    DB.query(
      `select id from gradeupdates where date_part('y',year) = date_part('y', now());`
    ).then(dateRes => {
      if (dateRes.rows.length > 0) {
        res.status(200).json({ msg: "No User Is Updated!" });
      } else {
        DB.query(`insert into gradeupdates(year) values (now());`);
        DB.query(`SELECT id,gradeid FROM students where new=false`)
          .then(async result => {
            result.rows.map(async student => {
              if (student.gradeid <= 12) {
                await DB.query(
                  `UPDATE students set gradeid=${student.gradeid +
                    1} where id=${student.id}`
                );
              }
            });
            res.status(200).json({ msg: "Grades Updated!" });
          })
          .catch(e => {
            console.log(e);
            res.status(400).json({ e });
          });
      }
    });
  } catch (e) {
    res.status(400).json({ e });
  }
});

// @route   GET api/student/
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

// @route   GET api/student/all
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
