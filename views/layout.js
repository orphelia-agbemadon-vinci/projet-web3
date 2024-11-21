const layout = (content) => /*html*/`
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
                <div id="title-container2" class="title-container2">
                    <!-- Bouton retour -->
                    <div class="back-button-container">
                        <button class="back-button" onclick="window.location.href='/'">
                            <i class="fa fa-arrow-left"></i> Retour
                        </button>
                    </div>
                    <ul id="list-section">
                        <!-- Section pour afficher la liste des sous-tâches -->
                    </ul>
                </div>
            </nav>
        </header>
        <main>
            ${content}
        </main>
    </body>
    </html>
`;

export default layout;