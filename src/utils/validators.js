// src/utils/validators.js

// Validación para un correo electrónico
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validación para que un campo no esté vacío
export const validateRequiredField = (fieldValue) => {
  return fieldValue && fieldValue.trim() !== '';
};

// Validación para un ID de libro
export const validateBookId = (id) => {
  return !isNaN(id) && id > 0;
};
