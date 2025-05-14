// src/controllers/userController.js
import { validateEmail, validateRequiredField } from '../utils/validators.js';
import { createError } from '../middlewares/errorHandler.js';  // Cambié la importación

export const createUser = (req, res, next) => {
  try {
    const { email, name } = req.body;

    // Validar que el nombre no esté vacío
    if (!validateRequiredField(name)) {
      throw createError('El nombre es obligatorio', 400);  // Usando createError
    }

    // Validar que el correo electrónico sea válido
    if (!validateEmail(email)) {
      throw createError('Correo electrónico no válido', 400);  // Usando createError
    }

    // Aquí agregarías la lógica para crear el usuario en tu base de datos o archivo
    // ...

    res.status(201).json({
      message: 'Usuario creado con éxito',
      user: { email, name }
    });

  } catch (err) {
    next(err);  // Pasamos el error al middleware de manejo de errores
  }
};
