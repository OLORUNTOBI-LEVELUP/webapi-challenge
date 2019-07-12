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

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const action = {
    description: req.body.description,
    notes: req.body.notes,
    project_id: id
  };
  if (action.description && action.notes && action.project_id) {
    actions
      .insert(action)
      .then(action => {
        res.status(201).json({ action });
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  } else {
    res.status(400).json({
      error: "Please provide project_id, description and notes for the action.",
      bodyexample: {
        project_id: 1,
        description: "",
        notes: ""
      }
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actions
    .remove(id)
    .then(num => {
      if (num === 1) {
        res.status(200).json({
          message: `Post with id ${id} successfully deleted`
        });
      } else {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
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
  const action = {
    description: req.body.description,
    notes: req.body.notes,
    project_id: id
  };
  actions
    .update(action)
    .then(action => {
      if (action) {
        res.status(200).json({
          action
        });
      } else {
        res.status(400).json({
          error:
            "Please provide a body with project_id, description or notes for the action."
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
