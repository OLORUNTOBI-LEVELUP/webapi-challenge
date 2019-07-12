const express = require("express");
const actions = require("./data/helpers/actionModel");
const router = express.Router();

router.get("/", (req, res) => {
  actions
    .get()
    .then(action => {
      res.status(200).json({ action });
    })
    .catch(() => {
      res.status(500).json({
        error: "Internal server error"
      });
    });
});


module.exports = router;