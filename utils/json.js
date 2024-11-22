import fs from "fs";
import path from "path";

/**
 * Parse items given in a .js file
 * @param {String} filePath - path to the .js file
 * If the file does not exist or its content cannot be parsed as JSON data,
 * use the default data.
 * @param {Array} defaultArray - Content to be used when the .js file does not exist
 * @returns {Array} : the array that was parsed from the file (or defaultArray)
 */
export function parse(filePath, defaultArray = []) {
  if (!fs.existsSync(filePath)) {
    serialize(filePath, defaultArray);
    return defaultArray;
  }
  const fileContent = fs.readFileSync(filePath, "utf8");
  const jsonData = fileContent.match(
    /const DATA = (\[.*\]|\{.*\});\n\nexport default DATA;/s
  )[1];
  try {
    return JSON.parse(jsonData);
  } catch {
    return defaultArray;
  }
}

/**
 * Serialize the content of an Object within a file
 * @param {String} filePath - path to the .js file
 * @param {Array} object - Object to be written within the .js file.
 * Even if the file exists, its whole content is reset by the given object.
 */
export function serialize(filePath, object) {
  // Créer les répertoires nécessaires si ils n'existent pas
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileContent = `const DATA = ${JSON.stringify(object, null, 2)};\n\nexport default DATA;\n`;
  fs.writeFileSync(filePath, fileContent, "utf8");
}
