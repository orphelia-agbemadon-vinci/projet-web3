#### projet-web3 : HTMX
#### groupe n°10 : Elise Grelaud, Melda Gonen, Orphelia Agbemadon, Thuyduong Tran, Sinem Bayrak

# Gestionnaire de Tâches (To-Do List) avec HTMX et EJS
#### Ce projet est un gestionnaire de tâches simple (To-Do List) conçu pour explorer et démontrer les capacités de HTMX pour la manipulation dynamique de l'interface utilisateur en utilisant des requêtes AJAX légères. L'application est construite avec Node.js et Express, et utilise EJS pour le rendu côté serveur. L'objectif principal est de minimiser le JavaScript personnalisé et de s'appuyer sur HTMX pour des interactions utilisateur sans rechargement de page.

## Foncionnalités
#### Création de tâches : Ajouter une nouvelle tâche sans rechargement de la page.
#### Suppression de tâches : Supprimer une tâche instantanément.
#### Modification de tâche : Modifier une tâche.
#### Marquer comme terminée : Marquer une tâche comme terminée en rayant la tâche.
#### Marquer comme importante : Marquer une tâche comme importante en la metant en début de liste.

## Technologies utilisées
#### HTMX : pour les requêtes AJAX sans rechargement et la mise à jour dynamique des éléments.
#### EJS : moteur de templates côté serveur pour le rendu des pages.
#### Node.js & Express : pour la structure de l'application et la gestion des routes.
#### JSON : Utilisé comme base de données légère pour stocker les tâches de manière persistante.

## Installation du projet
#### 1. Cloner le projet : 
```bash
git clone https://github.com/orphelia-agbemadon-vinci/projet-web3
#### 2. Installer les dépendances :
```bash
npm i
npm i express ejs
npm i express-ejs-layouts
#### 3. Lancer l'application : 
```bash
npm run dev
#### Le serveur sera disponible sur http://localhost:3000

## Architecture de l'application
#### views/ : Contient les fichiers EJS pour le rendu des pages.
#### public/ : Contient les fichiers statiques (CSS, JavaScript).
#### app.js : Point d'entrée de l'application.
