import { defineMiddleware } from 'astro:middleware';
import { createHmac } from 'node:crypto';

const PUBLIC_PATHS = ['/login', '/api/auth/login'];

function expectedToken() {
  const secret = process.env.AUTH_SECRET ?? import.meta.env.AUTH_SECRET;
  return createHmac('sha256', secret)
    .update('authenticated')
    .digest('hex');
}

export const onRequest = defineMiddleware((ctx, next) => {
  const { pathname } = ctx.url;

  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return next();
  }

  const cookie = ctx.cookies.get('session');
  if (cookie?.value === expectedToken()) {
    return next();
  }

  return ctx.redirect('/login');
});
