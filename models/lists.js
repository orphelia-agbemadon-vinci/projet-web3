const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/lists.json');

// Fonction pour récupérer toutes les listes
function allLists() {
    return parse(jsonDbPath);
}

// Fonction pour créer une nouvelle liste
function createList(name) {
    const lists = parse(jsonDbPath);

    const createdList = {
        id: lists.length + 1,
        name: name,
        tasks: [],
    };

    lists.push(createdList);
    serialize(jsonDbPath, lists);

    return createdList;
}

// Fonction pour trouver une liste par son id
function findList(id) {
    const lists = parse(jsonDbPath);
    return lists.find(list => list.id === id);
}

module.exports = {
    allLists,
    createList,
    findList,
};