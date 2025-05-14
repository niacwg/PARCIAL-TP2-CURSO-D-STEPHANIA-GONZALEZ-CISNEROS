import https from 'https';
import fs from 'fs';
import path from 'path';
import { File } from '../models/File.js';
import { getFiles as getFilesFromDb, saveFiles as saveFilesToDb } from '../db/index.js';
import { getBooks as getBooksFromDb } from '../db/index.js';

export const getAllFiles = () => {
  return getFilesFromDb();  // Obtener archivos desde la base de datos (src/db/index.js)
};

export const uploadFile = (file) => {
  const files = getFilesFromDb();  // Obtener los archivos existentes desde la base de datos
  files.push(file);                // Agregar el nuevo archivo
  saveFilesToDb(files);           // Guardar los archivos actualizados
  return file;
};

export const getFileByName = (name) => {
  const files = getFilesFromDb();  // Obtener archivos desde la base de datos
  return files.find(file => file.name === name);  // Buscar el archivo por nombre
};


export const getAllBooks = () => {
  return getBooks();  // Llama al método en db/index.js que lee books.json
};

// ✅ Nueva función obligatoria para descargar y guardar el archivo CSV
export const downloadAndSaveCSV = async () => {
  const url = 'https://raw.githubusercontent.com/plotly/datasets/refs/heads/master/beers.csv';
  const outputPath = path.join(process.cwd(), 'src', 'db', 'beers.csv');  // Ruta para guardar el archivo

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);

    // Hacemos la solicitud HTTPS para descargar el CSV
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error(`Error al descargar CSV: ${response.statusCode}`));
      }

      response.pipe(file);  // Piped the response to the file stream

      file.on('finish', () => {
        file.close();  // Cerramos el archivo una vez que se ha escrito

        // Obtenemos los archivos existentes desde la base de datos
        const files = getFilesFromDb();

        // Creamos un nuevo objeto File con los metadatos
        const newFile = new File({
          id: Date.now(),
          name: 'beers.csv',  // El nombre del archivo CSV
          type: 'text/csv',    // El tipo MIME del archivo
          size: fs.statSync(outputPath).size,  // Tamaño del archivo
          path: outputPath  // Ruta donde se ha guardado el archivo
        });

        // Verificamos si el archivo es válido y lo agregamos a la base de datos
        if (newFile.isValid()) {
          files.push(newFile);  // Añadimos el archivo a la lista de archivos
          saveFilesToDb(files);  // Guardamos los archivos actualizados
        }

        resolve();  // Resolución de la promesa
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => reject(err));  // Eliminar archivo parcialmente descargado en caso de error
    });
  });
};
