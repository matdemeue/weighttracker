import type { APIRoute } from 'astro';
import { updateMeasurement, deleteMeasurement } from '../../../lib/airtable';

export const DELETE: APIRoute = async ({ params }) => {
  await deleteMeasurement(params.id!);
  return new Response(null, { status: 204 });
};

export const POST: APIRoute = async ({ params }) => {
  await deleteMeasurement(params.id!);
  return new Response(null, { status: 204 });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  await updateMeasurement(params.id!, {
    date: body.date,
    weight: body.weight ?? null,
    fat_pct: body.fatPct ?? null,
    fat_kg: body.fatKg ?? null,
    vvm: body.vvm ?? null,
    water_kg: body.waterKg ?? null,
    water_pct: body.waterPct ?? null,
    visceral_fat: body.visceralFat ?? null,
  });
  return new Response(null, { status: 204 });
};
