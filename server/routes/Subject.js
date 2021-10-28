const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const DB = require("../../config/db");

// @route   GET api/subject/all
// @desc    Get All Subjects
// @access  Public
router.get("/all", (req, res) => {
  try {
    DB.query(
      `select s.name as subject, g.gradenumber from subjects s inner join grade g on s.gradeid = g.id;`
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

// @route   GET api/subject/subjectThoughtByTeacher
// @desc    Get All Subjects Thought By Teacher
// @access  Private
router.get("/subjectThoughtByTeacher", auth, (req, res) => {
  try {
    DB.query(
      `select st.id as id, s.name as name, st.start,st.end, st.time, g.gradenumber,c.roomnumber as roomnumber from subjects_thought_by_teachers st inner join classroom c on c.id = st.classroomid inner join subjects s on s.id = st.subjectid inner join teachers t on st.teacherid = t.id inner join grade g on s.gradeid = g.id
where st.teacherid=${req.user.id} and st.active=true`
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

// @route   GET api/subject/subjectSelectedByStudent
// @desc    Get All Subjects Selected by Student
// @access  Private
router.get("/subjectSelectedByStudent", auth, (req, res) => {
  try {
    DB.query(
      `select stbt.id as id,s2.name as name, g.gradenumber, c.roomnumber as roomnumber,s3.stime as stime,e.etime as etime, m.fscore as fscore, m.sscore as sscore
from subjectselected s inner join subjects_thought_by_teachers stbt on stbt.id = s.subjectid inner join subjects s2 on s2.id = stbt.subjectid inner join grade g on s2.gradeid = g.id inner join classroom c on c.id = stbt.classroomid inner join starttime s3 on s3.id = stbt.start inner join endtime e on e.id = stbt."end" inner join marks m on s.id = m.subjectselectedid
where s.studentid=${req.user.id} and s.active=true`
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

// @route   GET api/subject/subjectSelectedByStudentParent
// @desc    Get All Subjects Selected by Student
// @access  Private
router.get("/subjectSelectedByStudentParent", auth, (req, res) => {
  try {
    DB.query(
      `select concat(s.name,' ',s.lastname) as stname,stbt.id as id,s4.name as name, g.gradenumber, c.roomnumber as roomnumber,s3.stime as stime,e.etime as etime, m.fscore as fscore, m.sscore as sscore
from students s inner join subjectselected s2 on s.id = s2.studentid inner join subjects_thought_by_teachers stbt on stbt.id = s2.subjectid inner join grade g on g.id = s.gradeid inner join starttime s3 on s3.id = stbt.start inner join endtime e on e.id = stbt."end" inner join classroom c on c.id = stbt.classroomid full join marks m on s2.id = m.subjectselectedid inner join subjects s4 on s4.id = stbt.subjectid
where s.parentid=${req.user.id} and s2.active=true;`
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

// @route   GET api/subject/checkselection
// @desc    Check If selection is allowed
// @access  Private
router.get("/checkselection", (req, res) => {
  try {
    DB.query(`select allow from allowselection`)
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

// @route   POST api/subject/allowselection
// @desc    Allow Subject Selection In The System
// @access  Public

router.post(
  "/allowselection",
  [
    check("status", "Status is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isBoolean()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { status } = req.body;

    try {
      // Check if already in database
      await DB.query(`SELECT * FROM allowselection`)
        .then(async results => {
          if (results.rows.length > 0) {
            await DB.query(
              "Update allowselection set allow = $1 RETURNING id",
              [status]
            )
              .then(results => {
                res.json({ allowID: results.rows[0].id });
              })
              .catch(e => {
                throw e;
              });
          } else {
            await DB.query(
              "INSERT INTO allowselection(allow) VALUES($1) RETURNING id",
              [status]
            )
              .then(results => {
                res.json({ allowID: results.rows[0].id });
              })
              .catch(e => {
                throw e;
              });
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

// @route   POST api/subject/subjbyidgradejid
// @desc    Get Student Subjects By Student ID and Grade ID
// @access  Public

router.post(
  "/subjbyidgradejid",
  [
    check("studentid", "StudentID is required!")
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { studentid, gradeid } = req.body;
    try {
      await DB.query(
        `select s2.id as id,s.name as name from subjects s inner join subjects_thought_by_teachers stbt on s.id = stbt.subjectid inner join subjectselected s2 on stbt.id = s2.subjectid where
         s.gradeid=${gradeid} and s2.studentid=${studentid};`
      )
        .then(results => {
          res.status(200).json(results.rows);
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

// @route   POST api/subject/subjbyid
// @desc    Get Subject Info By ID
// @access  Public

router.post(
  "/subjbyid",
  [
    check("id", "id is required!")
      .not()
      .bail()
      .isEmpty()
      .bail()
      .isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.body;
    try {
      await DB.query(
        `select s2.id as id, s.name as name, g.gradenumber as gradenumber, g.id as gradeid, c.roomnumber as roomnumber
from subjects_thought_by_teachers st inner join subjects s on s.id = st.subjectid inner join grade g on g.id = s.gradeid inner join classroom c on c.id = st.classroomid inner join subjectselected s2 on st.id = s2.subjectid where
 st.id = ${id};`
      )
        .then(results => {
          res.status(200).json(results.rows);
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

// @route   GET api/subject/subjectbygrade
// @desc    Get All Subjects Thought By Teacher By Grade
// @access  Private
router.get("/subjectbygrade", async (req, res) => {
  if (req.query.gradeid) {
    try {
      // Check student already in database
      await DB.query(
        `select s.id,stbt.id as ssid,t.id as tid,t.name as tname,t.lastname tlastname, c.id as cid, c.roomnumber as roomnumber, s2.id as sid,s2.stime as stime,e.id as eid, e.etime as etime from subjects s inner join subjects_thought_by_teachers stbt on s.id = stbt.subjectid inner join teachers t on t.id = stbt.teacherid inner join classroom c on c.id = stbt.classroomid inner join starttime s2 on s2.id = stbt.start inner join endtime e on e.id = stbt."end" where s.gradeid = ${req.query.gradeid} and stbt.active = false and stbt.ended=false order by stbt.id;`
      )
        .then(results => {
          res.json(results.rows);
        })
        .catch(e => {
          res.status(400).json({ msg: "Database error!" });
        });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  } else {
    res.status(401).json({
      msg: [{ msg: "GradeID Required" }]
    });
  }
});

// @route   GET api/subject/subjectgradecheck
// @desc    Check By Grade Subjects Exist
// @access  Private
router.get("/subjectgradecheck", async (req, res) => {
  if (req.query.gradeid) {
    try {
      // Check student already in database
      await DB.query(
        `select s.id from subjects s inner join subjects_thought_by_teachers stbt on s.id = stbt.subjectid where s.gradeid = ${req.query.gradeid} and stbt.active = false and stbt.ended = false;`
      )
        .then(results => {
          if (results.rows.length > 0) {
            res.json({ allow: false });
          } else {
            res.json({ allow: true });
          }
        })
        .catch(e => {
          res.status(400).json({ msg: "Database error!" });
        });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  } else {
    res.status(401).json({
      msg: [{ msg: "GradeID Required" }]
    });
  }
});

// @route   GET api/subject/bygrade
// @desc    Get All Subjects By Grade
// @access  Public
router.get("/bygrade", (req, res) => {
  if (req.query.id) {
    try {
      DB.query(
        `select id, name from subjects where active=true and gradeid = ${req.query.id}`
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
  } else {
    res.status(401).json({
      msg: [{ msg: "ID Required" }]
    });
  }
});

// @route   POST api/subject/new
// @desc    Register Subject
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
    check("gradeid", "GradeID is required!")
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
    const { teacherid, name, gradeid } = req.body;

    try {
      // Check student already in database
      await DB.query(
        `SELECT name,gradeid FROM subjects where name='${name.trim()}' and gradeid=${gradeid}`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg: [{ msg: "This Subject is already in the database!" }]
            });
          } else {
            //Save Department To DB
            await DB.query(
              "INSERT INTO subjects(name,gradeid) VALUES($1,$2) RETURNING id",
              [name.trim(), gradeid]
            )
              .then(results => {
                res.json({ subjectID: results.rows[0].id });
              })
              .catch(e => {
                throw e;
              });
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

// @route   POST api/subject/select
// @desc    Select Subject For Student
// @access  Public

router.post(
  "/select",
  [
    check("studentid", "StudentID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("subjectid", "SubjectID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("dateselected", "DateSelected is required!")
      .not()
      .isEmpty()
      .isDate()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { studentid, subjectid, dateselected } = req.body;

    try {
      await DB.query(
        `SELECT studentid,subjectid,dateselected FROM subjectselected where studentid=${studentid} and subjectid=${subjectid} and date_part('year', dateselected) = ${new Date(
          dateselected
        ).getFullYear()}`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg: `This Subject is already selected in this year: ${new Date(
                dateselected
              ).getFullYear()}`
            });
          } else {
            await DB.query(
              "INSERT INTO subjectselected(studentid,subjectid,dateselected) VALUES($1,$2,$3) RETURNING id",
              [studentid, subjectid, dateselected]
            )
              .then(results => {
                res.json({ subjectSelectedID: results.rows[0].id });
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

// @route   POST api/subject/addmarks
// @desc    Add Subject Marks Of a Student
// @access  Public

router.post(
  "/addmarks",
  [
    check("subjectselectedid", "SubjectSelectedID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("fscore", "FScore is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("sscore", "SScore is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("totalscore", "TotalScore is required!")
      .not()
      .isEmpty()
      .isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { subjectselectedid, fscore, sscore, totalscore } = req.body;

    try {
      // sscore
      await DB.query(
        `SELECT subjectselectedid FROM marks where subjectselectedid=${subjectselectedid} or (sscore = 0 or fscore=0)`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            await DB.query(
              "UPDATE marks set fscore=$2, sscore=$3, totalscore=$4 where subjectselectedid=$1 RETURNING id",
              [subjectselectedid, fscore, sscore, totalscore]
            )
              .then(results => {
                res.json({ subjectScoreID: results.rows[0].id });
              })
              .catch(e => {
                throw e;
              });
          } else {
            await DB.query(
              "INSERT INTO marks(subjectselectedid, fscore, sscore, totalscore) VALUES($1,$2,$3,$4) RETURNING id",
              [subjectselectedid, fscore, sscore, totalscore]
            )
              .then(results => {
                res.json({ subjectScoreID: results.rows[0].id });
              })
              .catch(e => {
                throw e;
              });
          }
        })
        .catch(e => {
          res.status(401).json({ msg: "Database error!" });
          console.log(e);
        });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/subject/createsubject
// @desc    Create Subject For Students To Select
// @access  Public

router.post(
  "/createsubject",
  [
    check("subjectid", "SubjectID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("teacherid", "TeacherID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("classroomid", "ClassroomID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("start", "Start is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("end", "End is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("time", "Time is required!")
      .not()
      .isEmpty()
      .isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { subjectid, teacherid, classroomid, start, end, time } = req.body;
    // date_part('year', dateselected) = ${new Date(dateselected).getFullYear()}
    try {
      await DB.query(
        `SELECT subjectid FROM subjects_thought_by_teachers where subjectid=${subjectid} and active=true;`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            return res.status(401).json({
              msg: `This Subject is already created!`
            });
          } else {
            await DB.query(
              `INSERT INTO subjects_thought_by_teachers(subjectid, teacherid, classroomid, start, "end", time) VALUES($1,$2,$3,$4,$5,$6) RETURNING id`,
              [subjectid, teacherid, classroomid, start, end, time]
            )
              .then(results => {
                res.json({ subjectCreatedID: results.rows[0].id });
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

// @route   POST api/subject/updatesubject
// @desc    Update Subject For Students To Select
// @access  Public

router.post(
  "/updatesubject",
  [
    check("id", "ID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("subjectid", "SubjectID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("teacherid", "TeacherID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("classroomid", "ClassroomID is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("start", "Start is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("end", "End is required!")
      .not()
      .isEmpty()
      .isInt(),
    check("time", "Time is required!")
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
      id,
      subjectid,
      teacherid,
      classroomid,
      start,
      end,
      time
    } = req.body;
    // date_part('year', dateselected) = ${new Date(dateselected).getFullYear()}
    try {
      await DB.query(
        `SELECT id FROM subjects_thought_by_teachers where id=${id} and active=false and ended=false;`
      )
        .then(async results => {
          if (results.rows.length > 0) {
            await DB.query(
              `update subjects_thought_by_teachers set subjectid=$1, teacherid=$2, classroomid=$3, start=$4, "end"=$5, time=$6 where id=$7`,
              [subjectid, teacherid, classroomid, start, end, time, id]
            )
              .then(results => {
                res.json({ subjectUpdatedID: id });
              })
              .catch(e => {
                throw e;
              });
          } else {
            if (id === 0) {
              await DB.query(
                `INSERT INTO subjects_thought_by_teachers(subjectid, teacherid, classroomid, start, "end", time) VALUES($1,$2,$3,$4,$5,$6) RETURNING id`,
                [subjectid, teacherid, classroomid, start, end, time]
              )
                .then(results => {
                  res.json({ subjectUpdatedID: id });
                })
                .catch(e => {
                  throw e;
                });
            } else {
              return res.status(401).json({
                msg: `Error!`
              });
            }
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
