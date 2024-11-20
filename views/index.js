const homePage = () => /*html*/`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DunDeal</title>
        <link rel="icon" href="../images/checklist.png">
        <link rel="stylesheet" href="../../stylesheets/styles.css">
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
                     <div class="search">
                        <input
                            type="search"
                            id="search"
                            name="search"
                            placeholder="Recherche d'une tâche..."
                            hx-post="/tasks/search"
                            hx-trigger="keyup changed delay:100ms"
                            hx-target="#task-list"
                            hx-include="#filters">
                    </div>
                    <!-- Ligne de séparation -->
            </section>
            <section class="container">
                <h2> To-Do List </h2>
                <div id="tasks-manager">
    
                    <select id="filters" name="completed" hx-trigger="change" hx-target="#task-list" hx-post="/tasks/search" hx-include="#search" multiple>
                        <option hx-get="/tasks/filter/none" value="">Toutes</option>
                        <option hx-get="/tasks/filter/todo" value="false">À faire</option>
                        <option hx-get="/tasks/filter/completed" value="true">Complétées</option>
                        <option hx-get="/tasks/filter/important" value="important">Importantes</option>
                    </select>
                    <!-- Formulaire d'ajout de tâche -->
                    <form id="add-task-form" hx-on::after-request="document.querySelector('form').reset()" hx-post="/tasks/add" hx-target="#task-list" hx-swap="innerHTML">
                        <input type="text" id="task-input" name="description" placeholder="Nouvelle tâche..." required>
                        <button>+</button>
                    </form>
                    <!-- Liste des tâches -->
                    <div id="task-list" hx-get="/tasks/all" hx-trigger="load" hx-target="#task-list" hx-swap="innerHTML">
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

export default homePage;