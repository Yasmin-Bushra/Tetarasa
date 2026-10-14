import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pool } from './db.js';

const migrationPath = fileURLToPath(new URL('../migrations/001_initial.sql', import.meta.url));
try {
  await pool.query(`CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
  const name = path.basename(migrationPath);
  const already = await pool.query('SELECT 1 FROM schema_migrations WHERE name=$1', [name]);
  if (already.rowCount) console.log(`${name} already applied.`);
  else {
    const sql = await readFile(migrationPath, 'utf8');
    const client = await pool.connect();
    try { await client.query('BEGIN'); await client.query(sql); await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [name]); await client.query('COMMIT'); }
    catch (error) { await client.query('ROLLBACK'); throw error; }
    finally { client.release(); }
    console.log(`Applied ${name}.`);
  }
} catch (error) {
  console.error('Database migration failed:', error);
  process.exitCode = 1;
} finally { await pool.end(); }
