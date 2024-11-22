import express from "express";

import homePage from "../views/index.js";
import createTasksList from "../views/tasks/createTasksList.js";

const router = express.Router();
let init = false;

// Route pour afficher la page principale avec la liste des tâches.
router.get("/", (req, res) => {
  if (init === false) {
    init = true;
    res.send(homePage());
    return;
  }

  res.send(createTasksList());
});

export default router;
