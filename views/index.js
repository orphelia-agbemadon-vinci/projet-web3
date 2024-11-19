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
        <header>
            <nav class="menu" id="menu">
                <a href="/"><img src="../images/logoDunDeal.png" alt="Logo DunDeal" class="logo"></a>
                <!-- Ligne de séparation pour les listes -->
                <hr>
                <ul id="list-section">
                    <!-- Listes ajoutées dynamiquement ici -->
                </ul>
                
            </nav>
        </header>
        <main>
            <section class="container">
                <div id="tasks-manager">
                    <!-- Boutons pour filtrer -->
                    <div id="filters">
                        <button hx-get="/tasks" hx-target="#task-list" hx-swap="innerHTML">Toutes</button>
                        <button hx-get="/tasks/filter/completed" hx-target="#task-list" hx-swap="innerHTML">Complétées</button>
                        <button hx-get="/tasks/filter/important" hx-target="#task-list" hx-swap="innerHTML">Importantes</button>
                    </div>

                    <div id="title-container">
                    <h1>Bienvenue sur DunDeal</h1>
                    <p>Gérez vos tâches facilement avec notre application.</p>
                    </div>

                    <form id="add-task-form" hx-on::after-request="document.querySelector('form').reset()" hx-post="/tasks/add" hx-target="#task-list" hx-swap="innerHTML">
                        <input type="text" id="task-input" name="description" placeholder="Nouvelle tâche..." required>
                        <button type="submit">Ajouter</button>
                    </form>

                    <!-- Liste des tâches -->
                    <div id="task-list">
                        <!-- Données ajoutées dynamiquement ici -->
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