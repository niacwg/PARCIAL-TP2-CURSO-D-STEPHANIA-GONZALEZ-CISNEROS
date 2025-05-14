import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3003,
  dbFilePath: process.env.DB_FILE_PATH || 'src/db/books.json'
};
