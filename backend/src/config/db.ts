import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

let db: Database;

export async function getDb() {
  if (!db) {
    // This finds the absolute path to the project root, then goes to /database/daycare.sqlite
    const dbPath = path.resolve(__dirname, '../../../database/daycare.sqlite');
    console.log('Connecting to database at:', dbPath);
    
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
  }
  return db;
}

export default getDb;
