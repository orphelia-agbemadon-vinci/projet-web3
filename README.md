# projet-web3 : [HTMX](https://htmx.org) (groupe 10)

## Gestionnaire de tâches (_To-Do List_) avec [HTMX](https://htmx.org) & [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

#### Membres

- Orphelia Agbemadon
- Sinem Bayrak
- Melda Gonen
- Elise Grelaud
- Thuy Duong Océane Tran

---

## Objectif

_DunDeal_ est un gestionnaire de tâches simple (_To-Do List_) conçu pour explorer et démontrer les capacités de [HTMX](https://htmx.org) pour la manipulation dynamique de l'interface utilisateur en utilisant des requêtes [AJAX](https://developer.mozilla.org/en-US/docs/Glossary/AJAX) légères. L'application est construite avec [Node.js](https://nodejs.org/fr) et [Express](https://expressjs.com), et utilise [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) pour le rendu côté serveur.

L'objectif principal est de minimiser les scripts [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) personnalisés et de s'appuyer sur [HTMX](https://htmx.org) pour des interactions utilisateur sans rechargement de page.

## Fonctionnalités

- **Création de tâches** : Ajouter une nouvelle tâche sans rechargement de la page.
- **Suppression de tâches** : Supprimer une tâche instantanément.

- **Supprimer toutes les tâches** : Supprimer l'ensemble de tâches créées

- **Renommer une tâche** : Renommer la description d'une .

- **Marquer une tâche terminée** : Marquer une tâche comme terminée en cochant et en rayant la description de la tâche.

- **Marquer une tâche importante** : Marquer une tâche comme importante en la metant en début de liste.

- **Filtrage des tâches** : Filtrer les tâches selon leurs critères (À faire, Terminées, Importantes).

- **Recherche de tâches** : Rechercher une tâche selon sa description.
- **Création de sous-tâches** : Ajouter une nouvelle sous tâche sans rechargement de la page.
- **Suppression de sous-tâches** : Supprimer une sous-tâche instantanément.

- **Recherche de sous-tâches** : Rechercher une sous-tâche selon sa description.

## Guide d'installation

⚠️ Installations prérequises : [Node.js](https://nodejs.org/fr) et [Nodemon](https://docs.npmjs.com/).

1. Télécharger directement via le [répertoire GitHub](https://github.com/orphelia-agbemadon-vinci/projet-web3) ou cloner le projet :

```bash
git clone https://github.com/orphelia-agbemadon-vinci/projet-web3
```

2. Installer les dépendances nécessaires :

```bash
npm i
npm i express
```

3. Lancer l'application :

```bash
npm run dev
```

4. Lancer le serveur sur le navigateur (de préférence [Chrome](https://www.google.com/chrome/) ou [Firefox](https://www.mozilla.org/en-US/firefox/new/)) via : http://localhost:3000.

## Architecture de l'application

**data/** : Contient les fichiers [JSON](https://www.json.org/json-en.html) utilisés comme base de données légère pour stocker les tâches de manière persistante.

**models/** : Contient les fichiers [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) pour la gestion des données et des opérations _CRUD_ (_Create, Read, Update, Delete_) sur les tâches et les listes.

**public/** : Contient les fichiers statiques ([CSS](https://developer.mozilla.org/fr/docs/Web/CSS) & images).

**routes/** : Contient les fichiers [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) pour la gestion des routes de l'application, définissant les différentes actions possibles (ajout, suppression, modification de tâches, etc.).

**utils/** : Contient les fichiers utilitaires, comme les fonctions pour lire et écrire dans les fichiers [JSON](https://www.json.org/json-en.html).

**views/** : Contient les fichiers [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) pour le rendu des pages et des composants de l'interface utilisateur.

**app.js** : Point d'entrée de l'application. Configure le serveur [Express](https://expressjs.com), les middlewares ainsi que les routes.

## Technologies utilisées

### Langages

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) : moteur de templates côté serveur pour le rendu des pages.
- [HTML](https://developer.mozilla.org/fr/docs/Web/HTML) : Utilisé pour structurer le contenu des pages web.
- [CSS](https://developer.mozilla.org/fr/docs/Web/CSS) : Utilisé pour le style et la mise en page des pages web.
- [JSON](https://www.json.org/json-en.html) : Utilisé comme base de données légère pour stocker les tâches de manière persistante.

### Outils et bibliothèques

- [HTMX](https://htmx.org) : pour les requêtes [AJAX](https://developer.mozilla.org/en-US/docs/Glossary/AJAX) sans rechargement et la mise à jour dynamique des éléments.
- [Nodemon](https://docs.npmjs.com) : Gestionnaire de paquets pour [Node.js](https://nodejs.org/fr).
- [Node.js](https://nodejs.org/fr) & [Express](https://expressjs.com) : pour la structure de l'application et la gestion des routes.
- [Prettier](https://prettier.io) : Un formateur de code qui assure un style de code cohérent en appliquant des règles de formatage définies.
- [ESLint](https://eslint.org) : Un outil de vérification de code qui aide à détecter les erreurs de syntaxe et de logique dans le code.
