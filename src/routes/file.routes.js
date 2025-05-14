import express from 'express';
import {
  uploadFile,
  getFile,
  getJsonFile,       // ✅ NUEVO
  fetchAndSaveCsv    // ✅ NUEVO
} from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', uploadFile);
router.get('/:filename', getFile);

// ✅ Rutas obligatorias
router.get('/json_file', getJsonFile);
router.get('/data_externa', fetchAndSaveCsv);

export default router;
