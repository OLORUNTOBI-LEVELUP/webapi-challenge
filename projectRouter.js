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
router.get("/:id/actions", (req, res) => {
  const { id } = req.params;

  projects
    .getProjectActions(id)
    .then(project =>
      project.length
        ? res.status(200).json(project)
        : res
            .status(404)
            .json({ message: `The project doesn't have any actions` })
    )
    .catch(() =>
      res
        .status(500)
        .json({ error: "The project actions could not be retrieved." })
    );
});

router.post("/", (req, res) => {
  const project = req.body;
  if (project.name && project.description) {
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
  } else {
    res.status(400).json({
      error: "Please provide a name and description for the project.",
      bodyexample: {
        name: "",
        description: ""
      }
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .remove(id)
    .then(num => {
      if (num === 1) {
        res.status(200).json({
          message: `Post with id ${id} successfully deleted`
        });
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
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
      if (project) {
        res.status(200).json({
          project
        });
      } else {
        res.status(400).json({
          error: "Please provide a body with project name and description."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Internal server error"
      });
    });
});

module.exports = router;
