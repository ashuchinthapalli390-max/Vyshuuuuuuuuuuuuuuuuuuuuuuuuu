import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function authApiPlugin() {
  return {
    name: 'auth-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const env = loadEnv('development', process.cwd(), '');
        const SITE_PASSWORD = env.SITE_PASSWORD || '16120311';
        const UNLOCK_AT = new Date(env.UNLOCK_AT || '2026-08-28T00:00:00+05:30');

        if (req.url === '/api/check-password' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { password, bypassTimeCheck } = JSON.parse(body || '{}');

              if (!password) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ ok: false, message: 'Password enter cheyyi 👀' }));
              }

              if (password !== SITE_PASSWORD) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ ok: false, message: 'Nopeee 😭 Wrong password. Check the mail again 👀' }));
              }

              const now = new Date();
              if (now < UNLOCK_AT && !bypassTimeCheck) {
                const msLeft = UNLOCK_AT.getTime() - now.getTime();
                res.statusCode = 423;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  ok: false,
                  tooEarly: true,
                  msLeft,
                  message: 'Password correcttt 😭❤️ But not yet... wait till 12:00 AM!'
                }));
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Set-Cookie', 'vyshuu-password-ok=yes; Path=/; HttpOnly; SameSite=Strict; Max-Age=600');
              return res.end(JSON.stringify({ ok: true, message: 'Correcttt ❤️ Now one last thing...' }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ ok: false, message: 'Something went wrong 😭' }));
            }
          });
          return;
        }

        if (req.url === '/api/complete-unlock' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { email } = JSON.parse(body || '{}');
              const cleanEmail = String(email || '').trim().toLowerCase();

              if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ ok: false, message: 'Correct email enter cheyyi Vyshuuu 😭' }));
              }

              // Try Resend if API key is configured
              const resendKey = env.RESEND_API_KEY;
              if (resendKey && !resendKey.includes('YOUR_SECRET') && !resendKey.includes('xxxx')) {
                try {
                  const { Resend } = await import('resend');
                  const resend = new Resend(resendKey);
                  const siteUrl = env.SITE_URL || 'http://localhost:5173';
                  const photoUrl = `${siteUrl}/vyshuu.jpg`;

                  await resend.emails.send({
                    from: env.RESEND_FROM_EMAIL || 'Ashuu Rakhi Surprise <rakhi@codxa-agency.online>',
                    to: cleanEmail,
                    subject: 'Vyshuuuuuuuuuuuuu ❤️ Your Rakhi World Is Open',
                    text: `Vyshuuuuuuuuuuuuu ❤️\n\nYou actually unlocked ittt 😭❤️\n\nYour Rakhi surprise is ready:\n${siteUrl}\n\nFrom your lovely brother\nAshuuuuuuuuuuuuuuuuuuuu ❤️`,
                    html: `<div style="background:#18030b;color:#fff;padding:40px;text-align:center;font-family:sans-serif;">
                      <h1 style="color:#f4c85a;">Vyshuuuuuuuuuuuuu ❤️</h1>
                      <img src="${photoUrl}" width="200" height="200" style="border-radius:50%;object-fit:cover;margin:20px auto;display:block;" />
                      <p style="font-size:18px;">You actually unlocked ittt 😭❤️</p>
                      <p>The teddy approved you, the lock surrendered, and your Rakhi world is officially ready ✨</p>
                      <a href="${siteUrl}" style="background:#e7b73f;color:#24050e;padding:14px 28px;border-radius:999px;font-weight:bold;text-decoration:none;display:inline-block;margin-top:20px;">Enter Vyshuuverse ❤️</a>
                      <p style="margin-top:30px;color:#ff78a4;">From your lovely brother<br/>Ashuuuuuuuuuuuuuuuuuuuu ❤️</p>
                    </div>`
                  });
                } catch (resendErr) {
                  console.warn('Resend mail delivery note:', resendErr.message);
                }
              }

              // Try Supabase if configured
              const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
              const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
              if (supabaseUrl && supabaseKey && !supabaseUrl.includes('YOUR_PROJECT')) {
                try {
                  const { createClient } = await import('@supabase/supabase-js');
                  const supabase = createClient(supabaseUrl, supabaseKey);
                  await supabase.from('rakhi_recipient').upsert({
                    profile_key: 'vyshuu',
                    name: env.VYSHUU_NAME || 'Vyshuuuuuuuuuuuuu',
                    email: cleanEmail,
                    notify_enabled: true,
                    password_verified_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                  }, { onConflict: 'profile_key' });
                } catch (sbErr) {
                  console.warn('Supabase record note:', sbErr.message);
                }
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Set-Cookie', 'vyshuu-unlocked=yes; Path=/; HttpOnly; SameSite=Strict; Max-Age=172800');
              return res.end(JSON.stringify({
                ok: true,
                redirect: '/surprise',
                message: 'Mail vellindhiiii ❤️ Opening your surprise...'
              }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ ok: false, message: 'Something broke 😭' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), authApiPlugin()],
  server: {
    port: 5173,
    open: false,
    watch: {
      usePolling: true,
      interval: 300,
      ignored: ['**/assest & images/**', '**/dist/**']
    }
  }
});
