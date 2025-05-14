// src/controllers/fileController.js
import path from 'path';
import fs from 'fs';
import { File } from '../models/File.js';
import { getFiles, saveFiles, getBooks } from '../db/index.js';
import { downloadAndSaveCSV } from '../services/fileService.js';

export const uploadFile = (req, res, next) => {
  try {
    const uploaded = req.file;
    if (!uploaded) {
      throw new Error('No se ha subido ningún archivo');
    }

    const newFile = new File({
      id: Date.now(),
      name: uploaded.originalname,
      type: uploaded.mimetype,
      size: uploaded.size,
      path: uploaded.path,
    });

    if (!newFile.isValid()) {
      return res.status(400).json({ message: 'Archivo inválido' });
    }

    const files = getFiles();
    files.push(newFile);
    saveFiles(files);

    res.status(201).json({
      success: true,
      message: 'Archivo cargado con éxito',
      file: newFile
    });
  } catch (err) {
    next(err);
  }
};

export const getFile = (req, res, next) => {
  try {
    const fileName = req.params.name;
    const files = getFiles();
    const found = files.find(f => f.name === fileName);

    if (!found) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    const filePath = path.resolve(found.path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Archivo no encontrado en el sistema de archivos' });
    }

    res.sendFile(filePath);
  } catch (err) {
    next(err);
  }
};

// ✅ RUTA OBLIGATORIA 1: Leer archivo JSON
export const getJsonFile = async (req, res, next) => {
  try {
    const books = await getBooks();  // Llama al servicio que lee el archivo books.json
    res.status(200).json(books);  // Responde con los datos de books.json
  } catch (err) {
    next(err);  // En caso de error, pasa al middleware de manejo de errores
  }
};

// ✅ RUTA OBLIGATORIA 2: Consumir CSV externo y guardar
export const fetchAndSaveCsv = async (req, res, next) => {
  try {
    // Llamamos al servicio para descargar y guardar el CSV
    await downloadAndSaveCSV();
    res.status(200).json({
      message: 'Archivo CSV descargado y guardado exitosamente en src/db/'
    });
  } catch (err) {
    // Llamamos al siguiente middleware con el error si ocurre
    next(err);
  }
};
