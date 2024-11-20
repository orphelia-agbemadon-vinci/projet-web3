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
        <script src="https://unpkg.com/htmx.org@1.5.0"></script>
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

                <a href="/"><img src="/../images/logoDunDeal.png" alt="Logo DunDeal" class="logo"></a>
                <!-- Ligne de séparation pour les listes -->
                <hr>
                <ul id="list-section">

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