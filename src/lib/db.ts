import Database from 'better-sqlite3';
import { mkdirSync } from 'fs';
import { join } from 'path';

const dataDir = join(process.cwd(), 'data');
mkdirSync(dataDir, { recursive: true });

const db = new Database(join(dataDir, 'tracker.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS measurements (
    id          TEXT PRIMARY KEY,
    date        TEXT NOT NULL,
    weight      REAL,
    fat_pct     REAL,
    fat_kg      REAL,
    vvm         REAL,
    water_kg    REAL,
    water_pct   REAL,
    visceral_fat REAL,
    created_at  TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

export { db };
