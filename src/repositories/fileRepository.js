// src/repositories/fileRepository.js
import { getFiles as getFilesFromDb, saveFiles as saveFilesToDb } from '../db/index.js';

// Obtener todos los archivos
export const getFiles = () => {
  return getFilesFromDb();  // Llamar a la función de db/index.js para obtener los archivos
};

// Guardar los archivos
export const saveFiles = (files) => {
  saveFilesToDb(files);  // Llamar a la función de db/index.js para guardar los archivos
};

