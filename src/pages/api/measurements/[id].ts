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
