import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';

export const DELETE: APIRoute = ({ params }) => {
  db.prepare('DELETE FROM measurements WHERE id = ?').run(params.id!);
  return new Response(null, { status: 204 });
};

export const POST: APIRoute = ({ params }) => {
  db.prepare('DELETE FROM measurements WHERE id = ?').run(params.id!);
  return new Response(null, { status: 204 });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  db.prepare(`
    UPDATE measurements
    SET date=?, weight=?, fat_pct=?, fat_kg=?, vvm=?, water_kg=?, water_pct=?, visceral_fat=?
    WHERE id=?
  `).run(
    body.date,
    body.weight ?? null,
    body.fatPct ?? null,
    body.fatKg ?? null,
    body.vvm ?? null,
    body.waterKg ?? null,
    body.waterPct ?? null,
    body.visceralFat ?? null,
    params.id!,
  );
  return new Response(null, { status: 204 });
};
