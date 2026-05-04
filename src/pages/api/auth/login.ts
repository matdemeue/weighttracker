import type { APIRoute } from 'astro';
import { createHmac } from 'node:crypto';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const body = await request.formData();
  const password = String(body.get('password') ?? '');

  const expectedPassword = process.env.AUTH_PASSWORD ?? import.meta.env.AUTH_PASSWORD;
  const secret = process.env.AUTH_SECRET ?? import.meta.env.AUTH_SECRET;

  if (!expectedPassword || password !== expectedPassword) {
    return redirect('/login?error=1');
  }

  const token = createHmac('sha256', secret)
    .update('authenticated')
    .digest('hex');

  cookies.set('session', token, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 dagen
  });

  return redirect('/');
};
