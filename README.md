# projet-web3 : [HTMX](https://htmx.org) (groupe 10)

## Gestionnaire de tâches (*To-Do List*) avec [HTMX](https://htmx.org) & [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
_DunDeal. Chaque tâche, une affaire réglée._


#### Auteurs
- Orphelia Agbemadon
- Sinem Bayrak
- Melda Gonen
- Elise Grelaud
- Thuy Duong Océane Tran

---

## Objectif
*DunDeal* est un gestionnaire de tâches simple (*To-Do List*) conçu pour explorer et démontrer les capacités de [HTMX](https://htmx.org) pour la manipulation dynamique de l'interface utilisateur en utilisant des requêtes [AJAX](https://developer.mozilla.org/en-US/docs/Glossary/AJAX) légères. L'application est construite avec [Node.js](https://nodejs.org/fr) et [Express](https://expressjs.com), et utilise [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) pour le rendu côté serveur. 

L'objectif principal est de minimiser les scripts [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) personnalisés et de s'appuyer sur [HTMX](https://htmx.org) pour des interactions utilisateur sans rechargement de page.

## Fonctionnalités

- __Création de tâches__ : Ajouter une nouvelle tâche sans rechargement de la page.
  
- __Suppression de tâches__ : Supprimer une tâche instantanément.

- __Modification de tâches__ : Modifier une tâche.

- __Marquer une tâche terminée__ : Marquer une tâche comme terminée en cochant et en rayant la description de la tâche.

- __Marquer une tâche importante__ : Marquer une tâche comme importante en la metant en début de liste.

- __Filtrage des tâches__ : Filtrer les tâches selon leurs critères (À faire, Terminées, Importantes).

- __Recherche de tâches__ : Rechercher une tâche selon sa description.
  
- __Création de sous-tâches__ : Ajouter une nouvelle sous tâche sans rechargement de la page.
  
-  __Suppression de sous-tâches__ : Supprimer une sous-tâche instantanément.

## Guide d'installation

1. Cloner ou télécharger le dossier *projet-web3* directement via [GitHub](https://github.com/orphelia-agbemadon-vinci/projet-web3) ou via le terminal :

```bash
git clone https://github.com/orphelia-agbemadon-vinci/projet-web3
```

2. Installer les dépendances nécessaires :

```bash
npm install
npm install express
```
ou

```bash
npm i
npm i express
```

3. Lancer l'application :

```bash
npm run dev
```

4. Lancer le serveur sur le navigateur (de préférence Chrome ou Firefox) via : http://localhost:3000.

## Architecture de l'application

**data/** : Contient les fichiers [JSON](https://www.json.org/json-en.html) utilisés comme base de données légère pour stocker les tâches et les listes de manière persistante.

**models/** : Contient les fichiers [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) pour la gestion des données et des opérations *CRUD* (*Create, Read, Update, Delete*) sur les tâches et les listes.

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
- [npm](https://docs.npmjs.com) : Gestionnaire de paquets pour [Node.js](https://nodejs.org/fr).
- [Node.js](https://nodejs.org/fr) & [Express](https://expressjs.com) : pour la structure de l'application et la gestion des routes.
- [Prettier](https://prettier.io) : Un formateur de code qui assure un style de code cohérent en appliquant des règles de formatage définies.
- [ESLint](https://eslint.org) : Un outil de vérification de code qui aide à détecter les erreurs de syntaxe et de logique dans le code.
