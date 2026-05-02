import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { randomUUID } from 'crypto';

export const GET: APIRoute = () => {
  const rows = db.prepare('SELECT * FROM measurements ORDER BY date ASC').all();
  return new Response(JSON.stringify(rows), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const id = randomUUID();

  db.prepare(`
    INSERT INTO measurements (id, date, weight, fat_pct, fat_kg, vvm, water_kg, water_pct, visceral_fat)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    body.date,
    body.weight ?? null,
    body.fatPct ?? null,
    body.fatKg ?? null,
    body.vvm ?? null,
    body.waterKg ?? null,
    body.waterPct ?? null,
    body.visceralFat ?? null,
  );

  return new Response(JSON.stringify({ id }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
