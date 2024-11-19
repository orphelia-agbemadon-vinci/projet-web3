import express from 'express';
import homePage from '../views/index.js';

const router = express.Router();

// Affiche la page principale avec la liste des tâches
router.get('/', (req, res) => {
    res.send(homePage());
});


export default router;