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
  const action = req.body;
  actions
    .insert({ action, project_id: id })
    .then(action => {
      res.status(201).json({ action });
    })
    .catch(() => {
      res.status(500).json({
        error: "Internal server error"
      });
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    actions.remove(id)
    .then(action => {
        res.status(200).json({
            message: "Post successfully deleted"
        })
    })
    .catch(() => {
        res.status(500).json({
            error: 'Internal Server error'
        })
    })
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const action = req.body;
    actions.update({project_id:id, action})
    .then(action => {
        res.status(200).json({
            action
        })
    })
    .catch(() => {
        res.status(500).json({
            error: "Internal server error"
        })
    })
})

module.exports = router;
