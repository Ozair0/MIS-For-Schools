const express = require("express");
const router = express.Router();
const DB = require("../../config/db");

// @route   POST api/school/allinfo
// @desc    Get All School NAME & ID
// @access  Public
router.get("/allinfo", (req, res) => {
  try {
    DB.query(`select * from schools;`)
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

module.exports = router;
