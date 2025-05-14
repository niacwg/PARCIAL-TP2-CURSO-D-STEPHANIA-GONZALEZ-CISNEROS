import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir las rutas de los archivos
const booksPath = path.join(__dirname, 'books.json');
const filesPath = path.join(__dirname, 'files.json');

// Función genérica para leer datos desde un archivo JSON
const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error al leer el archivo ${filePath}:`, err);
    return [];  // Retornar un arreglo vacío si ocurre un error al leer
  }
};

// Función genérica para escribir datos en un archivo JSON
const writeJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error al escribir en el archivo ${filePath}:`, err);
  }
};


// Función específica para obtener libros
export const getBooks = () => {
  return readJSON(booksPath);  // Usa la función genérica para leer books.json
};

export const saveBooks = (books) => writeJSON(booksPath, books);

// Funciones específicas para manejar archivos
export const getFiles = () => readJSON(filesPath);
export const saveFiles = (files) => writeJSON(filesPath, files);
