import express from 'express';
import homePage from '../views/index.js';
import aboutPage from '../views/about/about.js';

const router = express.Router();

// Affiche la page principale avec la liste des tâches
router.get('/', (req, res) => {
    res.send(homePage());
});

// Affiche la page principale avec la liste des tâches
router.get('/about', (req, res) => {
    res.send(aboutPage());
});


export default router;