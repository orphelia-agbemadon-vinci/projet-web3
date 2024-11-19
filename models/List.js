import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, serialize } from '../utils/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonDbPath = path.join(__dirname, '/../data/lists.js');

// Fonction pour récupérer toutes les listes
export function allLists() {
    return parse(jsonDbPath);
}

// Fonction pour créer une nouvelle liste
export function createList(name) {
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
export function findList(id) {
    const lists = parse(jsonDbPath);
    return lists.find(list => list.id === id);
}