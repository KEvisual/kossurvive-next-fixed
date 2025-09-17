
import { getUser } from '@/lib/store';
import { defaultScore } from '@/lib/reco';

export async function GET() {
  const all = globalThis.__store || {};
  const email = Object.keys(all)[0];
  const user = email ? all[email] : null;
  const score = user?.score || defaultScore();
  return new Response(JSON.stringify({ score }), { headers:{'Content-Type':'application/json'} });
}
