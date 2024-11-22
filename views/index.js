import { allTasks } from "../models/Task.js";
import createFilteredList from "./tasks/createFilteredList.js";

const homePage = () => {
  const tasks = allTasks();
  const filteredTasks = tasks.filter((task) => task); // Filtre par défaut "none" au démarrage

  return /*html*/ `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DunDeal</title>
        <link rel="icon" href="../images/checklist.png">
        <link rel="stylesheet" href="/../stylesheets/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://unpkg.com/htmx.org@2.0.3" integrity="sha384-0895/pl2MU10Hqc6jd4RvrthNlDiE9U1tWmX7WRESftEDRosgxNsQG/Ze9YMRzHq" crossorigin="anonymous"></script>
    </head>
    <body>
        <main>
            <section>
                <!-- Titre de la page -->
                <div id="title-container" class="title-container">
                    <h1>
                        <a href="/">
                            <img src="../images/logoDunDeal.png" alt="Logo DunDeal" class="logo">
                        </a>
                        DunDeal
                    </h1>
                </div>
                <div id="search-container">
                <input
                    type="search"
                    id="search"
                    name="search"
                    placeholder="Recherche d'une tâche..."
                    hx-post="/tasks/search"
                    hx-trigger="keyup changed delay:10ms"
                    hx-target="#task-list"
                    hx-include="#filters">
                </div>
                <!-- Titre de la page -->
                <div id="subtask-search-container" class="hidden">
                <input
                    type="search"
                    id="subtaskSearch"
                    name="subtaskSearch"
                    placeholder="Recherche d'une sous-tâche..."
                    hx-post="/tasks/subtasks/search"
                    hx-trigger="keyup changed delay:10ms"
                    hx-target="#subtask-list">
                </div>
            </section>
            <section class="container">
                <div id="tasks-manager">
                    <h2> To-Do List </h2>
                    <select 
                        id="filters" 
                        name="completed" 
                        hx-trigger="change" 
                        hx-target="#task-list" 
                        hx-post="/tasks/search" 
                        hx-include="#search" multiple>
                        <option hx-get="/tasks/filter/none" value="" selected>Toutes</option>
                        <option hx-get="/tasks/filter/todo" value="false">À faire</option>
                        <option hx-get="/tasks/filter/completed" value="true">Terminées</option>
                        <option hx-get="/tasks/filter/important" value="important">Importantes</option>
                    </select>
                    <!-- Formulaire d'ajout de tâche -->
                    <form id="add-task-form" hx-on::after-request="document.querySelector('form').reset()" hx-post="/tasks/add" hx-target="#task-list" hx-swap="innerHTML">
                        <input type="text" id="task-input" name="description" placeholder="Nouvelle tâche..." required>
                        <button hx-trigger="load">+</button>
                    </form>
                    <!-- Liste des tâches -->
                    <div id="task-list">
                        ${createFilteredList(filteredTasks, "none")}
                    </div>
                </div>
                <!-- Liste des sous-tâches -->
                <div id="subtasks">
                    <!-- Données ajoutées dynamiquement ici -->
                </div>
            </section>
        </main>
    </body>
    </html>
`;
};

export default homePage;
