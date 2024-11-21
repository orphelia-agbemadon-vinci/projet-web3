import express from "express";

import homePage from "../views/index.js";
import Task from "../models/Task.js";

const router = express.Router();

// Route pour afficher la page principale avec la liste des tâches.
router.get("/", (req, res) => {
  Task.writeFilterState("none");
  res.send(homePage());
});

export default router;
