const homePage = () => /*html*/`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DunDeal</title>
        <link rel="icon" href="../images/checklist.png">
        <link rel="stylesheet" href="/../stylesheets/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://unpkg.com/htmx.org@1.5.0"></script>
    </head>
    <body>
        <header>
            <nav class="menu" id="menu">
                <a href="/"><img src="/../images/logoDunDeal.png" alt="Logo DunDeal" class="logo"></a>
                <!-- Ligne de séparation pour les listes -->
                <hr>
                <ul id="list-section">

                </ul>
                <div class="add-list-section">
                    <button id="add-list-btn" hx-get="/lists/new-list-form" hx-target="#modal-container" hx-trigger="click">+ Nouvelle Liste</button>
                </div>
            </nav>
        </header>
        <main>
            <section class="container">
                <!-- Boutons pour filtrer -->
                <div id="filters">
                    <button hx-get="/tasks" hx-target="#task-list" hx-swap="innerHTML">Toutes</button>
                    <button hx-get="/tasks/filter/completed" hx-target="#task-list" hx-swap="innerHTML">Complétées</button>
                    <button hx-get="/tasks/important" hx-target="#task-list" hx-swap="outerHTML">Importantes</button>
                </div>

                <div id="title-container">
                    <h1>To-Do List</h1>
                </div>

                <!-- Formulaire pour ajouter une tâche -->
                <form id="add-task-form" hx-on::after-request="document.querySelector('form').reset()" hx-post="/tasks/add" hx-target="#task-list" hx-swap="innerHTML">
                    <input type="text" id="task-input" name="task" placeholder="Nouvelle tâche..." required>
                    <button type="submit">Ajouter</button>
                </form>

                <!-- Liste des tâches -->
                <div id="task-list">
                </div>
            </section>  
        </main>
        
    </body>
    </html>
`;

export default homePage;