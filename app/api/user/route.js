
import { getUser, upsertUser } from '@/lib/store';
import { bootstrapFromPrefs } from '@/lib/reco';

export async function GET() {
  // NOTE: for demo, pick the first user if exists
  const all = globalThis.__store || {};
  const email = Object.keys(all)[0];
  const user = email ? all[email] : null;
  return new Response(JSON.stringify(user||{}), { headers:{'Content-Type':'application/json'} });
}

export async function POST(request) {
  const body = await request.json();
  const user = upsertUser({ ...body, score: bootstrapFromPrefs(body.prefs||[]), saved: [] });
  // expose store globally to mock persistence across API routes
  globalThis.__store = globalThis.__store || {};
  globalThis.__store[user.email] = user;
  return new Response(JSON.stringify(user), { headers:{'Content-Type':'application/json'} });
}
