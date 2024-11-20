import layout from '../layout.js';

const aboutPage = () => layout(/*html*/`
<section class="container">
    <h1>À propos de DunDeal®</h1>
    <p>DunDeal® est un gestionnaire de tâches simple et efficace conçu pour
        vous aider à organiser vos tâches quotidiennes de la manière la plus simple possible.</p>

    <h2>Équipe de développement</h2>
    <p>Ce site a été développé par des étudiantes de la Haute École Léonard de Vinci
        dans le cadre du cours de "Développement web : questions spéciales".</p>

    <a href="/">Retour à l'accueil</a>
</section>
`);

export default aboutPage;