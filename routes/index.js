import express from 'express';
import homePage from '../views/index.js';
import aboutPage from '../views/about/about.js';
import { writeFilterState } from '../models/Task.js';

const router = express.Router();

// Affiche la page principale avec la liste des tâches
router.get('/', (req, res) => {
    writeFilterState('none');
    res.send(homePage());
});

// Affiche la page principale avec la liste des tâches
router.get('/about', (req, res) => {
    writeFilterState('none');
    res.send(aboutPage());
});


export default router;