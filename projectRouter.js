const express = require("express");
const projects = require("./data/helpers/projectModel");
const router = express.Router();

router.get("/", (req, res) => {
  projects
    .get()
    .then(project => {
      res.status(200).json({ project });
    })
    .catch(() => {
      res.status(500).json({
        error: "Internal server error"
      });
    });
});

router.post("/", (req, res) => {
  const project = req.body;
  projects
    .insert(project)
    .then(project => {
      res.status(201).json({ project });
    })
    .catch(() => {
      res.status(500).json({
        error: "Internal server error"
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .remove(id)
    .then(project => {
      res.status(200).json({
        message: "Post successfully deleted"
      });
    })
    .catch(() => {
      res.status(500).json({
        error: "Internal Server error"
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const action = req.body;
  projects
    .update(id, action)
    .then(project => {
      res.status(200).json({
        project
      });
    })
    .catch(() => {
      res.status(500).json({
        error: "Internal server error"
      });
    });
});

module.exports = router;
