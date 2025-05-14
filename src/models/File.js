export class File {
  constructor({ id, name, type, size, path, uploadedAt }) {
    this.id = id;
    this.name = name;
    this.type = type;       // Por ejemplo: "image/png"
    this.size = size;       // En bytes
    this.path = path;       // Ruta donde está guardado
    this.uploadedAt = uploadedAt || new Date().toISOString();
  }

  isValid() {
    return (
      typeof this.name === 'string' &&
      typeof this.type === 'string' &&
      typeof this.size === 'number' &&
      typeof this.path === 'string'
    );
  }
}
