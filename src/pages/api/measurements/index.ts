import type { APIRoute } from 'astro';
import { getAllMeasurements, createMeasurement } from '../../../lib/airtable';

export const GET: APIRoute = async () => {
  const measurements = await getAllMeasurements();
  return new Response(JSON.stringify(measurements), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const id = await createMeasurement({
    date: body.date,
    weight: body.weight ?? null,
    fat_pct: body.fatPct ?? null,
    fat_kg: body.fatKg ?? null,
    vvm: body.vvm ?? null,
    water_kg: body.waterKg ?? null,
    water_pct: body.waterPct ?? null,
    visceral_fat: body.visceralFat ?? null,
  });
  return new Response(JSON.stringify({ id }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
